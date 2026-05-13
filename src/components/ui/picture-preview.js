import styled from "styled-components";
import Close from "../../icons/Close";
import { useStoreActions } from "easy-peasy";

const Wraper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  & .iconSpan {
    position: absolute;
    top: -30px;
    right: 10px;
    cursor: pointer;
  }
`;
const Frame = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 10px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

// const Actions = styled.div`
//   width: 100%;
//   height: 60px;
//   padding: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
// `;

// const Button = styled.button`
//   background-color: ${({ $primary }) =>
//     $primary ? "var(--primary)" : "transparent"};
//   color: ${({ $primary }) => ($primary ? "white" : "var(--text)")};
//   padding: 10px;
//   border-radius: 10px;
//   width: 50%;
//   border: ${({ $primary }) => ($primary ? "none" : "1px solid var(--text)")};
//   cursor: pointer;
//   font-size: 1rem;
// `;

const PicturePreview = ({ src = "", onCancel, onAdd }) => {
  const setShowPicturePreview = useStoreActions(
    (actions) => actions.setShowPicturePreview,
  );
  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);

  return (
    <Wraper>
      <span
        onClick={() => {
          setShowPicturePreview(false);
          setOverlayOn(false);
        }}
        className="iconSpan"
      >
        {" "}
        <Close height={"20px"} width={"20px"} color={`var(--text)`} />{" "}
      </span>
      <Frame>
        <img src={src} alt="" />
      </Frame>

      {/* <Actions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onAdd} $primary>
          Add
        </Button>
      </Actions> */}
    </Wraper>
  );
};

export default PicturePreview;
