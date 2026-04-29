/** Minimal escape for building contenteditable HTML from plain text. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function plainTextToEditableHtml(text: string): string {
  const esc = escapeHtml(text);
  return `<p>${esc.replace(/\n/g, "<br>")}</p>`;
}
