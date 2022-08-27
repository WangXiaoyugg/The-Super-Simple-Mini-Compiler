import { expect, test } from "vitest";
import { RootNode, NodeTypes, } from "../src";
import { traverser, Visitor } from '../src/traverser';

test("traverser", () => {
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
  const callArray:any[] = [];
  const visitor: Visitor = {
    'Program': {
        enter(node, parent) {
            callArray.push(['Program-enter', node.type, ''])
        },
        exit(node, parent) {
            callArray.push(['Program-exit', node.type, ''])
        }
    },
    'CallExpression': {
        enter(node, parent) {
            callArray.push(['CallExpression-enter', node.type, parent?.type])
        },
        exit(node, parent) {
            callArray.push(['CallExpression-exit', node.type, parent?.type])
        }
    },
    'NumberLiteral': {
        enter(node, parent) {
            callArray.push(['NumberLiteral-enter', node.type, parent?.type])
        },
        exit(node, parent) {
            callArray.push(['NumberLiteral-exit', node.type, parent?.type])
        }
    }

  }

  traverser(ast, visitor)

  expect(callArray).toEqual([
    ['Program-enter', NodeTypes.Program, ''],
    ['CallExpression-enter', NodeTypes.CallExpression, NodeTypes.Program],
    ['NumberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['CallExpression-enter', NodeTypes.CallExpression, NodeTypes.CallExpression],
    ['NumberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['CallExpression-exit', NodeTypes.CallExpression, NodeTypes.CallExpression],
    ['CallExpression-exit', NodeTypes.CallExpression, NodeTypes.Program],
    ['Program-exit', NodeTypes.Program, ''],
  ])


});
