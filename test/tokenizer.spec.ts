import { test, expect } from "vitest";
import { tokenizer } from "../src";

test("tokenizer", () => {
  const code = "(add 2 (subtract 4 2))";
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "paren", value: "(" },
    { type: "name", value: "subtract" },
    { type: "number", value: "4" },
    { type: "number", value: "2" },
    { type: "paren", value: ")" },
    { type: "paren", value: ")" },
  ];
  console.log(tokenizer(code));
  expect(tokenizer(code)).toEqual(tokens);
});
