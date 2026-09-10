import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let amount: unknown;
  try {
    ({ amount } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!amount || Number.isNaN(Number(amount))) {
    return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;

  if (!keyId || !secret) {
    return NextResponse.json({ error: "Razorpay credentials are not configured" }, { status: 500 });
  }

  const auth = "Basic " + Buffer.from(`${keyId}:${secret}`).toString("base64");
  const payload = {
    amount: Math.round(Number(amount) * 100), // rupees -> paise
    currency: "INR",
    receipt: `drt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await razorpayResponse.json();
    return NextResponse.json(data, { status: razorpayResponse.status });
  } catch (error) {
    console.error("create-order error:", error);
    return NextResponse.json({ error: "Unable to create Razorpay order" }, { status: 500 });
  }
}
