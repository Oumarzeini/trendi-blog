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
  gap: 10px;

  & h3 {
    font-size: 0.8rem;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 10px;
  gap: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  & .saveBtn {
    width: fit-content;
    background-color: rgb(55, 136, 250);
    display: grid;
    place-content: center;
    border: none;
    border-radius: 5px;
    padding: 8px;
    font-size: 1rem;
    color: white;
    cursor: pointer;

    &:active {
      scale: 0.9;
    }
    &:hover {
      background-color: rgba(55, 136, 250, 0.84);
    }
  }
`;

const Line = styled.div`
  width: 100%;
  margin-inline: auto;
  height: 1px;
  background-color: gray;
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
        <Line />

        <NotifComponent
          title="Mentions & Tags"
          subTitle="Alerts when you are referenced in discussions "
        />
        <Line />
        <NotifComponent
          title="Weekly Digest"
          subTitle="Summarized activity sent to your inbox."
        />

        <Line />
        <NotifComponent
          title="New followers"
          note="(Coming soon...)"
          subTitle="Receive an alert when you audience grows."
          disabled={true}
        />

        <Line style={{ marginTop: "20px" }} />

        <h3 style={{ marginTop: "10px" }}>Real-Time Push</h3>
        <NotifComponent
          title="Breaking Alerts"
          subTitle="Major system or community alerts."
        />
        <Line />
        <NotifComponent
          title="Direct Messages"
          note=" (Coming soon...)"
          disabled={true}
          subTitle="Instant alerts for private conversation."
        />
      </ContentWraper>
      <Footer>
        <button className="saveBtn">Save Notification Settings</button>
      </Footer>
    </Container>
  );
};

export default Notifications;
