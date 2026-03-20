import styled from "styled-components";
import Account from "../../../components/settings/Account";
import Notifications from "../../../components/settings/Notifications";

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

const Menu = styled.div`
  position: fixed;
  right: 10px;
  top: 90px;
  width: 200px;
  height: fit-content;
  padding: 10px;
  box-shadow: 0 0 4px gray;
  background-color: #f6f6fb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tab = styled.button`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  padding: 10px;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
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
  return (
    <>
      <Main>
        <header>
          <h2>Settings</h2>
        </header>

        <Wraper>
          <Account />
          <Notifications />
        </Wraper>
      </Main>
    </>
  );
};

export default Settings;

{
  /* <Menu>
          <Tab>Profile</Tab>
          <Tab>Appearance</Tab>
          <Tab>Notification</Tab>
          <Tab>Privacy</Tab>
          <Tab>Billing</Tab>
        </Menu> */
}

//  <section className="infoSection">
//           <div className="figureContainer">
//             <figure>
//               <img src={profileImg} alt="" />
//               <span className="editIconSpan">
//                 <Edit width={"30px"} height={"30px"} color={"white"} />
//               </span>
//             </figure>
//           </div>
//           <div className="SettingsNameNUsernameContainer">
//             <div className="inputLabelContainer">
//               <label htmlFor="fullname">Fullname</label>
//               <input
//                 id="fullname"
//                 className="fullnameInput"
//                 type="text"
//                 value={fullname}
//                 onChange={(e) => setFullname(e.target.value)}
//               />
//             </div>
//             <div className="inputLabelContainer">
//               <label htmlFor="username">Username</label>
//               <input
//                 id="username"
//                 className="usernameInput"
//                 type="text"
//                 value={username}
//               />
//             </div>
//           </div>
//           <div className="descriptionInputContainer">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               className="descriptionTextInput"
//               type="text"
//               value="Digital nomad & tech enthusiast sharing stories about remote work,
//               coding, and modern lifestyle. Coffee addict ☕️.
//             "
//             />
//           </div>
//           <button className="saveProfileBtn">Save</button>
//         </section>
