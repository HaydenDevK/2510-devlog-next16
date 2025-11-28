export const estimateReadTime = (content: string) => {
  const words = content.split(" ").length;
  const readTime = Math.ceil(words / 200);
  return `${readTime} min read`;
};
