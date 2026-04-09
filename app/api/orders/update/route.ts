import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await connectDB();

  const body = await req.json();

  const { id, status } = body;

if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

const updated = await (Order as any).findByIdAndUpdate(
  id,
  { status },
  { new: true }
);

  return NextResponse.json(updated);
}