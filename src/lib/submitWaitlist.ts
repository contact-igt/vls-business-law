export type WaitlistLead = {
  fullName: string;
  email: string;
  mobile: string;
};

/**
 * No backend is connected yet. Reject instead of reporting a successful signup.
 * When wired up, use getProgramDate(programConfig) at submission time for
 * programm_date; payment confirmation must come from the payment integration.
 */
export async function submitWaitlistLead(lead: WaitlistLead): Promise<{ ok: true }> {
  void lead;
  throw new Error("Online registration is not available yet. Please contact VLS at +91 95002 07811 to register or join the waitlist.");
}
