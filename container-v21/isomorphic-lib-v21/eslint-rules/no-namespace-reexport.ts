// eslint-rules/no-namespace-reexport.ts
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils';

const rule = {
  meta: {
    type: 'problem',
    schema: [],
    messages: {
      noReexport:
        'Re-exporting namespaces inside namespaces is forbidden. Use direct imports instead.',
    },
  },

  create(context) {
    return {
      TSModuleDeclaration(node: TSESTree.TSModuleDeclaration) {
        if (
          !node.body ||
          node.body.type !== AST_NODE_TYPES.TSModuleBlock
        ) {
          return;
        }

        for (const stmt of node.body.body) {
          // -------------------------------------------------
          // case 1: export import X = Y;
          // -------------------------------------------------
          if (
            stmt.type === AST_NODE_TYPES.ExportNamedDeclaration &&
            stmt.declaration?.type ===
              AST_NODE_TYPES.TSImportEqualsDeclaration
          ) {
            context.report({
              node: stmt,
              messageId: 'noReexport',
            });
          }

          // -------------------------------------------------
          // case 2: export * as X from './x';
          // -------------------------------------------------
          if (
            stmt.type === AST_NODE_TYPES.ExportNamedDeclaration &&
            stmt.specifiers.some(
              s =>
                s.type === AST_NODE_TYPES.ExportSpecifier &&
                s.exported.type === AST_NODE_TYPES.Identifier
            )
          ) {
            context.report({
              node: stmt,
              messageId: 'noReexport',
            });
          }
        }
      },
    };
  },
};

export default rule;
