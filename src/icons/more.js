export const More = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill={color}>
      <circle cx="6" cy="12" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="18" cy="12" r="1.75" />
    </g>
  </svg>
);

export default More;
