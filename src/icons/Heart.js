const Heart = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    role="button"
    style={{
      cursor: "pointer",
    }}
    stroke={color !== "#ff4d6d" ? "black" : "none"}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
      fill={color === "#ff4d6d" ? "#ff4d6d" : "transparent"}
      stroke={color === "#ff4d6d" ? "" : `var(--text)`}
    />
  </svg>
);

export default Heart;
