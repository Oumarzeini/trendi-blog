const MenuClose = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      backgroundColor: "rgb(224, 236, 255)",
      padding: "3px",
      borderRadius: "8px",
    }}
  >
    <path
      d="M3 6h10v2H3V6m0 10h10v2H3v-2m0-5h12v2H3v-2m13-4l-1.42 1.39L18.14 12l-3.56 3.61L16 17l5-5l-5-5Z"
      fill={color}
    />
  </svg>
);

export default MenuClose;
