export const getWidthAndHeight = (url) => {
  const imageName = url.split("/");
  const data = imageName[imageName.length - 1]
    .split("-")[1]
    .split(".")[0]
    .split("x");
  return data;
};

export const getTextFromDescription = (description) => {
  return description?.map((para) => {
    return para.children
      .reduce((prev, cur) => {
        return prev + " " + cur.text;
      }, "")
      .trim();
  });
};
