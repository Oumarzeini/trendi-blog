import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import logo from "../../images/logo.png";

const Wraper = styled.div`
  border-radius: 10px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  padding-left: 50px;
  border: 1px solid var(--primary);
  border-left: 5px solid var(--primary);

  @media (max-width: 500px) {
    flex-direction: column;
    border-left: none;
    gap: 40px;
    justify-content: flex-start;
    align-items: center;
    border: none;
    width: 80%;
    padding-left: 10px;
  }

  & figure {
    width: 150px;
    height: 150px;

    & img {
      width: 100%;
      height: 100%;
    }
  }

  & p {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(to right, blue, rgb(177, 206, 250));
    background-clip: text;
    color: transparent;

    & .coming-soon {
      font-size: 3rem;
      padding: 0;
      margin: 0;
      font-weight: 800;
      white-space: nowrap;
    }
  }
`;

const ComingSoon = () => {
  const darkMode = useStoreState((state) => state.theme.darkMode);

  return (
    <Wraper>
      <figure>
        <img src={logo} alt="" />
      </figure>
      <p className={darkMode ? "isDark" : ""}>
        {" "}
        <span className="this-feature">This Feature is</span> <br />
        <span className="coming-soon">coming soon...</span>{" "}
      </p>
    </Wraper>
  );
};

export default ComingSoon;
