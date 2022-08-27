import { test, expect } from "vitest";
import { parser, Token, TokenTypes, NodeTypes } from "../src";

test("parser", () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "5" },
    { type: TokenTypes.Number, value: "6" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: "4",
              },
              {
                type: NodeTypes.CallExpression,
                name: "add",
                params: [
                  {
                    type: NodeTypes.NumberLiteral,
                    value: "5",
                  },
                  {
                    type: NodeTypes.NumberLiteral,
                    value: "6",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});

test.skip("one child ast", () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "3" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "3",
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});

test.skip("two child ast", () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "3" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "5" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "3",
          },
        ],
      },
      {
        type: NodeTypes.CallExpression,
        name: "subtract",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "5",
          },
        ],
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});
