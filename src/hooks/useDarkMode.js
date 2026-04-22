import { useEffect } from "react";

const useDarkMode = (state) => {
  useEffect(() => {
    document.body.classList.toggle("dark", state);
  }, [state]);
};

export default useDarkMode;
