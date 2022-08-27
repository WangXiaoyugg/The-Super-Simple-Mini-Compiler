export enum TokenTypes {
  Paren = "paren",
  Name = "name",
  Number = "number",
}
export interface Token {
  type: TokenTypes;
  value: string;
}
export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
  while (current < code.length) {
    // handle left paren;
    if (code[current] === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: code[current],
      });
      current++;
      continue;
    }

    // handle right paren;
    if (code[current] === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: code[current],
      });
      current++;
      continue;
    }

    // handle space char;
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(code[current])) {
      current++;
      continue;
    }

    // handle name char;
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(code[current])) {
      let value = "";
      while (current < code.length && LETTERS.test(code[current])) {
        value += code[current];
        current++;
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });
      continue;
    }

    // handle number;
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(code[current])) {
      let value = "";
      while (current < code.length && NUMBERS.test(code[current])) {
        value += code[current];
        current++;
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
      continue;
    }
  }

  return tokens;
}
