import dayjs from "dayjs";

/**
 * Format how long ago a date was, in Portuguese (e.g. `"5 dias"`, `"2 horas"`).
 * Picks the largest fitting unit (minutos → horas → dias → meses → anos).
 * Returns an empty string for missing input.
 *
 * @example
 * formatTimeAgo(dayjs().subtract(3, "day").toISOString()) // "3 dias"
 */
export function formatTimeAgo(date?: string | null): string {
  if (!date) {
    return "";
  }

  const receivedDate = dayjs(date);
  const currentDate = dayjs();

  const diffInMinutes = currentDate.diff(receivedDate, "minute");
  const diffInHours = currentDate.diff(receivedDate, "hour");
  const diffInDays = currentDate.diff(receivedDate, "day");
  const diffInMonths = currentDate.diff(receivedDate, "month");
  const diffInYears = currentDate.diff(receivedDate, "year");

  const formatDiff = (diff: number, unit: string) => `${diff > 0 ? diff : 1} ${unit}`;

  if (diffInMinutes < 60) {
    return formatDiff(diffInMinutes, diffInMinutes > 1 ? "minutos" : "minuto");
  }
  if (diffInHours < 24) {
    return formatDiff(diffInHours, diffInHours > 1 ? "horas" : "hora");
  }
  if (diffInDays < 30) {
    return formatDiff(diffInDays, diffInDays > 1 ? "dias" : "dia");
  }
  if (diffInMonths < 12) {
    return formatDiff(diffInMonths, diffInMonths > 1 ? "meses" : "mês");
  }
  return formatDiff(diffInYears, diffInYears > 1 ? "anos" : "ano");
}
