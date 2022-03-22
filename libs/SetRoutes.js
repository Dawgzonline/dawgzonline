import { RestMethod } from "../constant/constant";
import authorization from "./authorize";

export default function SetRoutes(
  req,
  res,
  { getCallback, postCallback, deleteCallback, patchCallback },
  checkAuth = false
) {
  return new Promise(async (resolve, reject) => {
    if (checkAuth) {
      await authorization(req, res, async (req, res) => {
        await SetRoutes(req, res, {
          getCallback,
          postCallback,
          deleteCallback,
          patchCallback,
        });
      });
      resolve();
      return;
    }
    const { method } = req;
    switch (method) {
      case RestMethod.get:
        if (getCallback !== undefined) {
          await getCallback(req, res);
        } else {
          res
            .status(405)
            .json({ message: "Please send request by valid method" });
        }
        break;
      case RestMethod.post:
        if (postCallback !== undefined) {
          await postCallback(req, res);
        } else {
          res
            .status(405)
            .json({ message: "Please send request by valid method" });
        }
        break;
      case RestMethod.patch:
        if (patchCallback !== undefined) {
          await patchCallback(req, res);
        } else {
          res
            .status(405)
            .json({ message: "Please send request by valid method" });
        }
        break;
      case RestMethod.delete:
        if (deleteCallback !== undefined) {
          await deleteCallback(req, res);
        } else {
          res
            .status(405)
            .json({ message: "Please send request by valid method" });
        }
        break;
      default:
        res
          .status(405)
          .json({ message: "Please send request by valid method" });
        break;
    }
    resolve();
  });
}
