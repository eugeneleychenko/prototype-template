export function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string
): { next: string; caret: number } {
  if (start > end) [start, end] = [end, start];
  const selected = value.slice(start, end);
  const next = value.slice(0, start) + before + selected + after + value.slice(end);
  const caret = start + before.length + selected.length + after.length;
  return { next, caret };
}
