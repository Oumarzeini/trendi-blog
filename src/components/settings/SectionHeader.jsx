import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  background-color: rgb(55, 136, 250);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const SectionHeader = ({ title, subTitle }) => {
  return (
    <Header>
      <h3>{title}</h3>
      <p>{subTitle}</p>
    </Header>
  );
};

export default SectionHeader;
