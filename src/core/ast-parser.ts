/**
 * export const config = {
        DATABASE_URL: {
            type: "string",
            required: true,
        },
    };
 */

/**
Program
└── ExportNamedDeclaration
    └── VariableDeclaration
        └── VariableDeclarator
            ├── Identifier (name: "config")
            └── ObjectExpression
                └── Property
                    ├── Identifier (key: "DATABASE_URL")
                    └── ObjectExpression
                        └── Property
                            ├── Identifier (key: "type")
                            └── Literal (value: "string")
 */

// Use require for CommonJS compatibility
const { parse } = require("@typescript-eslint/parser");

/**
 * parses typescript config files using proper ast parsing
 *
 * this approach uses @typescript-eslint/parser to get a proper ast,
 * then traverses it to find the config export. much more robust than
 * regex-based parsing and handles all typescript syntax correctly.
 *
 * @param configContent - the raw typescript file content
 * @returns parsed config object
 */
export function parseConfigFromAST(configContent: string): any {
  try {
    const ast = parse(configContent, {
      parser: "@typescript-eslint/parser",
      sourceType: "module",
    });

    // Find the config export declaration
    const configExport = ast.body.find(
      (node: any) =>
        node.type === "ExportNamedDeclaration" &&
        node.declaration?.type === "VariableDeclaration" &&
        node.declaration.declarations?.[0]?.id?.name === "config"
    );

    if (!configExport) {
      throw new Error("Could not find config export in env.config.ts");
    }

    return extractConfigFromAST(configExport);
  } catch (error: any) {
    throw new Error(`Failed to parse config file: ${error.message}`);
  }
}

function extractConfigFromAST(node: any): any {
  const variableDecl = node.declaration;
  const declarator = variableDecl.declarations[0];
  const objectExpression = declarator.init;
  return extractObjectExpression(objectExpression);
}

function extractObjectExpression(node: any): any {
  if (!node || node.type !== "ObjectExpression") {
    throw new Error("Expected object expression");
  }

  const result: any = {};

  for (const property of node.properties) {
    if (property.type === "Property") {
      const key = property.key.name;
      const value = extractValue(property.value);
      result[key] = value;
    }
  }

  return result;
}

function extractValue(node: any): any {
  switch (node.type) {
    case "Literal":
      return node.value;
    case "ObjectExpression":
      return extractObjectExpression(node);
    case "ArrayExpression":
      return node.elements.map((element: any) => extractValue(element));
    case "TemplateLiteral":
      return node.quasis.map((quasi: any) => quasi.value.raw).join("");
    default:
      throw new Error(`Unsupported value type: ${node.type}`);
  }
}
