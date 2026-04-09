import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await connectDB();

  const orders = await (Order as any).find({
    userId: params.userId,
  });

  return NextResponse.json(orders);
}