/* eslint-disable no-undef */
import prettyTime from "@/utils/pretty-time";

describe("pretty time", () => {
  describe("when the time is in the future", () => {
    it("show just now", () => {
      expect(prettyTime(Date.now())).toBe("just now");
    });
    it("show in 1 minute", () => {
      expect(prettyTime(Date.now() + 60 * 1000)).toBe("in 1 minute");
    });
    it("show in 2 minutes", () => {
      expect(prettyTime(Date.now() + 2 * 60 * 1000)).toBe("in 2 minutes");
    });
    it("show in 1 hour", () => {
      expect(prettyTime(Date.now() + 60 * 60 * 1000)).toBe("in 1 hour");
    });
    it("show in 2 hours", () => {
      expect(prettyTime(Date.now() + 2 * 60 * 60 * 1000)).toBe("in 2 hours");
    });
    it("show in 1 day", () => {
      expect(prettyTime(Date.now() + 24 * 60 * 60 * 1000)).toBe("in 1 day");
    });
    it("show in 2 days", () => {
      expect(prettyTime(Date.now() + 2 * 24 * 60 * 60 * 1000)).toBe("in 2 days");
    });
    it("show in 1 week", () => {
      expect(prettyTime(Date.now() + 7 * 24 * 60 * 60 * 1000)).toBe("in 1 week");
    });
    it("show in 2 weeks", () => {
      expect(prettyTime(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)).toBe("in 2 weeks");
    });
    it("show in 1 month", () => {
      expect(prettyTime(Date.now() + 30 * 24 * 60 * 60 * 1000)).toBe("in 1 month");
    });
    it("show in 2 months", () => {
      expect(prettyTime(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000)).toBe("in 2 months");
    });
    it("show in 1 year", () => {
      expect(prettyTime(Date.now() + 365 * 24 * 60 * 60 * 1000)).toBe("in 1 year");
    });
    it("show in 2 years", () => {
      expect(prettyTime(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)).toBe("in 2 years");
    });
    it("show far in the future", () => {
      expect(prettyTime(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)).toBe("far in the future");
    });
  });

  describe("when the time is in the future", () => {
    it("show just now", () => {
      expect(prettyTime(Date.now() - 1000)).toBe("just now");
    });
    it("show 1 minute ago", () => {
      expect(prettyTime(Date.now() - 60 * 1000)).toBe("1 minute ago");
    });
    it("show 2 minute ago", () => {
      expect(prettyTime(Date.now() - 2 * 60 * 1000)).toBe("2 minutes ago");
    });
    it("show 1 hour ago", () => {
      expect(prettyTime(Date.now() - 60 * 60 * 1000)).toBe("1 hour ago");
    });
    it("show 2 hours ago", () => {
      expect(prettyTime(Date.now() - 2 * 60 * 60 * 1000)).toBe("2 hours ago");
    });
    it("show 1 day ago", () => {
      expect(prettyTime(Date.now() - 24 * 60 * 60 * 1000)).toBe("1 day ago");
    });
    it("show in 2 days", () => {
      expect(prettyTime(Date.now() - 2 * 24 * 60 * 60 * 1000)).toBe("2 days ago");
    });
    it("show 1 week ago", () => {
      expect(prettyTime(Date.now() - 7 * 24 * 60 * 60 * 1000)).toBe("1 week ago");
    });
    it("show 2 weeks ago", () => {
      expect(prettyTime(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000)).toBe("2 weeks ago");
    });
    it("show 1 month ago", () => {
      expect(prettyTime(Date.now() - 30 * 24 * 60 * 60 * 1000)).toBe("1 month ago");
    });
    it("show 2 months ago", () => {
      expect(prettyTime(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000)).toBe("2 months ago");
    });
    it("show 1 year ago", () => {
      expect(prettyTime(Date.now() - 365 * 24 * 60 * 60 * 1000)).toBe("1 year ago");
    });
    it("show 2 years ago", () => {
      expect(prettyTime(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)).toBe("2 years ago");
    });
    it("show long time ago", () => {
      expect(prettyTime(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)).toBe("long time ago");
    });
  });
});
