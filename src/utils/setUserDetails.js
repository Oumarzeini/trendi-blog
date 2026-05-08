import supabase from "../lib/supabase";

const setUserDetails = async (details, user, alert) => {
  const { name, username, bio } = details;
  //   console.log(
  //     "user:",
  //     user,
  //     ".",
  //     name,
  //     username,
  //     bio,
  //     "from setUserDetails func",
  //   );

  const { err } = await supabase
    .from("profiles")
    .update({ full_name: name, username: username, bio: bio })
    .eq("id", user.id);

  if (err) {
    console.log(`Err setting details : ${err.message}`);
    alert("err", err.message, true);
    return;
  }

  alert("success", "Informations Updated successfully.", true);
};

export default setUserDetails;
