export const getFileNameFromContentDisposition = (
  contentDisposition?: string
): string => {
  console.log("contentDisposition", contentDisposition);
  if (!contentDisposition) return "download";

  let fileName =
    contentDisposition.match(/filename\*=UTF-8''(.+)/)?.[1] ||
    contentDisposition.match(/filename="(.+)"/)?.[1] ||
    contentDisposition.match(/filename=(.+)/)?.[1];

  if (!fileName) return "download";
  fileName = decodeURIComponent(fileName);
  fileName = fileName.replace(/\.[^/.]+$/, "");

  return fileName;
};
