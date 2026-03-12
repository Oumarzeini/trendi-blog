import "./SignIn.css";
import supabase from "../../supabase";
import { Activity, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mail from "../../icons/Mail";
import Lock from "../../icons/Lock";
import RightArrow from "../../icons/RightArrow";

const SignIn = ({ authOption }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [userEmail, userPassword]);

  const handleSignUp = async (email, password) => {
    try {
      if (email === "" || password === "") {
        setError("Please fill Email and Password fields");
        return;
      }

      setLoading(true);

      const { data: existingEmail, error: checkError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (existingEmail) {
        setError("An account with this email already exists please sign in.");
        return;
      }

      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log(`Error signing up: ${error.message}`);
        setError(error.message);
        setSuccess("");
        return;
      } else {
        setSuccess("Please check your email for a verification link");
        console.log(email, password, user);
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      if (email === "" || password === "") {
        setError("Please fill Email and Password fields");
        return;
      }

      setLoading(true);

      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log(`Error signing in: ${error.message}`);
        setError(error.message);
        setSuccess("");
        return;
      } else {
        setSuccess("successsfully signed in");
        console.log(email, password, user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={styles.signingForm}
      className="signingForm"
    >
      <div style={styles.labelinputcontainer} className="labelinputcontainer">
        <label htmlFor="email">Email Address</label>
        <div style={styles.inputContainer} className="inputContainer">
          <Mail height={"30px"} width={"30px"} color={"black"} />
          <input
            id="email"
            type="email"
            placeholder="hello@examplecom"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div style={styles.labelinputcontainer} className="labelinputcontainer">
        <label htmlFor="password">Password</label>
        <div style={styles.inputContainer} className="inputContainer">
          <Lock height={"30px"} width={"30px"} color={"black"} />
          <input
            type="password"
            id="password"
            placeholder="**********"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <p style={styles.forgotPasswordP} className="forgotPasswordP">
        Forgot Password ?
      </p>

      <button
        style={loading ? styles.submitBtnLoading : styles.submitBtn}
        className="submitBtn"
        onClick={() => {
          authOption === "signin" ?
            handleSignIn(userEmail, userPassword)
          : handleSignUp(userEmail, userPassword);
        }}
      >
        {loading && authOption === "signin" ?
          "Signing in..."
        : !loading && authOption === "signin" ?
          "sign in"
        : loading && authOption === "signup" ?
          "singing up..."
        : "sign up"}

        {!loading && (
          <RightArrow height={"20px"} width={"20px"} color={"blue"} />
        )}
      </button>
      <Activity mode={error ? "visible" : "hidden"}>
        <p className="errMsg" style={styles.errMsg}>
          {error}
        </p>
      </Activity>

      <Activity mode={success ? "visible" : "hidden"}>
        <p className="successMsg" style={styles.successMsg}>
          {success}
        </p>
      </Activity>
    </form>
  );
};

export default SignIn;

const styles = {
  signingForm: {
    display: "flex",
    flexDirection: "column",
    gap: " 20px",
    padding: 10,
    width: "100%",
    margin: "0 auto",
  },

  labelinputcontainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  label: {
    fontWeight: 600,
  },

  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBlock: 5,
    paddingInline: 10,
    backgroundColor: "rgb(237, 237, 237)",
    borderRadius: 10,
  },

  input: {
    width: "100%",
    height: 40,
    border: "none",
    color: "black",
    fontSize: "1rem",
    backgroundColor: "transparent",
    outline: "none",
  },

  forgotPasswordP: {
    color: "#5651ff",
    fontWeight: 500,
    cursor: "pointer",
  },

  submitBtn: {
    marginTop: "1rem",
    height: 50,
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: 1,
    borderRadius: 15,
    border: "1px solid rgb(55, 136, 250)",
    backgroundColor: "transparent",
    color: "rgb(55, 136, 250)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
  },

  submitBtnLoading: {
    marginTop: "3rem",
    height: 50,
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: 1,
    borderRadius: 15,
    border: "1px solid blue",
    backgroundColor: "transparent",
    color: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: "not-allowed",
    opacity: 0.5,
  },

  errMsg: {
    color: "red",
    textAlign: "center",
  },

  successMsg: {
    color: "green",
    textAlign: "center",
    fontWeight: 600,
  },
};
