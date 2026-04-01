import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { describe, expect, expectTypeOf, it } from "vitest";
import { cn } from "./index";

describe("Test cn function", () => {
  it("Should return a string", () => {
    expectTypeOf(
      cn("foo", undefined, null, false, "bar"),
    ).toEqualTypeOf<string>();
  });

  it("Should return an empty string with no arguments", () => {
    expect(cn()).toBe("");
  });

  it("Should combine plain class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("Should ignore falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("Should support object syntax", () => {
    expect(cn("base", { active: true, disabled: false, loading: true })).toBe(
      "base active loading",
    );
  });

  it("Should support nested arrays and conditional values", () => {
    expect(
      cn("base", ["rounded", ["px-4", false && "hidden"]], { active: true }),
    ).toBe("base rounded px-4 active");
  });

  it("Should resolve simple Tailwind conflicts", () => {
    expect(cn("p-4", "p-8", "text-red-500", "text-blue-500")).toBe(
      "p-8 text-blue-500",
    );
  });

  it("Should resolve Tailwind conflicts inside nested values", () => {
    expect(
      cn("p-2", ["p-4", { "text-red-500": true }], { "text-blue-500": true }),
    ).toBe("p-4 text-blue-500");
  });

  it("Should resolve variant conflicts", () => {
    expect(
      cn("hover:bg-red-500", "hover:bg-blue-500", "md:px-2", "md:px-4"),
    ).toBe("hover:bg-blue-500 md:px-4");
  });

  it("Should match clsx + twMerge on a realistic complex input", () => {
    const result = cn(
      "inline-flex",
      ["items-center", [{ "justify-center": true }]],
      {
        "bg-slate-900": true,
        "bg-slate-700": false,
        "text-white": true,
      },
      "px-3",
      "px-4",
      "sm:px-6",
      { "sm:px-8": true },
      null,
      undefined,
      false,
    );

    expect(result).toBe(
      twMerge(
        clsx(
          "inline-flex",
          ["items-center", [{ "justify-center": true }]],
          {
            "bg-slate-900": true,
            "bg-slate-700": false,
            "text-white": true,
          },
          "px-3",
          "px-4",
          "sm:px-6",
          { "sm:px-8": true },
          null,
          undefined,
          false,
        ),
      ),
    );
  });
});
