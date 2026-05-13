import { useStoreActions } from "easy-peasy";
import supabase from "../../lib/supabase";

const useUploadAvatar = () => {
  const setShowNotify = useStoreActions((actions) => actions.setShowNotify);
  const setNotifyMsg = useStoreActions((actions) => actions.setNotifyMsg);
  const setNotifyType = useStoreActions((actions) => actions.setNotifyType);

  const uploadAvatar = async (file, user) => {
    if (!file || !user) return null;

    // Validate
    if (!file.type.startsWith("image/")) {
      setShowNotify(true);
      setNotifyMsg("Only images allowed");
      setNotifyType("error");

      setTimeout(() => {
        setShowNotify(false);
        setNotifyMsg("");
        setNotifyType("");
      }, 5000);

      return null;
    }

    if (file.size > 2 * 1024 * 1024) {
      setShowNotify(true);
      setNotifyMsg("Max File Size Is 2MB");
      setNotifyType("error");

      setTimeout(() => {
        setShowNotify(false);
        setNotifyMsg("");
        setNotifyType("");
      }, 5000);
      return null;
    }

    const { data: profile, error: avatarErr } = await supabase
      .from("profiles")
      .select("avatar")
      .eq("id", user.id)
      .single();

    if (avatarErr) console.log(`avatar err: ${avatarErr.message}`);

    const oldPath = profile?.avatar;

    const filePath = `avatars/${user.id}-${Date.now()}/avatar.png`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .update(filePath, file);

    if (uploadError) {
      setShowNotify(true);
      setNotifyMsg(uploadError.message);
      setNotifyType("error");

      setTimeout(() => {
        setShowNotify(false);
        setNotifyMsg("");
        setNotifyType("");
      }, 5000);
      console.error(uploadError);
      return null;
    }

    try {
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath]);
      }
    } catch (err) {
      console.log(`Error deleting old path ${err}`);
    }

    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar: filePath })
      .eq("id", user.id);

    if (dbError) {
      setShowNotify(true);
      setNotifyMsg(dbError.message);
      setNotifyType("error");

      setTimeout(() => {
        setShowNotify(false);
        setNotifyMsg("");
        setNotifyType("");
      }, 5000);
      console.error(dbError.message);
      return null;
    }

    setShowNotify(true);
    setNotifyMsg("Profile Picture Updated.");
    setNotifyType("success");

    setTimeout(() => {
      setShowNotify(false);
      setNotifyMsg("");
      setNotifyType("");
    }, 5000);

    return filePath;
  };

  return uploadAvatar;
};

export default useUploadAvatar;
