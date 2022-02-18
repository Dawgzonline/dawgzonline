import { RestMethod } from "../constant/constant";
import authorization from "./authorize";

export default function SetRoutes(
  req,
  res,
  { getCallback, postCallback, deleteCallback, patchCallback },
  checkAuth = false
) {
  if (checkAuth) {
    authorization(req, res, (req, res) => {
      SetRoutes(req, res, {
        getCallback,
        postCallback,
        deleteCallback,
        patchCallback,
      });
    });
    return;
  }
  const { method } = req;
  switch (method) {
    case RestMethod.get:
      if (getCallback !== undefined) {
        getCallback(req, res);
      } else {
        res
          .status(405)
          .json({ message: "Please send request by valid method" });
      }
      break;
    case RestMethod.post:
      if (postCallback !== undefined) {
        postCallback(req, res);
      } else {
        res
          .status(405)
          .json({ message: "Please send request by valid method" });
      }
      break;
    case RestMethod.patch:
      if (patchCallback !== undefined) {
        patchCallback(req, res);
      } else {
        res
          .status(405)
          .json({ message: "Please send request by valid method" });
      }
      break;
    case RestMethod.delete:
      if (deleteCallback !== undefined) {
        deleteCallback(req, res);
      } else {
        res
          .status(405)
          .json({ message: "Please send request by valid method" });
      }
      break;
    default:
      res.status(405).json({ message: "Please send request by valid method" });
      break;
  }
}
