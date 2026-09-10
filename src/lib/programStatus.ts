export type ProgramConfig = { sessionStatus: string; classStartAt?: string };

export function isRegistrationOpen(config: ProgramConfig, now = Date.now()) {
  return config.sessionStatus === "announced" &&
    Boolean(config.classStartAt) && now < Date.parse(config.classStartAt!);
}

export function getProgramDate(config: ProgramConfig, now = Date.now()) {
  return isRegistrationOpen(config, now) ? config.classStartAt! : "TBA";
}
