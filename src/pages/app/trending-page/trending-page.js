import ComingSoon from "../../../components/ui/coming-soon";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  width: 100%;
  padding-top: 50px;
`;

const TrendingPage = () => {
  return (
    <Main>
      <ComingSoon />
    </Main>
  );
};

export default TrendingPage;
