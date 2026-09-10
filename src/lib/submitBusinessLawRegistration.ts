/**
 * Sends the registration/waitlist payload to the Invictus lead backend
 * (`/api/v1/vls-business-law/register`), mirroring the Taxation Law landing page.
 *
 * The base URL is resolved from NEXT_PUBLIC_API_SERVER ("production" | "stage" |
 * "localhost"); each *_API_URL env var already includes the /api/v1 prefix.
 * This call is best-effort — Razorpay has already captured the payment and the
 * Google Sheet remains the fallback record, so a transient backend failure must
 * never block the customer's confirmation.
 */
function resolveApiBase(): string {
  const target = (process.env.NEXT_PUBLIC_API_SERVER || "localhost").toLowerCase();
  if (target === "production") return process.env.NEXT_PUBLIC_PRODUCTION_API_URL || "";
  if (target === "stage") return process.env.NEXT_PUBLIC_STAGE_API_URL || "";
  return process.env.NEXT_PUBLIC_LOCALHOST_API_URL || "http://localhost:8000/api/v1";
}

const registerEndpoint = `${resolveApiBase()}/vls-business-law/register`;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "vls_law";

export interface BusinessLawRegistrationPayload {
  name: string;
  email: string;
  mobile: string;
  amount: number | string;
  registered_date: string;
  programm_date: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_status: string;
  captured?: boolean;
  page_name: string;
  ip_address: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

export async function submitBusinessLawRegistration(
  payload: BusinessLawRegistrationPayload,
): Promise<unknown> {
  const response = await fetch(registerEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Key": clientKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Unable to submit registration";
    try {
      const data = await response.json();
      message = data?.message || data?.error || message;
    } catch {
      /* non-JSON body — keep fallback message */
    }
    throw new Error(message);
  }

  return response.json();
}
