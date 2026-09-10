export type WaitlistLead = {
  fullName: string;
  email: string;
  mobile: string;
};

/**
 * Placeholder submission adapter — identical in behaviour to the Taxation Laws &
 * Practice landing page it is cloned from. No lead-capture backend/CRM is wired
 * up for this programme yet; swap this implementation for a real API call once
 * one exists. It must not pretend to deliver the lead anywhere — it only resolves
 * so the UI can show a client-side confirmation after validation passes.
 */
export async function submitWaitlistLead(lead: WaitlistLead): Promise<{ ok: true }> {
  void lead;
  return { ok: true };
}
