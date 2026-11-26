import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const browserSuffix =
  /(?:Component|Service|Directive|Routes?|Guards?|Container|Pipe|Module|Actions?|Effects?|Selectors?|Store|Reducers?|Browser|Registry)$/;

const platformFile = /\.(?:component|service|backend)\.ts$/;
const platformMarker = /(?:^|\s)@(?:browser|backend)\b/;

function isBrowserImport(specifier: TSESTree.ImportClause): boolean {
  if (
    specifier.type !== AST_NODE_TYPES.ImportSpecifier ||
    specifier.importKind === 'type'
  ) {
    return false;
  }

  const { imported } = specifier;
  const name =
    imported.type === AST_NODE_TYPES.Identifier
      ? imported.name
      : imported.value;

  return browserSuffix.test(name);
}

const rule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [],
    messages: {
      tagBrowserImports:
        'Move browser-only imports into a separate declaration ending with // @browser.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;

    if (platformFile.test(context.filename)) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        if (node.importKind === 'type') {
          return;
        }

        const browserSpecifiers = node.specifiers.filter(isBrowserImport);

        if (!browserSpecifiers.length) {
          return;
        }

        const trailingText = sourceCode.lines[node.loc.end.line - 1].slice(
          node.loc.end.column,
        );

        if (platformMarker.test(trailingText)) {
          return;
        }

        context.report({
          node,
          messageId: 'tagBrowserImports',
          fix(fixer) {
            if (
              trailingText.trim() ||
              sourceCode.getCommentsInside(node).length
            ) {
              return null;
            }

            if (browserSpecifiers.length === node.specifiers.length) {
              return fixer.insertTextAfter(node, ' // @browser');
            }

            const sharedSpecifiers = node.specifiers.filter(
              specifier => !isBrowserImport(specifier),
            );
            const formatSpecifiers = (
              specifiers: TSESTree.ImportClause[],
            ): string => {
              const bindings: string[] = [];
              const named: string[] = [];

              for (const specifier of specifiers) {
                const text = sourceCode.getText(specifier);

                if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
                  named.push(text);
                } else {
                  bindings.push(text);
                }
              }

              if (named.length) {
                bindings.push(`{ ${named.join(', ')} }`);
              }

              return bindings.join(', ');
            };

            const fromToken = sourceCode.getTokenBefore(node.source);

            if (!fromToken || fromToken.value !== 'from') {
              return null;
            }

            const fromClause = sourceCode.text.slice(
              fromToken.range[0],
              node.range[1],
            );
            const indent =
              sourceCode.lines[node.loc.start.line - 1].match(/^\s*/)?.[0] ??
              '';
            const newline = sourceCode.text.includes('\r\n') ? '\r\n' : '\n';

            return fixer.replaceText(
              node,
              [
                `import ${formatSpecifiers(sharedSpecifiers)} ${fromClause}`,
                `${indent}import ${formatSpecifiers(browserSpecifiers)} ${fromClause} // @browser`,
              ].join(newline),
            );
          },
        });
      },
    };
  },
});

export default rule;
