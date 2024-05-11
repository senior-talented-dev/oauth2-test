import { HttpStatusCode } from "axios";
import connectMongo from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    await connectMongo();
    const users = await User.find({ id: params.id });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
