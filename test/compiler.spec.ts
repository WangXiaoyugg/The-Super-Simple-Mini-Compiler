import { test, expect } from "vitest";
import { compiler } from "../src/compiler";

test('compiler', () => {
    const code = '(add 2 (subtract 4 2))'
    const targetCode = 'add(2, subtract(4, 2));'
    expect(compiler(code)).toBe(targetCode);
})