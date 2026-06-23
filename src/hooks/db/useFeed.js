import { useState, useEffect, useRef, useCallback } from "react";
import supabase from "../../lib/supabase";
import useAlert from "../useAlert";

const PAGE_SIZE = 5;

const useFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const alert = useAlert();

  const pageRef = useRef(0);
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const fetchBlogs = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    try {
      const { data, error } = await supabase
        .from("blogs")
        .select(
          `
        *,
        profiles (username, email, full_name, avatar),
        likes (id),
        comments (id)
      `,
        )
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        alert("err", error.message, true);
      } else {
        setBlogs((prev) => {
          const existingIds = new Set(prev.map((post) => post.id));
          const newData = data.filter((post) => !existingIds.has(post.id));
          return [...prev, ...newData];
        });

        setPage((prev) => {
          const nextPage = prev + 1;
          pageRef.current = nextPage;
          return nextPage;
        });

        if (data.length < PAGE_SIZE) {
          setHasMore(false);
          hasMoreRef.current = false;
        }
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [alert]);

  useEffect(() => {
    fetchBlogs();

    const channel = supabase
      .channel("blogs-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "blogs" },
        (payload) => {
          setBlogs((prev) => [
            payload.new,
            ...prev.filter((post) => post.id !== payload.new.id),
          ]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    fetchBlogs,
    hasMore,
    page,
  };
};

export default useFeed;
