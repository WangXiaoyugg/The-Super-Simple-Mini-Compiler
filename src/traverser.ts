import { RootNode, NodeTypes, ChildNode, CallExpressionNode } from './parser';

type ParentNode = RootNode | CallExpressionNode | undefined;
type VisitorMethod = (node: RootNode | ChildNode, parent: ParentNode) => void;

export interface VisitorOption {
  enter?: VisitorMethod;
  exit?: VisitorMethod;
}
export interface Visitor {
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption;
}

export function traverser(ast: RootNode, visitor: Visitor) {
  // 遍历子节点
  function traverseArray(nodes: ChildNode[], parent: ParentNode) {
    nodes.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  // 遍历每一个节点
  function traverseNode(node: RootNode | ChildNode, parent?: ParentNode) {
    const method = visitor[node.type];
    if (method && method.enter) {
      method.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.NumberLiteral:
        break;
      default:
        break;
    }

    if (method && method.exit) {
      method.exit(node, parent);
    }
  }

  traverseNode(ast);
}
