import "./AuthPage.css";
import SignIn from "../../components/auth/sign in/SignIn";
import logo from "../../images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import RecoverPassword from "../../components/auth/recover-password";
import SetName from "../../components/auth/set-name";
import Notify from "../../components/ui/notify";

const AuthPage = () => {
  const [authOption, setAuthOption] = useState("signin");
  const [showRecover, setShowRecover] = useState(false);
  const [showSetName, setShowSetName] = useState(false);

  return (
    <main className="authPageMain">
      <Notify />
      <section className="logoSection">
        <figure>
          <img src={logo} alt="" />
        </figure>
        <p>Read, write and connect on the go.</p>
      </section>

      {showSetName ?
        <SetName />
      : !showRecover ?
        <section>
          <div className="signingOptionsContainer">
            <button
              onClick={() => setAuthOption("signin")}
              className={
                authOption === "signin" ? "chosenAuthOption" : "signinBtn"
              }
            >
              Sign in
            </button>
            <button
              onClick={() => setAuthOption("signup")}
              className={
                authOption === "signup" ? "chosenAuthOption" : "signupBtn"
              }
            >
              Sign up
            </button>
          </div>

          <SignIn
            setShowRecover={setShowRecover}
            authOption={authOption}
            setShowSetName={setShowSetName}
          />

          <div className="continueContainer">
            <Link to="/app">
              <p className="continueAG">Continue as a guest</p>
            </Link>
          </div>
        </section>
      : <RecoverPassword setShowRecover={setShowRecover} />}
    </main>
  );
};

export default AuthPage;
