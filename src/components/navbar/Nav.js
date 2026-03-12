import "./Nav.css";
import logo from "../../images/appLogo.png";

const Nav = () => {
  return (
    <ul>
      <li>
        {" "}
        <img src={logo} alt="App logo" /> <p>TrendyBlog</p>
      </li>
      <li>Home</li>
      <li>Explore</li>
      <li>About</li>
    </ul>
  );
};

export default Nav;
