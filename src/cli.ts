// CLI handling
export function getFilePathFromArgs(): string | null {
  const args = process.argv;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" && i + 1 < args.length) {
      return args[i + 1];
    }
  }
  return null;
}
