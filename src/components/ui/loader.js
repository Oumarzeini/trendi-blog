import styled from "styled-components";
import logo from "../../images/logo.png";

const Wraper = styled.div`
  display: felx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: auto;

  & p {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    text-align: center;
    margin-top: 1rem;
  }
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  animation: scale-animation 0.4s linear infinite alternate-reverse;

  @keyframes scale-animation {
    from {
      scale: 1;
    }
    to {
      scale: 1.1;
    }
  }
`;

const Loader = () => {
  return (
    <Wraper>
      <Img src={logo} />
      <p>One Moment...</p>
    </Wraper>
  );
};

export default Loader;
