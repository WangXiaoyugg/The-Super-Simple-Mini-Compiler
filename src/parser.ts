import { Token, TokenTypes } from './tokenizer';
export enum NodeTypes {
    Program = 'program',
    CallExpression = 'CallExpression',
    NumberLiteral = 'NumberLiteral',
}

interface Node {
    type: NodeTypes,
}

type ChildNode = NumberNode | CallExpressionNode

interface RootNode extends Node {
    body: ChildNode[]
}
interface NumberNode extends Node {
    value: string;
}
interface CallExpressionNode extends Node {
    name: string,
    params: ChildNode[]
}
 
function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        body: []
    }
}

function createCallExpressionNode(name: string): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: [],
    }
}

function createNumberNode(value: string): NumberNode {
    return {
        type: NodeTypes.NumberLiteral,
        value,
    }
}

export function parser(tokens: Token[]) {
    let current = 0;
    const rootNode = createRootNode();

    function walk() {
        let token = tokens[current];
        if (token.type === TokenTypes.Number) {
            current++
            return createNumberNode(token.value);
        }

        if (token.type === TokenTypes.Paren && token.value === '(') {
            token = tokens[++current];
            const callExpressionNode = createCallExpressionNode(token.value);
            token = tokens[++current];
            // 循环结束条件: 遇到右括号就结束
            while(!(token.type === TokenTypes.Paren && token.value === ')')) {
                callExpressionNode.params.push(walk());
                token = tokens[current];
            }
            current++;
            return callExpressionNode;
        }

        throw new Error(`unknown token: ${token.value}`)
    }
    while (current < tokens.length) {
        rootNode.body.push(walk())
    }
    return rootNode;
}