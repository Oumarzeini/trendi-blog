const Add = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13 4v7h7v2h-7v7h-2v-7H4v-2h7V4h2Z" fill={color} />
  </svg>
);

export default Add;
