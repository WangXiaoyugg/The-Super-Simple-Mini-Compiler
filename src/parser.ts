import { Token, TokenTypes } from './tokenizer';
export enum NodeTypes {
    Program = 'Program',
    CallExpression = 'CallExpression',
    NumberLiteral = 'NumberLiteral',
}

interface Node {
    type: NodeTypes,
    context?: any[]
}

export type ChildNode = NumberNode | CallExpressionNode

export interface RootNode extends Node {
    type: NodeTypes.Program;
    body: ChildNode[];
    
}
export interface NumberNode extends Node {
    type: NodeTypes.NumberLiteral
    value: string;
}
export interface CallExpressionNode extends Node {
    type: NodeTypes.CallExpression
    name: string;
    params: ChildNode[],
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