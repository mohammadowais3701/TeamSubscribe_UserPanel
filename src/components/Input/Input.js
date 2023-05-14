import { Input } from "antd";
import "./style.css";
export default function BAInput(props) {
  const { type, onChange, placeholder, value, className } = props;
  return (
    <Input
      className={className}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
