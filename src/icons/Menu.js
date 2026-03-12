const Menu = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="-5 -7 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      backgroundColor: "rgb(224, 236, 255)",
      padding: "3px",
      borderRadius: "8px",
    }}
  >
    <path
      d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"
      fill={color}
    />
  </svg>
);

export default Menu;
