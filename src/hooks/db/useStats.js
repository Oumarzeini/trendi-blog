import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";

const useStats = (userId) => {
  const [stats, setStats] = useState({
    likes: 0,
    comments: 0,
    views: 0,
    reads: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const fetchStats = async () => {
      setLoading(true);

      try {
        const { data: blogs, error: blogError } = await supabase
          .from("blogs")
          .select("id")
          .eq("user_id", userId);

        if (blogError) {
          throw blogError;
        }

        const blogIds = blogs?.map((blog) => blog.id) || [];

        if (blogIds.length === 0) {
          if (isMounted) {
            setStats({ likes: 0, comments: 0, views: 0, reads: 0 });
          }
          return;
        }

        const [likesResult, commentsResult, viewsResult, readsResult] =
          await Promise.all([
            supabase
              .from("likes")
              .select("*", {
                count: "exact",
                head: true,
              })
              .in("blog_id", blogIds),

            supabase
              .from("comments")
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

            supabase
              .from("blog_reads")
              .select("*", {
                count: "exact",
                head: true,
              })
              .in("blog_id", blogIds),
          ]);

        if (isMounted) {
          setStats({
            likes: likesResult.count || 0,
            comments: commentsResult.count || 0,
            views: viewsResult.count || 0,
            reads: readsResult.count || 0,
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
  }, [userId]);

  return {
    ...stats,
    loading,
  };
};

export default useStats;
