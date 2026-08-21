import supabase from "../lib/supabase";

const setUserDetails = async (details, user, alert) => {
  const { name, username, bio } = details;

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: name, username: username, bio: bio })
    .eq("id", user.id);

  if (error) {
    if (
      error.message.includes(
        `duplicate key value violates unique constraint "profiles_username_key"`,
      )
    ) {
      console.log(`Err setting details : unavailabel username`);
      alert(
        "err",
        "Unavailable Username : this username is taken, try another one ",
        true,
      );
      return;
    }
    console.log(`Err setting details : ${error.message || error}`);
    alert("err", error.message || error, true);
    return;
  }

  alert("success", "Informations Updated successfully.", true);
};

export default setUserDetails;
