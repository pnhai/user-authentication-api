import User from "../models/user";
import bcrypt from "bcrypt";
const saltRounds = 10;

const DefaultUser = { username: "123456", password: "123456" };

export const InitUser = async () => {
  const user = await User.findOne({}).and([{ username: DefaultUser.username }]);
  if (!user) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(DefaultUser.password, salt);

      const newUser = new User({
        username: DefaultUser.username,
        password: hashedPassword,
      });

      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }
};
