import styled from "styled-components";

const Wraper = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.p`
  color: var(--text);
`;

const Line = styled.div`
  width: 90%;
  height: 1px;
  background-color: var(--border);
  transform: translateY(3px);
`;

const DateSeperator = ({ title }) => {
  return (
    <Wraper>
      <Title>{title}</Title>
      <Line />
    </Wraper>
  );
};

export default DateSeperator;
