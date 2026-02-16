import { dayjs } from "./index";

export function formatMatchDate(beginAt: string | null) {
  if (!beginAt) {
    return "--:--";
  }

  const date = dayjs(beginAt);

  if (!date.isValid()) {
    return "--:--";
  }

  if (date.isToday()) {
    return `Hoje, ${date.format("HH:mm")}`;
  }

  if (date.isTomorrow()) {
    return `Amanhã, ${date.format("HH:mm")}`;
  }

  const now = dayjs();
  const daysDiff = date.startOf("day").diff(now.startOf("day"), "day");

  if (daysDiff > 0 && daysDiff < 7) {
    const weekDay = date.format("ddd");
    return `${weekDay.charAt(0).toUpperCase()}${weekDay.slice(1)}, ${date.format("HH:mm")}`;
  }

  return date.format("DD.MM HH:mm");
}
