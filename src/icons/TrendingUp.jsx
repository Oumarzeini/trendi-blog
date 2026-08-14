const TrendingUp = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 2048 2048"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2048 341v683h-171V633l-768 768l-341-342l-665 665l-121-120l786-786l341 341l648-647h-392V341h683z"
      fill={color}
    />
  </svg>
);

export default TrendingUp;
