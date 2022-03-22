import { verify } from "jsonwebtoken";

export default function authorization(req, res, next) {
  return new Promise(async(resolve, reject) => {
    const { headers } = req;
    if (!headers["authorization"]) {
      res.status(401).json({ message: "Please login again" });
      resolve();
      return;
    }
    try {
      const user = verify(
        headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      req.user = user;
      await next(req, res);
      resolve();
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Something went wrong! Please try again later!" });
      resolve();
    }
  });
}
