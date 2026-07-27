/** Triggers a browser download for content generated in memory. */
export function downloadFile(
  content: BlobPart,
  fileName: string,
  mimeType: string
): void {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
