import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
`;

function Missing() {
  const [isApp, setIsApp] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("app")) {
      setIsApp(true);
    } else {
      setIsApp(false);
    }
  }, [location]);

  return (
    <StyledSection>
      <p style={{ margin: "auto", marginTop: "3rem", fontSize: "2rem" }}>
        Ops! Page not found !{" "}
        {!isApp && (
          <Link to={"/"}>
            {" "}
            <span style={{ color: `var(--primary)`, fontWeight: "500" }}>
              Go Home
            </span>
          </Link>
        )}
      </p>
    </StyledSection>
  );
}

export default Missing;
