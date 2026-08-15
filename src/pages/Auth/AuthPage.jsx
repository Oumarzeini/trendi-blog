import "./AuthPage.css";
import SignIn from "../../components/auth/sign in/SignIn";
import logo from "../../images/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecoverPassword from "../../components/auth/recover-password";
import SetName from "../../components/auth/set-name";
import Notify from "../../components/ui/notify";
import { useStoreActions, useStoreState } from "easy-peasy";
import supabase from "../../lib/supabase";
import { useEffect } from "react";

const AuthPage = () => {
  const [authOption, setAuthOption] = useState("signin");
  const [showRecover, setShowRecover] = useState(false);
  const [showSetName, setShowSetName] = useState(false);
  const isGuest = useStoreState((a) => a.guest.isGuest);
  const setIsGuest = useStoreActions((a) => a.guest.setIsGuest);
  const [session, setSession] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    if(isGuest) {
      return;
    }

    const getSession = async () => {
      const {data : {session}, error} = await supabase.auth.getSession();
      if(error) {
        return;
      } else {
        navigate("/app");
      };
      
    }


    getSession();
  }, [session, isGuest]);

  useEffect(() => {
    if (isGuest) {
      const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) return;
      };
      logOut();
    }
  }, [isGuest]);

  return (
    <main className="authPageMain">
      <Notify />
      <section className="logoSection">
        <figure>
          <img loading="lazy" src={logo} alt="" />
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
              <p
                onClick={() => {
                  setIsGuest(true);
                }}
                className="continueAG"
              >
                Continue as a guest
              </p>
            </Link>
          </div>
        </section>
      : <RecoverPassword setShowRecover={setShowRecover} />}
    </main>
  );
};

export default AuthPage;
