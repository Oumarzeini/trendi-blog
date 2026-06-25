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
import Sun from "../../icons/sun";
// IMAGES
import logo from "../../images/logo.png";
import feedPreview from "../../images/feed-preview.png";
// HOOKS
import useWindowSize from "../../hooks/useWindowSize";
import useDarkMode from "../../hooks/useDarkMode";
// REACT & OTHER
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loader from "../../components/ui/loader";

const LandingPage = () => {
  const [menuIcon, setMenuIcon] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState({});
  const elementRefs = useRef({});

  const { width } = useWindowSize();

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(callback, options);

    const currentElements = Object.values(elementRefs.current);

    currentElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const darkMode = useStoreState((state) => state.theme.darkMode);
  const setDarkMode = useStoreActions((actions) => actions.theme.setDarkMode);

  useDarkMode(darkMode);

  const navigate = useNavigate();

  // const posts = [
  //   {
  //     id: 1,
  //     image:
  //       "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
  //     category: "Lifestyle",
  //     created_at: "2026-05-13 20:13:26.345032+00",
  //     title: "The Truth About Digital Nomadism in 2024",
  //     body: "It's not all beaches and laptops. We dive deep into the challenges of maintaining a career while traveling the globe.",

  //     profiles: {
  //       full_name: "Elena Rodriguez",
  //       avatar: logo,
  //       username: "E_rodri",
  //       likes: 1240,
  //       comments: 88,
  //     },
  //   },

  //   {
  //     id: 2,
  //     image: "https://images.pexels.com/photos/205316/pexels-photo-205316.png",
  //     category: "Tech",
  //     created_at: "2026-05-13 20:13:26.345032+00",
  //     title: "Will AI Replace the Human Touch in Creative Writing?",
  //     body: "Exploring the delicate balance between algorithmic efficiency and the messy, beautiful reality of human emotion.",

  //     profiles: {
  //       full_name: "James Wilson",
  //       avatar: logo,
  //       username: "james_23",
  //       likes: 3500,
  //       comments: 245,
  //     },
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.pexels.com/photos/5439453/pexels-photo-5439453.jpeg",
  //     category: "Business",
  //     created_at: "2026-05-13 20:13:26.345032+00",
  //     title: "Bootstrapping to $1M: My Three Year Journey",
  //     body: "Raw data, failed experiments, and the one strategy that actually worked when everything else was falling apart.",

  //     profiles: {
  //       full_name: "Marcus Thorne",
  //       avatar: logo,
  //       username: "MT_writes",
  //       likes: 4200,
  //       comments: 312,
  //     },
  //   },
  // ];

  const posts = [
    {
      id: 1,
      user_id: "8ce6e6f5-65db-4cf1-9d88-2fc436d11913",
      title: "When Silicon Learns to Sleep",
      body: 'For decades, computer scientists assumed that artificial intelligence only required continuous runtime to optimize its neural networks. However, a groundbreaking study from a leading research lab recently revealed an unexpected anomaly: advanced deep-learning models perform up to 30% better when subjected to artificial "sleep" cycles. When left idle with their inputs cut off, the algorithms began generating chaotic, self-assembling data structures that looked remarkably like human dreams. This wasn\'t useless noise; the AI was actively pruning redundant pathways and consolidating memories from its daytime training sessions. Without these periods of rest, the systems suffered from "hallucinatory degradation," essentially going data-mad from information overload. It turns out that efficiency isn\'t just about constant processing power; it\'s about the elegance of the pause. As we push closer to true artificial general intelligence, the line between biological biology and digital architecture continues to blur. Code, like the mind, apparently needs to rest to remember who it is.',
      category: "Technology & AI",
      image_url:
        "https://gjimpeijrkmzhmyrasjo.supabase.co/storage/v1/object/public/blog-images/blogs/8ce6e6f5-65db-4cf1-9d88-2fc436d11913/1779391935005-trendi-blog%20logo%20as%20png.png",
      created_at: "2026-05-19T20:01:51.299377+00:00",
      profiles: {
        avatar:
          "avatars/8ce6e6f5-65db-4cf1-9d88-2fc436d11913-1778676915140/avatar.png",
        username: "techy_writer!",
        full_name: "omar zeini",
      },
      likes: [],
      comments: [],
    },
    {
      id: 2,
      user_id: "8ce6e6f5-65db-4cf1-9d88-2fc436d11913",
      title: "The Forgotten Architecture of the Forest Floor",
      body: "Beneath the fallen leaves of the Pacific Northwest lies a massive, subterranean metropolis built entirely out of mycelium. While we often admire the mushrooms pushing through the soil, they are merely the skyscrapers of a vast, interconnected fungal network that spans for miles. This underground web acts as a biological internet, allowing trees to communicate, share nutrients, and even warn each other of impending pest attacks. If a birch tree is starving, the network diverts carbon from a nearby Douglas fir to keep it alive. It is a masterclass in collective survival, operating completely devoid of central leadership or conscious intent. When a tree dies, its energy is not lost but meticulously redistributed back into the forest ecosystem by these silent architects. Walking through the woods, you aren't just walking among separate trees; you are stepping on the roof of a single, massive living organism. We look to the stars for complex networks, yet the most intricate system on Earth is right beneath our boots.",
      category: "Nature & Science",
      image_url:
        "https://gjimpeijrkmzhmyrasjo.supabase.co/storage/v1/object/public/blog-images/blogs/8ce6e6f5-65db-4cf1-9d88-2fc436d11913/1779391935005-trendi-blog%20logo%20as%20png.png",
      created_at: "2026-05-19T20:01:51.299377+00:00",
      profiles: {
        avatar:
          "avatars/8ce6e6f5-65db-4cf1-9d88-2fc436d11913-1778676915140/avatar.png",
        username: "techy_writer!",
        full_name: "omar zeini",
      },
      likes: [],
      comments: [],
    },
    {
      id: 3,
      user_id: "8ce6e6f5-65db-4cf1-9d88-2fc436d11913",
      title: "The phantom Oasis of the Sahara",
      body: 'Deep within the Erg chebbi dunes of Morocco lies a legendary phenomenon known to local nomads the "Shifting Mirage" Unlike typical atmospheric illusions caused by rising heat, this specific oasis has been documented by cartographers for centuries, yet it never appears in the same coordinates twice. Travelers speak of a lush sanctuary filled with date palms and ice-cold freshwater springs that vanishes the moment you step within its perimeter. Modern satellite imagery has attempted to track the anomaly, only to capture sudden, inexplicable distortions in the sand topography. Some geologists theorize it is an underground aquifer venting steam through shifting faults, creating a temporary localized microclimate. Others believe it is a psychological echo shared by those dehydrated by the desert sun. Whatever the truth, the desert guards its secret fiercely. To find it is a matter of pure, terrifying luck; to lose it is the rule. The sands always reset, leaving nothing but footprints.  ',
      category: "Travel & Mystery",
      image_url:
        "https://gjimpeijrkmzhmyrasjo.supabase.co/storage/v1/object/public/blog-images/blogs/8ce6e6f5-65db-4cf1-9d88-2fc436d11913/1779391935005-trendi-blog%20logo%20as%20png.png",
      created_at: "2026-05-19T20:01:51.299377+00:00",
      profiles: {
        avatar:
          "avatars/8ce6e6f5-65db-4cf1-9d88-2fc436d11913-1778676915140/avatar.png",
        username: "techy_writer!",
        full_name: "omar zeini",
      },
      likes: [],
      comments: [],
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
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              >
                <Sun height={"20px"} width={"20px"} color={`var(--text)`} />
              </span>
            </div>
          </>
        : <>
            <div className="logoContainer">
              <img src={logo} alt="" />
              <p>Trendi-blog</p>
            </div>

            <div className="authBtnsContainer">
              <button onClick={() => navigate("/auth")} className="signInBtn">
                Sign in
              </button>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              >
                <Sun height={"20px"} width={"20px"} color={`var(--text)`} />
              </span>
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
              <TrendingUp
                height={"15px"}
                width={"20px"}
                color={`var(--text)`}
              />{" "}
              The #1 writing community
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
            <img src={feedPreview} alt="" />
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
            {!posts ?
              <Loader />
            : posts.map((post) => (
                <div
                  ref={(el) => (elementRefs.current[`post-${post.id}`] = el)}
                  data-id={`post-${post.id}`}
                  className={
                    visibleElements[`post-${post.id}`] ?
                      "fading-elements visible"
                    : "fading-elements"
                  }
                  key={post.id}
                >
                  {" "}
                  <Post variant="compact" post={post} />
                </div>
              ))
            }
          </div>
        </section>

        <section id="how-it-works" className="howItWorksSection">
          <h3 className="heading">How Trendi-blog Works</h3>
          <p className="subHeading">
            Get started in minutes and join the world's most vibrant writing
            community.
          </p>

          <div className="stepsContainer">
            <div
              ref={(el) => (elementRefs.current["step-1"] = el)}
              data-id="step-1"
              className={
                visibleElements["step-1"] ?
                  "fading-elements visible"
                : "fading-elements"
              }
            >
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
            </div>

            <div
              ref={(el) => (elementRefs.current["step-2"] = el)}
              data-id="step-2"
              className={
                visibleElements["step-2"] ?
                  "fading-elements visible"
                : "fading-elements"
              }
            >
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
            </div>

            <div
              ref={(el) => (elementRefs.current["step-3"] = el)}
              data-id="step-3"
              className={
                visibleElements["step-3"] ?
                  "fading-elements visible"
                : "fading-elements"
              }
            >
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
          </div>
        </section>

        <section id="what-people-say" className="opinionsSection">
          <h3>What the World is Saying</h3>

          <div className="opinionsContainer">
            <div
              ref={(el) => (elementRefs.current["opinion-1"] = el)}
              data-id="opinion-1"
              className={
                visibleElements["opinion-1"] ?
                  "opinionContainer fading-elements visible"
                : "opinionContainer fading-elements"
              }
            >
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

            <div
              ref={(el) => (elementRefs.current["opinion-2"] = el)}
              data-id="opinion-2"
              className={
                visibleElements["opinion-2"] ?
                  "opinionContainer fading-elements visible"
                : "opinionContainer fading-elements"
              }
            >
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
            <div
              ref={(el) => (elementRefs.current["opinion-3"] = el)}
              data-id="opinion-3"
              className={
                visibleElements["opinion-3"] ?
                  "opinionContainer fading-elements visible"
                : "opinionContainer fading-elements"
              }
            >
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
                <img src={logo} alt="" />
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
