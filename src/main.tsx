/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from "react-dom/client";
import WebApp from "@twa-dev/sdk";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import App from "./App";
import "./index.css";

// Initialize mini app
// https://core.telegram.org/bots/webapps
// ready() needs to be called as early as possible
WebApp.ready();
// expand() is needed to display the mini app fullscreen
// https://docs.telegram-mini-apps.com/platform/functionality/viewport
WebApp.expand();
WebApp.enableClosingConfirmation();

(window as any).showingTosPopup = false;
// userAgreedTos should be stored in localstorage
(window as any).userAgreedTos = false;

// Show popup
const showToSPopup = () => {
  (window as any).showingTosPopup = true;
  WebApp.showPopup(
    {
      title: "Join Suzume Alpha Test!",
      message:
        "Period: 5/15~6/1/2024\n\nIn case severe bugs happen, we may modify the user data\n\nBy continuing, you agree with the rules and Terms of Use shown below.",
      buttons: [
        { id: "ok", type: "ok" },
        { id: "tos", type: "default", text: "Terms of Use" },
        { id: "close", type: "default", text: "Exit App" },
      ],
    },
    (button_id) => {
      switch (button_id) {
        case "ok":
          // This is placeholder
          (window as any).userAgreedTos = true;
          WebApp.showPopup({
            title: "User agreed",
            message: "Now remove the splash screen and start game",
          });
          break;
        case "close":
          WebApp.close();
          break;
        case "tos":
          window.open("https://suzume.gitbook.io/terms");
          (window as any).showingTosPopup = false;
          break;
        default:
          // This happens when tapping outside the popup;
          showToSPopup();
      }
    }
  );
};

!(window as any).userAgreedTos &&
  setInterval(() => {
    if (!(window as any).showingTosPopup) showToSPopup();
  }, 1000);

// this manifest is used temporarily for development purposes
// Needed for TON Connect: https://docs.ton.org/develop/dapps/ton-connect/manifest
const manifestUrl =
  "https://reiji777.github.io/my-twa/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
