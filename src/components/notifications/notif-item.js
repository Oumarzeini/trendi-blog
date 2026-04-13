import styled from "styled-components";

const Wraper = styled.div`
  width: 90%;
  height: fit-content;
  border-radius: 10px;
  border: 1px solid var(--notif-border-not-read);
  padding: 10px;
  display: flex !important;
  gap: 15px;
  background-color: var(--notif-bg-not-read);
  color: var(--text);
  margin: 1rem auto 0;
  cursor: pointer;

  &.is-read {
    border-color: var(--notif-border-read);
    background-color: var(--notif-bg-read);
  }
`;

const ProfileSection = styled.section`
  & figure {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const DetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & .name-event-container {
    display: flex;
    gap: 5px;

    & .name {
      font-weight: 600;
    }

    & .event {
      font-size: 0.9rem;
      color: gray;
    }
  }

  & .event-post {
    font-weight: 500;
  }

  & .event-date {
    font-size: 0.9rem;
    color: gray;
  }
`;

const NotifItem = ({
  avatar,
  name,
  event,
  eventPost,
  eventComment,
  date,
  isRead,
}) => {
  return (
    <Wraper className={isRead ? "is-read" : ""}>
      <ProfileSection>
        <figure>
          <img src={avatar} alt="" />
        </figure>
      </ProfileSection>

      <DetailsSection>
        <div className="name-event-container">
          <p className="name">{name}</p>
          <p className="event">{event}</p>
        </div>

        {eventPost && <p className="event-post">{eventPost}</p>}

        {eventComment && <p className="event-post">{eventComment}</p>}

        <p className="event-date">{date}</p>
      </DetailsSection>
    </Wraper>
  );
};

export default NotifItem;
