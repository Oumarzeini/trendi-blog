import styled from "styled-components";
import Account from "../../../components/settings/Account";
import Notifications from "../../../components/settings/Notifications";
import DangerZone from "../../../components/settings/DangerZone";
import DeletePostsModel from "../../../components/settings/DeletePostsModel";
import DeleteAccountModel from "../../../components/settings/DeleteAccountModel";
import { useState } from "react";
import { Activity } from "react";

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding: 10px;
  margin: 0;
  position: relative;

  @media (max-width: 768px) {
    align-items:;
  }
`;

const Wraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding-top: 40px;
  gap: 40px;
  margin-inline: auto;

  @media (min-width: 768px) {
    padding-left: 20px;
  }
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Settings = () => {
  const [showDeletePostsModel, setShowDeletePostsModel] = useState(false);
  const [showDeleteAccountModel, setShowDeleteAccountModel] = useState(false);

  return (
    <>
      <Main>
        <header>
          <h2>Settings</h2>
        </header>

        <Wraper>
          <Account />
          <Notifications />
          <DangerZone
            setShowDeletePostsModel={setShowDeletePostsModel}
            setShowDeleteAccountModel={setShowDeleteAccountModel}
          />
        </Wraper>
      </Main>
      <Activity mode={showDeletePostsModel ? "visible" : "hidden"}>
        <DeletePostsModel setShowDeletePostsModel={setShowDeletePostsModel} />
      </Activity>
      <Activity mode={showDeleteAccountModel ? "visible" : "hidden"}>
        <DeleteAccountModel
          setShowDeleteAccountModel={setShowDeleteAccountModel}
        />
      </Activity>
    </>
  );
};

export default Settings;
