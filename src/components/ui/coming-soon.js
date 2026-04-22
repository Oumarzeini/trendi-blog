import styled from "styled-components";

const Wraper = styled.div`
  width: 300px;
  height: 100px;
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    var(--primary),
    rgb(177, 205, 247)
  );
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }
`;

const ComingSoon = () => {
  return (
    <Wraper>
      <p>This Feature is coming soon...</p>
    </Wraper>
  );
};

export default ComingSoon;
