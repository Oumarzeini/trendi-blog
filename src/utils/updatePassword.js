import supabase from "../lib/supabase";

const updatePassword = async (email, oldPassword, newPassword, alert) => {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  });

  if (signInError) {
    console.log(signInError);
    if (signInError.message.includes("Invalid login credentials")) {
      alert("err", "Incorrect current Password", true);
      return;
    }
    alert("err", signInError.message, true);
    return;
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.log(updateError);
    alert("err", updateError.message, true);
  }

  alert("success", "Password reset successfully", true);
};

export default updatePassword;
