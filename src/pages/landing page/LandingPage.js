import "./LandingPage.css";
// COMPONENTS
import Nav from "../../components/navbar/Nav";
import Post from "../../components/post/Post";
// ICONS
import Menu from "../../icons/Menu";
import MenuClose from "../../icons/MenuClose";
import TrendingUp from "../../icons/TrendingUp";
import RightArrow from "../../icons/RightArrow";
import AccountAdd from "../../icons/AccountAdd";
import Pen from "../../icons/Pen";
import Community from "../../icons/Community";
import Flash from "../../icons/Flash";
import Facebook from "../../icons/Facebook";
import X from "../../icons/X";
import Instagram from "../../icons/Instagram";
import Linkedin from "../../icons/LinkedIn";
// IMAGES
import Logo from "../../images/appLogo.png";
import blogImage from "../../images/blogImage2.jpg";
import appLogo from "../../images/appLogo.png";
// REACT & EXTERNAL LIBRARIES
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// HOOKS
import useWindowSize from "../../hooks/useWindowSize";

const LandingPage = () => {
  const [menuIcon, setMenuIcon] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize();

  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
      category: "Lifestyle",
      date: "jan 25, 2026",
      title: "The Truth About Digital Nomadism in 2024",
      body: "It's not all beaches and laptops. We dive deep into the challenges of maintaining a career while traveling the globe.",
      author: "Elena Rodriguez",
      authorImage: appLogo,
      authorUsername: "E_rodri",
      likes: 1240,
      comments: 88,
    },

    {
      id: 2,
      image: "https://images.pexels.com/photos/205316/pexels-photo-205316.png",
      category: "Tech",
      date: "jan 25, 2026",
      title: "Will AI Replace the Human Touch in Creative Writing?",
      body: "Exploring the delicate balance between algorithmic efficiency and the messy, beautiful reality of human emotion.",
      author: "James Wilson",
      authorImage: appLogo,
      authorUsername: "james_23",
      likes: 3500,
      comments: 245,
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/5439453/pexels-photo-5439453.jpeg",
      category: "Business",
      date: "jan 25, 2026",
      title: "Bootstrapping to $1M: My Three Year Journey",
      body: "Raw data, failed experiments, and the one strategy that actually worked when everything else was falling apart.",
      author: "Marcus Thorne",
      authorImage: appLogo,
      authorUsername: "MT_writes",
      likes: 4200,
      comments: 312,
    },
  ];

  return (
    <>
      <header className="LPHeader">
        {width > 933 ?
          <>
            <Nav />
            <div className="authBtnsContainer">
              <button onClick={() => navigate("/auth")} className="signInBtn">
                Sign in
              </button>
              <button onClick={() => navigate("/auth")} className="signUpBtn">
                Sign up
              </button>
            </div>
          </>
        : <>
            <div className="logoContainer">
              <img src={Logo} alt="" />
              <p>Trendi-blog</p>
            </div>

            <div className="authBtnsContainer">
              <button onClick={() => navigate("/auth")} className="signInBtn">
                Sign in
              </button>
              <button onClick={() => navigate("/auth")} className="signUpBtn">
                Sign up
              </button>
            </div>

            {menuIcon ?
              <span
                onClick={() => {
                  setMenuIcon(!menuIcon);
                  setMenuOpen(true);
                }}
                className="menuIconSpan"
              >
                <Menu
                  height={"40px"}
                  width={"40px"}
                  color={"rgb(55,136,250)"}
                />
              </span>
            : <span
                onClick={() => {
                  setMenuIcon(!menuIcon);
                  setMenuOpen(false);
                }}
                className="menuIconSpan"
              >
                <MenuClose
                  height={"40px"}
                  width={"40px"}
                  color={"rgb(55,136,250)"}
                />
              </span>
            }

            <ul className={menuOpen ? "navMenu ShowNavMenu" : "navMenu"}>
              <li
                onClick={() => {
                  setMenuIcon(!menuIcon);
                  setMenuOpen(false);
                }}
              >
                <a href="#trending-stories">Trending Stories</a>
              </li>

              <li
                onClick={() => {
                  setMenuIcon(!menuIcon);
                  setMenuOpen(false);
                }}
              >
                <a href="#how-it-works">How It Works</a>
              </li>

              <li
                onClick={() => {
                  setMenuIcon(!menuIcon);
                  setMenuOpen(false);
                }}
              >
                <a href="#what-people-say">What People say</a>
              </li>

              <li
                onClick={() => {
                  setMenuIcon(!menuIcon);
                  setMenuOpen(false);
                }}
              >
                <a href="#news-letter">News Letter</a>
              </li>
            </ul>
          </>
        }
      </header>

      <main className="LPMain">
        <section className="heroSection">
          <div className="heroTextContainer">
            <p className="label">
              {" "}
              <TrendingUp height={"15px"} width={"20px"} color={"black"} /> The
              #1 writing community
            </p>
            <h2>
              Your Stories deserve a <span className="trendy">trendy</span>{" "}
              home.
            </h2>
            <p className="heroParagraph">
              Join Trendi-blog to share your ideas, connect with millions of
              readers, and turn your passion for writing into a beautiful
              digital reality.
            </p>

            {width > 768 && (
              <div className="CTABtnsContainer">
                <button
                  onClick={() => navigate("/auth")}
                  className="btn1 animate__zoomOutRight"
                >
                  Start Writing Free{" "}
                  <RightArrow
                    height={"20px"}
                    width={"20px"}
                    color="white"
                  />{" "}
                </button>
                {/* <button className="btn2">Explore Stories</button> */}
              </div>
            )}
          </div>

          <figure className="bloggingImageFigure">
            <img src={blogImage} alt="" />
          </figure>
        </section>

        {width < 768 && (
          <div className="CTABtnsContainer">
            <button
              onClick={() => navigate("/auth")}
              className="btn1 animate__zoomOutRight"
            >
              Start Writing Free{" "}
              <RightArrow height={"20px"} width={"20px"} color="white" />{" "}
            </button>
            {/* <button className="btn2">Explore Stories</button> */}
          </div>
        )}

        <section id="trending-stories" className="curatedStoriesSection">
          <h3>Editor's choice</h3>
          <p>
            carefully curated stories from our community that are trending now.
          </p>

          <div className="storiesContainer">
            {posts.map((post) => (
              <Post variant="compact" post={post} key={post.id} />
            ))}
          </div>
        </section>

        <section id="how-it-works" className="howItWorksSection">
          <h3 className="heading">How Trendi-blog Works</h3>
          <p className="subHeading">
            Get started in minutes and join the world's most vibrant writing
            community.
          </p>

          <div className="stepsContainer">
            <div className="step">
              <span className="iconContainer">
                <span className="stepCount">1</span>
                <AccountAdd
                  height={"30px"}
                  width={"30px"}
                  color={"rgb(55, 136, 250)"}
                />
              </span>
              <p className="stepName">Create Account</p>
              <p className="stepDescription">
                Sign up in seconds and customize your profile to reflect your
                unique writing style and personality.
              </p>
            </div>

            <div className="step">
              <span className="iconContainer">
                <span className="stepCount">2</span>
                <Pen
                  height={"30px"}
                  width={"30px"}
                  color={"rgb(55, 136, 250)"}
                />
              </span>
              <p className="stepName">Write & Publish</p>
              <p className="stepDescription">
                Our clean editor lets you focus on your words. Add images,
                formatting, and tags with effortless ease.
              </p>
            </div>

            <div className="step">
              <span className="iconContainer">
                <span className="stepCount">3</span>
                <Community
                  height={"30px"}
                  width={"30px"}
                  color={"rgb(55, 136, 250)"}
                />
              </span>
              <p className="stepName">Grow Community</p>
              <p className="stepDescription">
                Interact with readers through likes and comments, and see your
                influence grow across the platform.
              </p>
            </div>
          </div>
        </section>

        <section id="what-people-say" className="opinionsSection">
          <h3>What the World is Saying</h3>

          <div className="opinionsContainer">
            <div className="opinionContainer">
              <div className="flashIconsContainer">
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
              </div>
              <p className="opinionText">
                "The interface is so clean it actually makes me want to write
                more. Best blogging platform by far."
              </p>
              <div className="opinionProfileContainer">
                <figure>
                  <img
                    src="https://images.pexels.com/photos/7970671/pexels-photo-7970671.jpeg"
                    alt=""
                  />
                </figure>
                <div className="nameJobContainer">
                  <p className="opinionName">Liam Neeson</p>
                  <p className="opinionJob">Content Strategist</p>
                </div>
              </div>
            </div>

            <div className="opinionContainer">
              <div className="flashIconsContainer">
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
              </div>
              <p className="opinionText">
                "I found my audience within weeks. The community is supportive,
                engaged, and genuinely curious."
              </p>
              <div className="opinionProfileContainer">
                <figure>
                  <img
                    src="https://images.pexels.com/photos/7610766/pexels-photo-7610766.jpeg"
                    alt=""
                  />
                </figure>
                <div className="nameJobContainer">
                  <p className="opinionName">Isabella Rossi</p>
                  <p className="opinionJob">Travel Journalist</p>
                </div>
              </div>
            </div>
            <div className="opinionContainer">
              <div className="flashIconsContainer">
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
                <Flash height={"20px"} width={"20px"} color={"gold"} />
              </div>
              <p className="opinionText">
                "Finally, a platform that respects the craft of writing without
                overwhelming it with ads and clutter."
              </p>
              <div className="opinionProfileContainer">
                <figure>
                  <img
                    src="https://images.pexels.com/photos/3931342/pexels-photo-3931342.jpeg"
                    alt=""
                  />
                </figure>
                <div className="nameJobContainer">
                  <p className="opinionName">Thomas Wright</p>
                  <p className="opinionJob">Philosopher & Poet</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="news-letter" className="newsletterSection">
          <div className="container">
            <span className="emailIconSpan"></span>
            <h3>The Weekly Trendy Digest</h3>
            <p>
              Get the bets stories , wrinting tips , and community highlights
              delivered straight to your inbox every sunday morning. no spam,
              ever.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button className="subscribeBtn">Subscribe</button>
            </form>
            <p className="privacyP">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service
            </p>
          </div>
        </section>

        <section className="bottomSection">
          <div className="firstContainer">
            <div className="container">
              <h3
                style={{
                  color: "rgb(55, 136, 250)",
                  fontSize: "1rem",
                }}
                className="heading"
              >
                <img src={appLogo} alt="" />
                Trendi-blog
              </h3>
              <p className="subHeading">
                The modern home for writers, thinkers, and storytellers. Join a
                community of over 20,000 creators sharing their journey with the
                world.
              </p>
              <div className="socialsContainer">
                <span className="socialContainer">
                  {" "}
                  <Facebook
                    width={"14px"}
                    height={"14px"}
                    color={"rgb(55, 136, 250)"}
                  />{" "}
                </span>
                <span className="socialContainer">
                  {" "}
                  <X
                    width={"10px"}
                    height={"10px"}
                    color={"rgb(55, 136, 250)"}
                  />{" "}
                </span>
                <span className="socialContainer">
                  {" "}
                  <Instagram
                    width={"15px"}
                    height={"15px"}
                    color={"rgb(55, 136, 250)"}
                  />{" "}
                </span>
                <span className="socialContainer">
                  {" "}
                  <Linkedin
                    width={"10px"}
                    height={"10px"}
                    color={"rgb(55, 136, 250)"}
                  />{" "}
                </span>
              </div>
            </div>

            <div className="container">
              <h3 className="heading">Platform</h3>
              <ul>
                <li>How it Works</li>
                <li>Pricing Plans</li>
                <li>Author Tools</li>
                <li>Member Benefits</li>
                <li>API & Integration</li>
              </ul>
            </div>
          </div>

          <div className="secondContainer">
            <div className="container">
              <h3 className="heading">Resources</h3>
              <ul>
                <li>Community Forum</li>
                <li>Writing Guide</li>
                <li>Help Center</li>
                <li>Creator Academy</li>
                <li>Blog</li>
              </ul>
            </div>

            <div className="container">
              <h3 className="heading">Company</h3>
              <ul>
                <li>About Us</li>
                <li>Carees</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="rightContainer">
              <p>
                © 2026 Trendi-blog Inc. All rights reserved. Built with love by
                creators for creators.
              </p>
            </div>
            <div className="leftContainer">
              <p>Sitemap</p>
              <p>Cookie Settings</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
