import { RootNode, NodeTypes, NumberNode } from "./parser";
import { traverser } from "./traverser";
export function transform(ast: RootNode) {
  let newAst = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression:any = {
            type: NodeTypes.CallExpression,
            callee: {
              type: "Identifier",
              name: node.name,
            },
            arguments: [],
          };

          node.context = expression.arguments;

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: "ExpressionStatement",
              expression,
            };
          }

          parent?.context?.push(expression);

        }

      },
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          let numberNode: any = {
            type: "NumberLiteral",
            value: node.value,
          };
          parent?.context?.push(numberNode);
        }
      },
    },
  });

  return newAst
}
