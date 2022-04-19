import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  isEnable: {
    type: Boolean,
    required: true,
    default: true,
  },
  loginUntil: { type: Date },
  loginAttempts: { type: Number, required: true, default: 0 },
});
const User = mongoose.model("User", userSchema);
export default User;
