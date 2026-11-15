import { parse } from '@babel/parser';
import MagicString from 'magic-string';
import type { Plugin } from 'vite';

export function taonAngularResourcesPlugin(): Plugin {
  return {
    name: 'taon-angular-resources',
    enforce: 'pre',

    transform(source, id) {
      const filePath = id.split('?')[0];

      if (
        !filePath.endsWith('.component.ts') ||
        !filePath.includes('/tmp-src-app-dist/') ||
        (!source.includes('templateUrl') && !source.includes('styleUrls'))
      ) {
        return null;
      }

      const ast = parse(source, {
        sourceType: 'module',
        plugins: ['typescript', 'decorators-legacy'],
      });

      const magic = new MagicString(source);
      const imports: string[] = [];
      let index = 0;

      const visit = (node: any): void => {
        if (!node || typeof node !== 'object') {
          return;
        }

        if (
          node.type === 'Decorator' &&
          node.expression?.type === 'CallExpression' &&
          node.expression.callee?.name === 'Component'
        ) {
          const metadata = node.expression.arguments[0];

          if (metadata?.type === 'ObjectExpression') {
            for (const property of metadata.properties) {
              if (property.type !== 'ObjectProperty') {
                continue;
              }

              const key = property.key?.name ?? property.key?.value;

              if (key === 'templateUrl') {
                const url = property.value.value;

                if (typeof url !== 'string') {
                  continue;
                }

                const variable = `__taonTemplate${index++}`;

                imports.push(
                  `import ${variable} from ${JSON.stringify(url + '?raw')};`,
                );

                magic.overwrite(
                  property.start,
                  property.end,
                  `template: ${variable}`,
                );
              }

              if (key === 'styleUrls') {
                const elements = property.value.elements;

                if (!Array.isArray(elements)) {
                  continue;
                }

                const variables = elements.map((element: any) => {
                  const url = element?.value;

                  if (typeof url !== 'string') {
                    return null;
                  }

                  const variable = `__taonStyle${index++}`;

                  imports.push(
                    `import ${variable} from ${JSON.stringify(url + '?inline')};`,
                  );

                  return variable;
                });

                if (variables.some(value => value === null)) {
                  continue;
                }

                magic.overwrite(
                  property.start,
                  property.end,
                  `styles: [${variables.join(', ')}]`,
                );
              }
            }
          }
        }

        for (const value of Object.values(node)) {
          if (Array.isArray(value)) {
            value.forEach(visit);
          } else if (value && typeof value === 'object') {
            visit(value);
          }
        }
      };

      visit(ast.program);

      if (imports.length === 0) {
        return null;
      }

      magic.prepend(imports.join('\n') + '\n');

      return {
        code: magic.toString(),
        map: magic.generateMap({ hires: true }),
      };
    },
  };
}
