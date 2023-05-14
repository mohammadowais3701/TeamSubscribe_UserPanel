import { Button } from "antd";

export default function BAButton(props) {
  const {
    type,
    block,
    onClick,
    value,
    borderRadius,
    outline,
    border,
    backgroundColor,
    className,
    color,
  } = props;
  return (
    <Button
      className={className}
      style={{
        backgroundColor: backgroundColor ?? "",
        color: color ?? "",
        outline: outline ?? "none",
        border: border ?? "none",
        fontWeight: "bold",
        borderRadius:borderRadius??"0px",minHeight:40
      }}
      type={type}
      block={block}
      onClick={onClick}
    >
      {value}
    </Button>
  );
}
