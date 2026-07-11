import supabase from "../../lib/supabase";
import useAlert from "../useAlert";

const useBlogActions = () => {
  const Alert = useAlert();

  const updateBlog = async (id, updates) => {
    const { error } = await supabase.from("blogs").update(updates).eq("id", id);

    if (error) {
      console.log("error updating post :", error.message);
      Alert("err", `error updating post : ${error.message}`, true);
    }
  };

  const deleteBlog = async (id) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      console.log("error updating post :", error.message);
      Alert("err", `error updating post : ${error.message}`, true);
    }
  };

  return { updateBlog, deleteBlog };
};

export default useBlogActions;
