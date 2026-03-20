import styled from "styled-components";
import SectionHeader from "./SectionHeader";
import NotifComponent from "./NotifItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fbfbfb;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 3px gray;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentWraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;

  & h3 {
    font-size: 0.8rem;
  }
`;

const Notifications = () => {
  return (
    <Container>
      <SectionHeader
        title="Notifications"
        subTitle="Control your email, push, and digest preferences."
      />

      <ContentWraper>
        <h3>Email Notifications</h3>
        <NotifComponent
          title="Comments on my posts"
          subTitle="Get notified when someone intracts with your articles."
        />
        <NotifComponent
          title="New followers"
          subTitle="Receive an alert when you audience grows."
        />
        <NotifComponent
          title="Mentions & Tags"
          subTitle="Alerts when you are referenced in discussions "
        />
        <NotifComponent
          title="Weekly Digest"
          subTitle="Summarized activity sent to your inbox."
        />
      </ContentWraper>
    </Container>
  );
};

export default Notifications;
