import styled from "styled-components";
import { useState } from "react";
import DateSeperator from "../../../components/notifications/date-seperator";
import ReadLine from "../../../icons/read-line";
import NotifItem from "../../../components/notifications/notif-item";
import notificationsList from "../../../data/notifications-list";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 1rem;

  & h2 {
    color: var(--primary);
  }
`;

const NotifHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 3rem auto 0;

  & p {
    border: 1px solid var(--border);
    padding: 5px;
    padding-inline: 8px;
    border-radius: 5px;
  }

  & button {
    font-size: 0.9rem;
    padding: 10px;
    border: none;
    background-color: green;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    & span {
      white-space: nowrap;
    }
  }
`;

const Line = styled.div`
  width: 90%;
  height: 1px;
  background-color: gray;
  margin: auto;
`;

const getDateGroupTitle = (date) => {
  if (date.includes("m") || date.includes("h")) return "Today";
  if (date.includes("d")) return "Yesterday";
  return "Earlier";
};

const NotificationsPage = () => {
  const [isRead, setIsRead] = useState(false);

  const groupedNotifications = notificationsList.reduce((groups, notif) => {
    const groupTitle = getDateGroupTitle(notif.date);
    groups[groupTitle] = groups[groupTitle] ?? [];
    groups[groupTitle].push(notif);
    return groups;
  }, {});

  const orderedGroupTitles = ["Today", "Yesterday", "Earlier"];

  return (
    <Main>
      <Header>
        <h2>Notifications</h2>
        <p>Stay updated with your community intractions and activity</p>
      </Header>

      <NotifHead>
        <p>All Notifications</p>
        <button
          onClick={() => {
            setIsRead(true);
          }}
          style={{
            color: isRead ? "lightgray" : "",
          }}
        >
          <ReadLine
            height={"20px"}
            width={"20px"}
            color={isRead ? "lightgray" : "white"}
          />{" "}
          <span>Mark all as read </span>
        </button>
      </NotifHead>

      <Line />

      {orderedGroupTitles.map(
        (title) =>
          groupedNotifications[title] && (
            <section key={title}>
              <DateSeperator title={title} />
              {groupedNotifications[title].map((notifItem, i) => (
                <NotifItem
                  isRead={isRead}
                  key={`${title}-${i}`}
                  avatar={notifItem.avatar}
                  name={notifItem.name}
                  event={notifItem.event}
                  eventPost={notifItem?.eventPost}
                  eventComment={notifItem?.eventComment}
                  date={notifItem.date}
                />
              ))}
            </section>
          ),
      )}
    </Main>
  );
};

export default NotificationsPage;
