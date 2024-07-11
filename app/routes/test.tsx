export default function Test() {
  const shapeStyle = {
    width: "500px",
    height: "250px",
    backgroundColor: "#5E2E96",
    clipPath:
      "polygon(0 20%, 10% 20%, 10% 0, 90% 0, 90% 20%, 100% 20%, 100% 80%, 90% 80%, 90% 100%, 10% 100%, 10% 80%, 0 80%)",
  };

  return <div style={shapeStyle}></div>;
}
