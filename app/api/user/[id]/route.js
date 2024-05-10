import { NextResponse } from "next/server";
import connectMongo from "@/lib/dbConnect";
import Product from "@/lib/models/product";
import { HttpStatusCode } from "axios";

export async function GET(_, { params }) {
  try {
    await connectMongo();
    const product = await Product.findById(params.id);
    if (product) {
      return NextResponse.json({ product });
    }
    return NextResponse.json(
      { message: `Product ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const product = await Product.findById(params.id);
    if (product) {
      const body = await req.json();
      if (body.name) {
        product.name = body.name;
      }
      if (body.price) {
        product.name = body.price;
      }
      if (body.description) {
        product.name = body.description;
      }
      product.save();
      return NextResponse.json({ product });
    }
    return NextResponse.json(
      { message: `Product ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectMongo();
    const product = await Product.findById(params.id);
    if (product) {
      await Product.findByIdAndDelete(product._id);
      return NextResponse.json({
        message: `Product ${params.id} has been deleted`,
      });
    }
    return NextResponse.json(
      { message: `Product ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
