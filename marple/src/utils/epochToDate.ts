const convertEpochToDateString = (epoch: number) => {
  var date = new Date(epoch * 1000); // Convert seconds to milliseconds
  return date.toLocaleString();
};

export default convertEpochToDateString;
