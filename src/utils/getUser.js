import supabase from "../lib/supabase";

const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.log(error.message);
    return;
  }

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (profileErr) {
    console.log("error getting profile", profileErr.message);
    return;
  }

  return profile[0];
};

export default getUser;
