import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUIRED = ["phone", "amount", "programm_name", "schedule", "platform", "link_date"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const missing = REQUIRED.find((field) => !body[field]);
  if (missing) {
    return NextResponse.json({ error: `${missing} is required` }, { status: 400 });
  }

  const apiKey = process.env.ASKEVA_API_KEY || process.env.REACT_APP_ASKEVA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AskEva API key missing" }, { status: 500 });
  }

  const payload = {
    to: body.phone,
    type: "template",
    template: {
      name: "event_remainder",
      language: { policy: "deterministic", code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: String(body.name || "Student") },
            { type: "text", text: String(body.amount) },
            { type: "text", text: String(body.programm_name) },
            { type: "text", text: String(body.schedule) },
            { type: "text", text: String(body.platform) },
            { type: "text", text: String(body.link_date) },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(
      `https://backend.askeva.io/v1/message/send-message?token=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const text = await response.text();
    let data: unknown = text;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
    return NextResponse.json(data as object, { status: response.status });
  } catch (error) {
    console.error("send-whatsapp error:", error);
    return NextResponse.json({ error: "Unable to send WhatsApp message" }, { status: 500 });
  }
}
