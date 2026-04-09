import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  await connectDB();

  const body: any = await req.json();

  const order = await Order.create({
    userId: body.userId,
    items: body.items,
    total: body.total,
  });

  return NextResponse.json(order);
}