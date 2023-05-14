import { Select } from "antd";

const onSearch = (value) => {
  console.log("search:", value);
};
export default function BASelect(props) {
  const { placeholder,onChangeSelect,value } = props;
  return (
    <Select
    value={value}
      style={{ width: "48%" ,marginRight:10}}
      placeholder={placeholder}
      onChange={onChangeSelect}
      options={[
        {
          value: true,
          label: "true",
        },
        {
          value: false,
          label: "false",
        },
      ]}
    />
  );
}
