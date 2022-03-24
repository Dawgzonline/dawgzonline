import SetRoutes from "../../libs/SetRoutes";
import sanityClient from "../../api/client";
import Razorpay from "../../api/razorpay";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  await SetRoutes(
    req,
    res,
    {
      postCallback: async (req, res) => {
        try {
          if (!req.body) {
            res.status(409).json({ message: "Missing data" });
            return;
          }
          const data = { ...req.body, cart: JSON.parse(req.body.cart) };
          const variants = await sanityClient.fetch(`
        * [ _type == "variant" && _id in ${JSON.stringify(
          data.cart.map(({ variant }) => variant)
        )}]{
                _id,
              discountedPrice,
              amount
          }
        `);
          const notes = {};
          for (let item of data.cart) {
            notes[item.variant] = {
              amount: item.amount,
            };
          }
          const requestBody = [];
          for (let item of variants) {
            if (item.amount <= 0) {
              res
                .status(400)
                .json({ message: "Sorry some product may be not available" });
              return;
            }
            notes[item._id] = {
              ...notes[item._id],
              price: item.discountedPrice,
            };
            requestBody.push({
              patch: {
                id: item._id,
                set: {
                  amount: item.amount - notes[item._id].amount,
                },
              },
            });
          }
          let amount = 0;
          for (let [_, value] of Object.entries(notes)) {
            amount += value.amount * value.price;
          }
          const response = await Razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
          });
          const sanityOrder = await sanityClient.create({
            _type: "order",
            items: data.cart.map((item) => {
              const key = uuidv4().slice(0, 12);
              return {
                amount: item.amount,
                product: {
                  _type: "reference",
                  _ref: item.product,
                },
                variant: {
                  _type: "reference",
                  _ref: item.variant,
                },
                _key: key,
              };
            }),
            amount: amount,
            status: response.status,
            razorpay_id: response.id,
            user: {
              _type: "reference",
              _ref: req.user.id,
            },
            address : data.address,
          });
          const _key = uuidv4().slice(0, 12);
          requestBody.push({
            patch: {
              id: req.user.id,
              insert: {
                before: "orders[0]",
                items: [
                  {
                    _key,
                    _type: "reference",
                    _ref: sanityOrder._id,
                  },
                ],
              },
            },
          });
          await sanityClient.mutate(requestBody);
          res.status(200).json(response);
        } catch (e) {
          console.log(e);
          res
            .status(500)
            .json({ message: "Something went wrong! Please try again later." });
        }
      },
    },
    true
  );
}
