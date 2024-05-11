import { HttpStatusCode } from "axios";
import connectMongo from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    if (body.name) {
      const user = await User.create(body);
      return NextResponse.json(
        { user, message: "Your user has been created" },
        { status: HttpStatusCode.Created }
      );
    } else {
      return NextResponse.json(
        { message: "User name is missing" },
        { status: HttpStatusCode.BadRequest }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function GET() {
  try {
    await connectMongo();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
