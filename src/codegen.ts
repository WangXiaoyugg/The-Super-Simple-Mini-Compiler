
export function codegen(node: any) {
    switch(node.type) {
        case 'Program':
            return node.body.map(codegen).join('');
        case 'ExpressionStatement':
            return codegen(node.expression)+";"
        case 'CallExpression':
            return node.callee.name + '(' + node.arguments.map(codegen).join(', ') + ')';
        case 'NumberLiteral':
            return node.value;
           
    }
};
