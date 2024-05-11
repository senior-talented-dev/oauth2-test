import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    local: String,
    firstName: String,
    lastName: String,
    avatar: String,
    verified: Boolean,
    address: { type: String, default: "" },
    paid: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
