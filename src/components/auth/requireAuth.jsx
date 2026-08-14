import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const RequireAuth = () => {
  const isGuest = useStoreState((s) => s.guest.isGuest);
  const setShowSignInModel = useStoreActions((a) => a.setShowSignInModel);
  const setOverlayOn = useStoreActions((a) => a.setOverlayOn);

  useEffect(() => {
    if (isGuest) {
      setShowSignInModel(true);
      setOverlayOn(true);
    }
  }, [isGuest, setShowSignInModel, setOverlayOn]);

  if (isGuest) return null;
  return <Outlet />;
};

export default RequireAuth;
