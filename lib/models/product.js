import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);
const Product = models.Product || model("Product", ProductSchema);
export default Product;
