import { expect, test } from "vitest";
import { RootNode, NodeTypes, } from "../src";
import { codegen } from '../src/codegen';

test("codegen", () => {
 
  const transformedAST = {
    type: NodeTypes.Program,
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'add',
                },
                arguments: [
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                    {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'subtract',
                        },
                        arguments: [
                            {
                                type: 'NumberLiteral',
                                value: '4',
                            },
                            {
                                type: 'NumberLiteral',
                                value: '5',
                            }
                        ]
                    }
                ]
            }
        }
    ]
  }

  expect(codegen(transformedAST)).toMatchInlineSnapshot('"add(2, subtract(4, 5));"');
});

test("codegen two statement", () => {
 
    const transformedAST = {
      type: NodeTypes.Program,
      body: [
          {
              type: 'ExpressionStatement',
              expression: {
                  type: 'CallExpression',
                  callee: {
                      type: 'Identifier',
                      name: 'add',
                  },
                  arguments: [
                      {
                          type: 'NumberLiteral',
                          value: '2',
                      },
                      {
                          type: 'CallExpression',
                          callee: {
                              type: 'Identifier',
                              name: 'subtract',
                          },
                          arguments: [
                              {
                                  type: 'NumberLiteral',
                                  value: '4',
                              },
                              {
                                  type: 'NumberLiteral',
                                  value: '5',
                              }
                          ]
                      }
                  ]
              }
          },
          {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'add',
                },
                arguments: [
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                    {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'subtract',
                        },
                        arguments: [
                            {
                                type: 'NumberLiteral',
                                value: '4',
                            },
                            {
                                type: 'NumberLiteral',
                                value: '5',
                            }
                        ]
                    }
                ]
            }
        }
      ]
    }
  
    expect(codegen(transformedAST)).toMatchInlineSnapshot('"add(2, subtract(4, 5));add(2, subtract(4, 5));"');
  });