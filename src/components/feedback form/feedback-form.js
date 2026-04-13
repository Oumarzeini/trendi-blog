import { useState } from "react";
import styled from "styled-components";
import Feedback from "../../icons/feedback";
import Close from "../../icons/Close";
import { useStoreActions } from "easy-peasy";

const Wraper = styled.div`
  width: 600px;
  height: 600px;
  background-color: var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0 0 6px var(--border);

  @media (max-width: 768px ) {
    width: 500px;
    height: fit-content;
  }
    
  @media (max-width: 500px) {
    width: 350px;
    height: fit-content;
  }

  

  & .header-container {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;

        & .close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        & h2 {
        display: flex;
        justify-content: flex-start;
        algin-items: center;
        gap: 10px;
        }

            @media (max-width: 768px) {
                font-size: .9rem;

                & p {
                    font-size: .8rem;
                }
            }
  }

  & .type-container {
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;

    & .feedback-type {
      font-weight: 500;
      
    }

    @media (max-width: 768px) {
      font-size: .9rem;
    }

    & .selected-type {
        border: 1px solid gray;
        padding: 5px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 30%;
        cursor: pointer;

        @media (max-width: 768px) {
    width: 50%;
  }

        & span {
        transform: translateY(4px)
        }

        & svg {
            transition: transform .2s linear;
        }

        & svg.rotate {
        transform: rotate(180deg);
        }
    }

    & .dropdown {
        width: 30%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 2px gray;
        border-radius: 5px;
        margin-top: 5px;
        height: 0;
        overflow: hidden;
        transition: height .2s linear;
        position: absolute;
        top: 80px;
        left: 13px;
        background-color: white;
        
        gap: 5px;
        & p {
         cursor: pointer;
         padding: 5px;
        }

        & p:hover {
         color: var(--primary);
        }
    }

    & .dropdown.open {
    height: 100px;
    transition: height .2s linear
    }
    }
  }

  & .required {
    color: red;
    font-size: 1.2rem;
  }

  & .field-name {
    margin-left: 10px;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
      font-size: .9rem;
    }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

  & textarea {
    min-height: 100px;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: var(--bg);
    color: var(--text);
  }

  & textarea:focus {
    outline: 4px solid var(--border);
  }
`;

const InputWraper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  width: 100%;

  & .input-label-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 45%;

    & input {
      height: 40px;
      border-radius: 5px;
      padding: 5px;
      border: 1px solid gray;
      background-color: var(--bg);
      color: var(--text);
    }

    & input:focus {
      outline: 4px solid var(--border);
    }

    & label {
      font-size: 0.8rem;
      color: gray;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;

  & .cancel-btn {
    width: 150px;
    padding: 10px;
    background-color: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 8px;
    cursor: pointer;
  }

  & .submit-btn {
    width: 150px;
    padding: 10px;
    background-color: var(--primary);
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
`;

const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState("Comment");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const setFeedbackFormOpen = useStoreActions(
    (actions) => actions.setFeedbackFormOpen,
  );

  return (
    <Wraper>
      <div className="header-container">
        <h2>
          {" "}
          <span>
            {" "}
            <Feedback height={"20px"} width={"20px"} color={"black"} />{" "}
          </span>{" "}
          <span>Feedback</span>
        </h2>
        <p>
          We would love to hear your thoughts, suggestions, concerns or problems
          with anything so we can improve!
        </p>

        <span
          onClick={() => {
            setFeedbackFormOpen(false);
          }}
          className="close-icon"
        >
          <Close height={"20px"} width={"20px"} color={`var(--text)`} />
        </span>
      </div>

      <div className="type-container">
        <p className="feedback-type">Feedback Type</p>

        <div className="dropdown-container">
          <p
            className="selected-type"
            onClick={() => {
              setDropdownOpen((prev) => !prev);
            }}
          >
            {feedbackType}{" "}
            <span>
              <svg
                className={dropdownOpen ? "rotate" : ""}
                height="20px"
                width="20px"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 18L24 30L12 18"
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </p>
          <div className={dropdownOpen ? "dropdown open" : "dropdown"}>
            <p
              onClick={() => {
                setFeedbackType("Comment");
                setDropdownOpen((prev) => !prev);
              }}
            >
              Comment
            </p>
            <p
              onClick={() => {
                setFeedbackType("Suggestion");
                setDropdownOpen((prev) => !prev);
              }}
            >
              Suggestion
            </p>
            <p
              onClick={() => {
                setFeedbackType("Question");
                setDropdownOpen((prev) => !prev);
              }}
            >
              Question
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <MessageContainer className="message-container">
          <label htmlFor="feedback-field">
            Describe Your Feedback : <span className="required">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Start typing..."
            required
            name="feedback-field"
            id="feedback-field"
          ></textarea>
        </MessageContainer>

        <p className="field-name">
          Name : <span className="required">*</span>
        </p>
        <InputWraper className="input-wraper">
          <div className="input-label-container">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Your firstname"
              required
              type="text"
              id="first-name"
            />
            <label htmlFor="first-name">firstname</label>
          </div>

          <div className="input-label-container">
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Your lastname"
              required
              type="text"
              id="last-name"
            />
            <label htmlFor="last-name">lastname</label>
          </div>
        </InputWraper>

        <p className="field-name">
          Email : <span className="required">*</span>
        </p>
        <InputWraper className="input-wraper">
          <div className="input-label-container" style={{ width: "100%" }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
              placeholder="example@gmail.com"
              required
              type="text"
              id="email"
            />
            <label htmlFor="email"></label>
          </div>
        </InputWraper>

        <Line />

        <ButtonsContainer className="btns-container">
          <button
            type="reset"
            onClick={() => setFeedbackFormOpen(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button className="submit-btn">Submit</button>
        </ButtonsContainer>
      </form>
    </Wraper>
  );
};

export default FeedbackForm;
