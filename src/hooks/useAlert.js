import { useCallback } from "react";
import { useStoreActions } from "easy-peasy";

const useAlert = () => {
  const setShowNotify = useStoreActions((actions) => actions.setShowNotify);
  const setNotifyMsg = useStoreActions((actions) => actions.setNotifyMsg);
  const setNotifyType = useStoreActions((actions) => actions.setNotifyType);

  const display = useCallback(
    (type, msg, visibility) => {
      setNotifyType(type);
      setNotifyMsg(msg);
      setShowNotify(visibility);

      setTimeout(() => {
        setShowNotify(false);
        setNotifyMsg("");
      }, 5000);
    },
    [setNotifyType, setNotifyMsg, setShowNotify],
  );

  return display;
};

export default useAlert;
