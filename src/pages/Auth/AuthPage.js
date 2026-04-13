import "./AuthPage.css";
import SignIn from "../../components/auth/sign in/SignIn";
import appLogo from "../../images/appLogo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import RecoverPassword from "../../components/auth/recover-password";

const AuthPage = () => {
  const [authOption, setAuthOption] = useState("signin");
  const [showRecover, setShowRecover] = useState(false);

  return (
    <main className="authPageMain">
      <section className="logoSection">
        <figure>
          <img src={appLogo} alt="" />
        </figure>
        <p>Read, write and connect on the go.</p>
      </section>

      {!showRecover ?
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

          <SignIn setShowRecover={setShowRecover} authOption={authOption} />

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
