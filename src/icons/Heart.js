// export const Heart = ({ height, width, color }) => (
//   <svg
//     height={height}
//     width={width}
//     fill={color}
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"
//       fill={color}
//     />
//   </svg>
// );

// export default Heart;

const Heart = ({ height, width, color }) => (
  <svg
    height={height}
    width={width}
    role="button"
    style={{
      cursor: "pointer",
    }}
    stroke={color !== "red" ? "black" : "none"}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
      fill={color === "red" ? "red" : "none"}
    />
  </svg>
);

export default Heart;

// export const Heart = ({ height, width, color }) => (
//   <svg
//     height={height}
//     width={width}
//     role="button"
//     style={{
//       cursor: "pointer",
//     }}
//     stroke={color !== "red" ? "black" : "none"}
//     viewBox="0 0 1025 1024"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="m805.694 724l-293 300l-294-300q-119-122-168.5-231T.694 256q0-106 75-181t181-75t181 75t75 181q0-106 75-181t181-75t181 75t75 181q0 127-49.5 236.5T805.695 724z"
//       fill={color === "red" ? "red" : "none"}
//     />
//   </svg>
// );

// export default Heart;

// const Heart = ({ height, width, color }) => (
//   <svg
//     height={height}
//     width={width}
//     role="button"
//     style={{
//       cursor: "pointer",
//     }}
//     stroke={color !== "red" ? "black" : "none"}
//     viewBox="0 0 17 16"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12.958 1.03a4.015 4.015 0 0 0-3.911 3.148A4.054 4.054 0 0 0 5.102 1.03c-2.237 0-4.05 1.824-4.05 4.072c0 6.496 8.005 9.838 8.005 9.838s7.912-3.258 7.912-9.879c0-2.228-1.795-4.031-4.011-4.031z"
//       fill={color === "red" ? "red" : "none"}
//       fillRule="evenodd"
//     />
//   </svg>
// );

// export default Heart;
