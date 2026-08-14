const DownArrow = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36 18L24 30L12 18"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
  </svg>
);

export default DownArrow;
