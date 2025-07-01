import { useEffect } from "react";

export const MessengerChat = () => {
  useEffect(() => {
    if (document.getElementById("fb-customer-chat")) return;

    const div = document.createElement("div");
    div.id = "fb-customer-chat";
    div.className = "fb-customerchat";
    div.setAttribute("page_id", "150920721786315"); // Your Page ID
    div.setAttribute("attribution", "setup_tool");
    document.body.appendChild(div);

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};
