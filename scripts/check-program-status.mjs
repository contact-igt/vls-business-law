import assert from "node:assert/strict";
import { getProgramDate, getRegistrationAction, isRegistrationOpen } from "../src/lib/programStatus.ts";

const config = { sessionStatus: "announced", classStartAt: "2026-09-20T10:30:00+05:30" };
const start = Date.parse("2026-09-20T05:00:00Z");
assert.equal(getRegistrationAction({ ...config, fee: 499 }, start - 1), "payment");
assert.equal(getRegistrationAction({ ...config, fee: 499 }, start), "waitlist");
assert.equal(getRegistrationAction({ ...config, fee: null }, start - 1), "unavailable");
assert.equal(getRegistrationAction({ ...config, fee: NaN }, start - 1), "unavailable");
assert.equal(isRegistrationOpen(config, start - 1), true);
assert.equal(getProgramDate(config, start - 1), config.classStartAt);
for (const now of [start, start + 1]) {
  assert.equal(isRegistrationOpen(config, now), false);
  assert.equal(getProgramDate(config, now), "TBA");
}
for (const unavailable of [
  { ...config, sessionStatus: "tba" },
  { ...config, classStartAt: "invalid" },
  { sessionStatus: "announced" },
]) {
  assert.equal(isRegistrationOpen(unavailable, start - 1), false);
  assert.equal(getProgramDate(unavailable, start - 1), "TBA");
}
console.log("Program status checks passed: before, at, after cutoff; TBA, invalid and missing dates.");
