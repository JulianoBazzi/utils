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

  const formatDiff = (diff: number, unit: string) => `${diff > 0 ? diff : 1} ${unit}`;

  const diffInMinutes = currentDate.diff(receivedDate, "minute");
  if (diffInMinutes < 60) {
    return formatDiff(diffInMinutes, diffInMinutes > 1 ? "minutos" : "minuto");
  }

  const diffInHours = currentDate.diff(receivedDate, "hour");
  if (diffInHours < 24) {
    return formatDiff(diffInHours, diffInHours > 1 ? "horas" : "hora");
  }

  const diffInDays = currentDate.diff(receivedDate, "day");
  if (diffInDays < 30) {
    return formatDiff(diffInDays, diffInDays > 1 ? "dias" : "dia");
  }

  const diffInMonths = currentDate.diff(receivedDate, "month");
  if (diffInMonths < 12) {
    return formatDiff(diffInMonths, diffInMonths > 1 ? "meses" : "mês");
  }

  const diffInYears = currentDate.diff(receivedDate, "year");
  return formatDiff(diffInYears, diffInYears > 1 ? "anos" : "ano");
}
