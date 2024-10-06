import dayjs from "dayjs";

const FORMAT = "DD MM YYYY";

const formatDate = (isoString: string) => {
  return dayjs(isoString).format(FORMAT);
};

export default formatDate;
