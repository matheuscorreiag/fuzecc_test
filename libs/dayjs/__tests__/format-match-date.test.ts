import { dayjs } from "@/libs/dayjs";
import { formatMatchDate } from "@/libs/dayjs/format-match-date";

describe("formatMatchDate", () => {
  describe("when beginAt is null", () => {
    it("should return '--:--'", () => {
      expect(formatMatchDate(null)).toBe("--:--");
    });
  });

  describe("when beginAt is an invalid date string", () => {
    it("should return '--:--'", () => {
      expect(formatMatchDate("invalid-date")).toBe("--:--");
    });
  });

  describe("when date is today", () => {
    it("should return 'Hoje, HH:mm'", () => {
      const today = dayjs().hour(15).minute(30).second(0).millisecond(0);
      const expected = `Hoje, ${today.format("HH:mm")}`;

      expect(formatMatchDate(today.toISOString())).toBe(expected);
    });
  });

  describe("when date is tomorrow", () => {
    it("should return 'Amanhã, HH:mm'", () => {
      const tomorrow = dayjs().add(1, "day").hour(20).minute(0).second(0).millisecond(0);
      const expected = `Amanhã, ${tomorrow.format("HH:mm")}`;

      expect(formatMatchDate(tomorrow.toISOString())).toBe(expected);
    });
  });

  describe("when date is within the next 7 days (but not today or tomorrow)", () => {
    it("should return the capitalized weekday and time", () => {
      const future = dayjs().add(3, "day").hour(18).minute(0).second(0).millisecond(0);
      const weekDay = future.format("ddd");
      const expected = `${weekDay.charAt(0).toUpperCase()}${weekDay.slice(1)}, ${future.format("HH:mm")}`;

      expect(formatMatchDate(future.toISOString())).toBe(expected);
    });

    it("should handle the edge case of 6 days from now", () => {
      const future = dayjs().add(6, "day").hour(10).minute(0).second(0).millisecond(0);
      const weekDay = future.format("ddd");
      const expected = `${weekDay.charAt(0).toUpperCase()}${weekDay.slice(1)}, ${future.format("HH:mm")}`;

      expect(formatMatchDate(future.toISOString())).toBe(expected);
    });
  });

  describe("when date is 7 or more days away", () => {
    it("should return date in 'DD.MM HH:mm' format", () => {
      const future = dayjs().add(8, "day").hour(12).minute(0).second(0).millisecond(0);
      const expected = future.format("DD.MM HH:mm");

      expect(formatMatchDate(future.toISOString())).toBe(expected);
    });
  });

  describe("when date is in the past", () => {
    it("should return date in 'DD.MM HH:mm' format", () => {
      const past = dayjs().subtract(2, "day").hour(10).minute(0).second(0).millisecond(0);
      const expected = past.format("DD.MM HH:mm");

      expect(formatMatchDate(past.toISOString())).toBe(expected);
    });
  });
});
