import supabase from "../lib/supabase";

const deleteAvatar = async (userId, alert) => {
  if (!userId) return;

  const { data, error: dbErr } = await supabase
    .from("profiles")
    .select("avatar")
    .eq("id", userId);

  if (dbErr) {
    console.log(`err getting avatar: ${dbErr.message}`);
    alert("err", dbErr.message, true);
    return;
  }
  const currentPath = data[0].avatar;

  if (!currentPath) {
    console.log(`NO avatar found!`);
    alert("err", "NO avatar found!", true);
    return;
  }

  const { error: storageErr } = await supabase.storage
    .from("avatars")
    .remove([currentPath]);

  if (storageErr) {
    console.log(`err removing path from bucket: ${storageErr.message}`);
    alert("err", storageErr.message, true);
    return;
  }

  const { error: userErr } = await supabase
    .from("profiles")
    .update({ avatar: null })
    .eq("id", userId);

  if (userErr) {
    console.log(`error deleting avatar: ${userErr.message}`);
    alert("err", userErr.message, true);
    return;
  }

  alert("success", " avatar deleted succussfully", true);
};

export default deleteAvatar;
