/* eslint-disable no-undef */
import { isMaxLength, isMinLength, isUrl } from "@/utils/validation";

describe("validation", () => {
  describe("isMaxLength", () => {
    it("show true", () => {
      expect(isMaxLength("a".repeat(5), 16)).toBe(true);
    });
    it("show false", () => {
      expect(isMaxLength("a".repeat(25), 16)).toBe(false);
    });
  });

  describe("isMinLength", () => {
    it("show true", () => {
      expect(isMinLength("a".repeat(25), 16)).toBe(true);
    });
    it("show false", () => {
      expect(isMinLength("a".repeat(5), 16)).toBe(false);
    });
  });

  describe("isUrl", () => {
    it("show true with https", () => {
      expect(isUrl("https://abc.com")).toBe(true);
    });
    it("show true with http", () => {
      expect(isUrl("http://abc.com")).toBe(true);
    });
    it("show false without https or http", () => {
      expect(isUrl("abc.com")).toBe(false);
    });
    it("show false when not a URL", () => {
      expect(isUrl("abc")).toBe(false);
    });
  });
});
