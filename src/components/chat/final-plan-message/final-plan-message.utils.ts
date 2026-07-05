/** Strip legacy "Final Plan" title prefix; body is markdown. */
export function toMarkdown(text: string): string {
  return text.replace(/^Final Plan\s*\n+/i, "").trim();
}
