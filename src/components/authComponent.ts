import bcrypt from "bcrypt";
import User from "../models/user";
// update login count
export const updateLoginCount = async (id: string, count: number) => {
  return "";
};

// validate user password
export const validateUserPassword = async (
  password: string,
  userpassword: string
) => {
  const validPassword = await bcrypt.compare(password, userpassword);
  return validPassword;
};

export const validateUsername = async (username: string) => {
  const user = await User.findOne({ username });
  return user;
};

export const incrementLoginAttempts = (
  loginUntil: string,
  loginAttempts: number
) => {
  let count = 0;
  if (loginUntil) {
    const date1: any = new Date(loginUntil);
    const date2: any = new Date();
    const diffTime = Math.abs(date2 - date1);

    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const diffMinute = diffDays * 24 * 60;

    if (diffMinute <= 5) {
      count = loginAttempts + 1;
    } else {
      count = 1;
    }
  } else {
    count = 1;
  }

  return count;
};
