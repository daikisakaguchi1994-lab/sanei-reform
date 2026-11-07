/** 設立: 平成22年10月。「創業○年」はここから計算する（社長の指示 2026-11-07） */
const FOUNDED_YEAR = 2010;
const FOUNDED_MONTH = 10;

export function yearsSinceFounded(now = new Date()) {
  const years = now.getFullYear() - FOUNDED_YEAR;
  return now.getMonth() + 1 >= FOUNDED_MONTH ? years : years - 1;
}
