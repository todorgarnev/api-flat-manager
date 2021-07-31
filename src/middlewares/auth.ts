import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/default";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;

    if (authHeader) {
      const token: string = authHeader.split("Bearer ")[1];

      if (token) {
        const decodedToken: string | JwtPayload = jwt.verify(token, config.SECRET_KEY);
        next();

        // if (req.body.userId && req.body.userId !== userId) {
        //   throw 'Invalid user ID';
        // } else {
        //   next();
        // }
      }

      throw new Error("No token");
    }

    throw new Error("No authentication header");
  } catch (error) {
    res.status(401).json(error.message);
  }

};

export { auth };