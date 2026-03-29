const OpenSidebar = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    style={{
      marginRight: "1rem",
    }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m7 10l2 2l-2 2m5-9v14M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default OpenSidebar;
