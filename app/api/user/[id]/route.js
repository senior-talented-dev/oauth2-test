import { NextResponse } from "next/server";
import connectMongo from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { HttpStatusCode } from "axios";

export async function GET(_, { params }) {
  try {
    await connectMongo();
    const user = await User.findOne({ id: params.id });
    if (user) {
      return NextResponse.json(user);
    }
    return NextResponse.json(
      { message: `User ${params.id} not found` },
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
    const user = await User.findOne(params);
    if (user) {
      const body = await req.json();
      for (const key in body) {
        user[key] = body[key];
      }
      user.save();
      return NextResponse.json(user);
    }
    return NextResponse.json(
      { message: `User ${params.id} not found` },
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
    const user = await User.findById(params.id);
    if (user) {
      await User.findByIdAndDelete(user._id);
      return NextResponse.json({
        message: `User ${params.id} has been deleted`,
      });
    }
    return NextResponse.json(
      { message: `User ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
