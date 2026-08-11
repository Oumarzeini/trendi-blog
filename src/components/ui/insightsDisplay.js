import styled from "styled-components";
import Eye from "../../icons/Eye";
import Like from "../../icons/Like";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../lib/supabase";
import useWindowSize from "../../hooks/useWindowSize";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 10px;
  gap: 20px;
  margin-bottom: 2rem;
`;

const InsightEl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-inline: 15px;
  box-shadow: 0 0 2px gray;
  border-radius: 8px;
  gap: 10px;

  @media (max-width: 768px) {
    padding-inline: 10px;
    & p {
      font-size: 0.8rem;

      white-space: nowrap;
    }
  }
`;

const InsightsDisplay = () => {
  const [user, setUser] = useState(null);
  const [insights, setInsights] = useState({ likes: 0, views: 0 });
  const [loading, setLoading] = useState(false);

  const { width } = useWindowSize();

  const { username: routeUsername } = useParams();

  useEffect(() => {
    const assignUser = async () => {
      if (!routeUsername) {
        setUser(null);
        return;
      }

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", routeUsername)
          .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        setUser(profileData);
      } catch (err) {
        console.log("couldn't get user :", err.message || err);
      }
    };

    assignUser();
  }, [routeUsername]);

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const fetchStats = async () => {
      setLoading(true);

      try {
        const { data: blogs, error: blogError } = await supabase
          .from("blogs")
          .select("id")
          .eq("user_id", user?.id);

        if (blogError) {
          throw blogError;
        }

        const blogIds = blogs?.map((blog) => blog.id) || [];

        if (blogIds.length === 0) {
          if (isMounted) {
            setInsights({ likes: 0, views: 0 });
          }
          return;
        }

        const [likesResult, viewsResult] = await Promise.all([
          supabase
            .from("likes")
            .select("*", {
              count: "exact",
              head: true,
            })
            .in("blog_id", blogIds),

          supabase
            .from("blog_views")
            .select("*", {
              count: "exact",
              head: true,
            })
            .in("blog_id", blogIds),
        ]);

        if (isMounted) {
          setInsights({
            likes: likesResult.count || 0,

            views: viewsResult.count || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return (
    <Container>
      <InsightEl>
        <Eye
          width={width <= 500 ? "20px" : "30px"}
          height={width <= 500 ? "20px" : "30px"}
          color={"gray"}
        />
        <p> {loading ? "loading..." : `${insights.views} Posts Views`}</p>
      </InsightEl>
      <InsightEl>
        <Like
          width={width <= 500 ? "20px" : "30px"}
          height={width <= 500 ? "20px" : "30px"}
          color={"gray"}
        />
        <p>{loading ? "loading..." : `${insights.likes} Posts Likes`}</p>
      </InsightEl>
    </Container>
  );
};

export default InsightsDisplay;
