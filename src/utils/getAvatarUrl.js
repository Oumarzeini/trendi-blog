import supabase from "../lib/supabase";
import profilePlaceholder from "../images/profile-placeholder.png";

const getAvatarUrl = (path) => {
  if (!path) return profilePlaceholder;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return data.publicUrl;
};

export default getAvatarUrl;
