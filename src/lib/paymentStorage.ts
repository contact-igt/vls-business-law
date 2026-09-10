export type RegistrationDetails = {
  name: string;
  email: string;
  mobile: string;
  amount: number | string;
  registered_date: string;
  programm_date: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_status: "paid" | "waitlist";
  captured: boolean;
  page_name: string;
  ip_address: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

const KEY = "PaymentDetails";

export function safeSetPaymentDetails(data: RegistrationDetails) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to store PaymentDetails:", error);
  }
}

export function readPaymentDetails(): RegistrationDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as RegistrationDetails) : null;
  } catch {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    return null;
  }
}

export function clearPaymentDetails() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
