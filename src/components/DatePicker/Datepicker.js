import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

/** Manually entering any of the following formats will perform date parsing */
// const dateFormatList = ["MM/DD/YYYY"];
const customFormat = (value) => `${value.format(dateFormat)}`;

export default function BADatePickert(props) {
  const { onChange ,value} = props;
  return (
    <DatePicker
    // value={value}
      onChange={onChange}
      style={{ width: "48%" }}
      // defaultValue={dayjs("01/01/2015", dateFormatList[0])}
      format={customFormat}
    />
  );
}
