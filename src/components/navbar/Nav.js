import "./Nav.css";
import logo from "../../images/appLogo.png";

const Nav = () => {
  return (
    <nav>
      <div>
        <img src={logo} alt="App logo" />{" "}
        <p style={{ whiteSpace: "nowrap" }}>Trendi-blog</p>
      </div>
      <ul>
        <li>
          <a href="#trending-stories">Trending Stories</a>
        </li>

        <li>
          <a href="#how-it-works">How It Works</a>
        </li>

        <li>
          <a href="#what-people-say">What People say</a>
        </li>

        <li>
          <a href="#news-letter">News Letter</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
