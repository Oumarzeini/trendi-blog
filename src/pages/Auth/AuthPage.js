import "./AuthPage.css";
import SignIn from "../../components/sign in/SignIn";
import appLogo from "../../images/appLogo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [authOption, setAuthOption] = useState("signin");

  return (
    <main className="authPageMain">
      <section className="logoSection">
        <figure>
          <img width={"200px"} height={"200px"} src={appLogo} alt="logo" />
        </figure>
        <p>Read, write and connect on the go.</p>
      </section>
      <div className="signingOptionsContainer">
        <button
          onClick={() => setAuthOption("signin")}
          className={authOption === "signin" ? "chosenAuthOption" : "signinBtn"}
        >
          Sign in
        </button>
        <button
          onClick={() => setAuthOption("signup")}
          className={authOption === "signup" ? "chosenAuthOption" : "signupBtn"}
        >
          Sign up
        </button>
      </div>

      <SignIn authOption={authOption} />

      <div className="continueContainer">
        <Link to="/home">
          <p className="continueAG">Continue as a guest</p>
        </Link>
      </div>
    </main>
  );
};

export default AuthPage;
