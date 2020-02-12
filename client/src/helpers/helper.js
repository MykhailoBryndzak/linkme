export const getError = (errors, type) => {
  if (!errors) return "";
  let error = "";

  errors.forEach((item) => {
    if (type === item.param) {
      error = item.msg
    }
  });

  return error;
};