import { useState, useEffect, useCallback } from "react";
import supabase from "../../lib/supabase";

const useLikes = (blogId, user) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likesLoading, setLikesLoading] = useState(true);

  const fetchLikesData = useCallback(async () => {
    if (!blogId) return;

    try {
      setLikesLoading(true);

      const [{ count }, likedResult] = await Promise.all([
        supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("blog_id", blogId),

        user ?
          supabase
            .from("likes")
            .select("id")
            .eq("blog_id", blogId)
            .eq("user_id", user.id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      ]);

      setLikesCount(count || 0);
      setLiked(!!likedResult.data);
    } catch (err) {
      console.log("error fetching likes:", err);
    } finally {
      setLikesLoading(false);
    }
  }, [blogId, user]);

  const toggleLike = async () => {
    if (!user) return;

    try {
      if (liked) {
        setLiked(false);
        setLikesCount((prev) => prev - 1);

        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("blog_id", blogId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        setLiked(true);
        setLikesCount((prev) => prev + 1);

        const { error } = await supabase.from("likes").insert({
          blog_id: blogId,
          user_id: user.id,
        });

        if (error) throw error;
      }
    } catch (err) {
      console.log("errror toggling like :", err);

      // rollback
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  useEffect(() => {
    fetchLikesData();
  }, [fetchLikesData]);

  return {
    liked,
    likesCount,
    likesLoading,
    toggleLike,
    refreshLikes: fetchLikesData,
  };
};

export default useLikes;
