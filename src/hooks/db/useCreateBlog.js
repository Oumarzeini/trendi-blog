import supabase from "../../lib/supabase";
import useAlert from "../useAlert";

const useCreateBlog = (user) => {
  const alert = useAlert();

  const uploadImage = async (file) => {
    if (!file) return null;

    const filePath = `blogs/${user.id}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (error) {
      alert("err", error.message, true);
      console.log(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const createBlog = async ({ title, body, category, file }) => {
    try {
      let image_url = null;

      if (file) {
        image_url = await uploadImage(file);
      }

      const { data, error } = await supabase
        .from("blogs")
        .insert([
          {
            title,
            body,
            category,
            image_url,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        alert("err", error.message, true);
        console.log(error.message);
        return;
      }
      console.log(data[0]);
      alert("success", "Post Published successfully", true);
      return data[0];
    } catch (err) {
      alert("err", err.message, true);
      console.error(err.message);
      return null;
    }
  };

  return { createBlog };
};

export default useCreateBlog;
