import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transform } from './transform';
import { codegen } from './codegen';

export function compiler (code: string){
    const tokens  = tokenizer(code);
    const ast = parser(tokens);
    const transformedAST = transform(ast);
    const targetCode = codegen(transformedAST);
    
    return targetCode;
};
