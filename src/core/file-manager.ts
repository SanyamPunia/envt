import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { format } from "prettier";

export async function writeValidationFile(
  content: string,
  fileType: string = "js"
): Promise<void> {
  const outputPath = `env-validation.${fileType}`;
  const fullPath = join(process.cwd(), outputPath);

  // Format the content with Prettier
  const formattedContent = await format(content, {
    parser: fileType === "ts" ? "typescript" : "babel",
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
  });

  writeFileSync(fullPath, formattedContent, "utf-8");
}

export function writeTypeFile(
  content: string,
  outputPath: string = "env.d.ts"
): void {
  const fullPath = join(process.cwd(), outputPath);
  writeFileSync(fullPath, content, "utf-8");
}

export function readConfigFile(configPath: string): string {
  const fullPath = join(process.cwd(), configPath);
  if (!existsSync(fullPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }
  return readFileSync(fullPath, "utf-8");
}

export function fileExists(filePath: string): boolean {
  const fullPath = join(process.cwd(), filePath);
  return existsSync(fullPath);
}

export function createDirectory(dirPath: string): void {
  const fullPath = join(process.cwd(), dirPath);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
  }
}

export function writeFile(filePath: string, content: string): void {
  const fullPath = join(process.cwd(), filePath);
  const dir = dirname(fullPath);

  // create dir if !exists
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(fullPath, content, "utf-8");
}
