import styled from "styled-components";
import Post from "../../../components/post/Post";
import { Link } from "react-router-dom";
import appLogo from "../../../images/appLogo.png";

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
    image: "https://images.pexels.com/photos/5439453/pexels-photo-5439453.jpeg",
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

const StyledMain = styled.main`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  gap: 15px;

  .latestUpdates {
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text);
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 30px;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

const Feed = () => {
  return (
    <StyledMain>
      <h2 className="latestUpdates">Latest Updates</h2>
      <PostsContainer>
        {posts.map((post) => (
          <Link to={`/app/post/${post.id}`} key={post.id}>
            <Post post={post} key={post.id} />
          </Link>
        ))}
      </PostsContainer>
    </StyledMain>
  );
};

export default Feed;
