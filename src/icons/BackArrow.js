const BackArrow = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 42 42"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z"
      fill={color}
      fillRule="evenodd"
    />
  </svg>
);

export default BackArrow;
