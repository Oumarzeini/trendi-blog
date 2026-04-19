import styled from "styled-components";
import statsData from "../../../data/stats";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;

  & h2 {
    color: var(--primary);
  }
`;

const StatsContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 40px;
`;

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 4px var(--border);
  width: 150px;
  height: 150px;

  @media (min-width: 768px) {
    width: 400px;
    height: 200px;
  }

  & .icon-container {
    padding: 5px;
    width: fit-content;
    height: fit-content;
    background-color: var(--icon-container);
    border-radius: 8px;
  }

  & .stat-number {
    font-weight: 600;
    font-size: 1.2rem;
  }

  & .stat-label {
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

const StatsPage = () => {
  return (
    <Main>
      <Header>
        <h2>Your Stats</h2>
        <p>Track your posts analytics and intraction stats.</p>
      </Header>

      <StatsContainer>
        {statsData.map((stat) => (
          <Stat key={stat.label} stat={stat}></Stat>
        ))}
      </StatsContainer>
    </Main>
  );
};

const Stat = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <StyledStat>
      <div className="icon-container">
        <span>
          <Icon />
        </span>
      </div>

      <p className="stat-number">{stat.statNumber}</p>

      <p className="stat-label">{stat.label}</p>
    </StyledStat>
  );
};

export default StatsPage;
