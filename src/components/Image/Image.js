import { Image } from "antd";
export default function BAImage(props) {
    const {src}=props
  return (
    <Image style={{borderRadius:100}}
      width="100%"
      src={src}
    />
  );
}
// 9c288d