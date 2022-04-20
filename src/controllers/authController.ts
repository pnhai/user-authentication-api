import { Request, Response, Application } from "express";
import * as jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/env";
import {
  incrementLoginAttempts,
  validateUsername,
  validateUserPassword,
} from "../components/authComponent";

const tokenSecret = TOKEN_SECRET;

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: any = await validateUsername(username);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Username and Password",
      });
    }

    //   Check Password
    const validPassword = await validateUserPassword(password, user.password);
    if (!validPassword) {
      const count = incrementLoginAttempts(user.loginUntil, user.loginAttempts);

      if (count) {
        user.loginUntil = new Date();
        user.loginAttempts = count;
        // maximum of 3 attempts within 5 minutes
        if (count >= 3) {
          user.isEnable = false;
        }
      } else {
        user.loginUntil = null;
        user.loginAttempts = 0;
      }
      await user.save();
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Username and Password" });
    }

    if (!user.isEnable) {
      return res
        .status(400)
        .json({ status: "error", message: "User is locked" });
    }

    user.loginUntil = null;
    user.loginAttempts = 0;
    await user.save();

    // Json Web Token
    const token = jwt.sign({ username: user.username }, tokenSecret);

    res.status(200).json({
      user,
      token,
      status: "success",
      message: "Logged in successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
