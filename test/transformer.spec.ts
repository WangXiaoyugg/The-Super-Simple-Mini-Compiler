import { expect, test } from "vitest";
import { RootNode, NodeTypes, } from "../src";
import { transform } from '../src/transform';

test("transformer", () => {
  const ast: RootNode = {
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
                type: NodeTypes.NumberLiteral,
                value: "5",
              },
            ],
          },
        ],
      },
    ],
  };
  
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

  expect(transform(ast)).toEqual(transformedAST);


});
