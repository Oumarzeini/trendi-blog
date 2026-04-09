import "./SignIn.css";
import supabase from "../../supabase";
import { Activity, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mail from "../../icons/Mail";
import Lock from "../../icons/Lock";
import Eye from "../../icons/Eye";
import NoEye from "../../icons/no-eye";

const SignIn = ({ authOption }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pwVisible, setPwVisible] = useState(false);

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

      const { data: existingEmail } = await supabase
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

      const { error } = await supabase.auth.signInWithPassword({
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
        navigate("/app");
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="signingForm">
      <div className="labelinputcontainer">
        <label htmlFor="email">Email Address</label>
        <div className="inputContainer">
          <Mail height={"20px"} width={"20px"} color={"gray"} />
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

      <div className="labelinputcontainer">
        <label htmlFor="emailPassword">Password</label>
        <div className="inputContainer">
          <Lock height={"20px"} width={"20px"} color={"gray"} />
          <input
            type={pwVisible ? "text" : "password"}
            id="emailPassword"
            placeholder="**********"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          {pwVisible ?
            <span
              className="eye-span"
              onClick={() => {
                setPwVisible((prev) => !prev);
              }}
            >
              {" "}
              <Eye width={"20px"} height={"20px"} color={"gray"} />
            </span>
          : <span
              className="eye-span"
              onClick={() => {
                setPwVisible((prev) => !prev);
              }}
            >
              {" "}
              <NoEye width={"20px"} height={"20px"} color={"gray"} />{" "}
            </span>
          }
        </div>
      </div>

      <p className="forgotPasswordP">Forgot Password ?</p>

      <button
        className={loading ? "submitBtnLoading" : "submitBtn"}
        onClick={() => {
          authOption === "signin" ?
            handleSignIn(userEmail, userPassword)
          : handleSignUp(userEmail, userPassword);
        }}
      >
        <span>
          {loading && authOption === "signin" ?
            "Signing in..."
          : !loading && authOption === "signin" ?
            "sign in"
          : loading && authOption === "signup" ?
            "singing up..."
          : "sign up"}
        </span>

        {!loading && (
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 72 72"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M49.212 51.534L67 35.036L49.212 18.538l-3.789 4.076l10.396 9.641H5v5.562h50.819l-10.396 9.642z"
              fill="white"
            />
            <path
              d="M49.212 51.534L67 35.036L49.212 18.538l-3.789 4.076l10.396 9.641H5v5.562h50.819l-10.396 9.642z"
              fill="none"
              stroke="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>
      <Activity mode={error ? "visible" : "hidden"}>
        <p className="errMsg">{error}</p>
      </Activity>

      <Activity mode={success ? "visible" : "hidden"}>
        <p className="successMsg">{success}</p>
      </Activity>
    </form>
  );
};

export default SignIn;

// const styles = {
//   signingForm: {
//     display: "flex",
//     flexDirection: "column",
//     gap: " 20px",
//     padding: 10,
//     width: "100%",
//     margin: "0 auto",
//   },

//   labelinputcontainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//   },

//   label: {
//     fontWeight: 600,
//   },

//   inputContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//     paddingBlock: 5,
//     paddingInline: 10,
//     border: " 1px solid gray",
//     backgroundColor: "white",
//     borderRadius: 10,
//   },

//   input: {
//     width: "100%",
//     height: 40,
//     border: "none",
//     color: "black",
//     fontSize: "1rem",
//     backgroundColor: "transparent",
//     outline: "none",
//   },

//   forgotPasswordP: {
//     color: "#5651ff",
//     fontWeight: 500,
//     cursor: "pointer",
//   },

//   submitBtn: {
//     marginTop: "1rem",
//     height: 50,
//     fontSize: "1rem",
//     fontWeight: 600,
//     letterSpacing: 1,
//     borderRadius: 15,
//     border: "1px solid rgb(55, 136, 250)",
//     backgroundColor: "transparent",
//     color: "rgb(55, 136, 250)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//     cursor: "pointer",
//   },

//   submitBtnLoading: {
//     marginTop: "3rem",
//     height: 50,
//     fontSize: "1rem",
//     fontWeight: 600,
//     letterSpacing: 1,
//     borderRadius: 15,
//     border: "1px solid blue",
//     backgroundColor: "transparent",
//     color: "blue",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//     cursor: "not-allowed",
//     opacity: 0.5,
//   },

//   errMsg: {
//     color: "red",
//     textAlign: "center",
//   },

//   successMsg: {
//     color: "green",
//     textAlign: "center",
//     fontWeight: 600,
//   },
// };
