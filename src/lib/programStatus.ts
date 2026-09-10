export type ProgramConfig = { sessionStatus: string; classStartAt?: string };

export function isRegistrationOpen(config: ProgramConfig, now = Date.now()) {
  return config.sessionStatus === "announced" &&
    Boolean(config.classStartAt) && now < Date.parse(config.classStartAt!);
}

export function getProgramDate(config: ProgramConfig, now = Date.now()) {
  return isRegistrationOpen(config, now) ? config.classStartAt! : "TBA";
}

export function getRegistrationAction(config: ProgramConfig & { fee: number | null }, now = Date.now()) {
  if (!isRegistrationOpen(config, now)) return "waitlist";
  return typeof config.fee === "number" && Number.isFinite(config.fee) && config.fee > 0
    ? "payment" : "unavailable";
}
