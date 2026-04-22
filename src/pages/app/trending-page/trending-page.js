import ComingSoon from "../../../components/ui/coming-soon";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const TrendingPage = () => {
  return (
    <Main>
      <ComingSoon />
    </Main>
  );
};

export default TrendingPage;
