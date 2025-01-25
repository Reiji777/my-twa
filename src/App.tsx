import { useState, useEffect } from "react";
import "./App.css";
// import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "./hooks/useCounterContract";

const shareURI = "https://t.me/share/url?url=";
const appURI = "t.me/PlayLuckyBot/demo";
const botURI = "https://t.me/PlayLuckyBot";
const vaultURI = "https://t.me/ton2048gamebot/vault";
const imageAssetURL = "https://i.imgur.com/9mOyJa2.jpeg";
const shareMessageId = "TqWnqGCrJVqIGpzV";

function App() {
  const { value, address } = useCounterContract();
  // https://core.telegram.org/bots/webapps#webappinitdata
  const initData = WebApp?.initDataUnsafe;
  const tgId = initData?.user?.id;
  const tgUserName = initData?.user?.username;
  const invitedBy = initData?.start_param;
  const [homeScreenStatus, setHomeScreenStatus] = useState("");

  useEffect(() => {
    WebApp.checkHomeScreenStatus((status) => setHomeScreenStatus(status));
    WebApp.onEvent("homeScreenAdded", () => setHomeScreenStatus("added"));
    WebApp.onEvent("shareMessageSent", () => WebApp.showAlert(`Message sent: ${shareMessageId}`));
  }, []);

  return (
    <div className="App wrapper">
      <div className="Container">
        <div className="Card">
          <b>Telegram ID</b>
          <div>{tgId}</div>
          <b>Username</b>
          <div>{tgUserName}</div>
          <b>Homescreen status</b>
          <div>{homeScreenStatus}</div>
        </div>
        {invitedBy && (
          <div className="Card">
            <b>Invited by</b>
            <div>{invitedBy}</div>
          </div>
        )}
        <div
          className="Button"
          onClick={() => {
            // startapp as payload for direct link mini apps
            // https://core.telegram.org/bots/webapps#direct-link-mini-apps
            const referralURI = encodeURIComponent(
              tgUserName ? `${appURI}?startapp=${tgUserName}` : appURI
            );
            // share feature: https://core.telegram.org/widgets/share
            // From SDK 7.0, openTelegramLink no longer closes the mini app, which enables in-app sharing
            const text =
              "Hey, let's play Solitaire together! ♣️♦️%0A%0AIn Suzume Solitaire, we can get airdrop rewards 🤩 Let's get all the treasure 🤑 🏴‍☠️";
            WebApp.openTelegramLink(`${shareURI}${referralURI}&text=${text}`);
          }}
        >
          Old Share
        </div>
        <div
          className="Button"
          onClick={() => {
            WebApp.shareMessage(shareMessageId);
          }}
        >
          New Share
        </div>
        <div
          className="Button"
          onClick={() => {
            WebApp.openTelegramLink(botURI);
          }}
        >
          Subscribe Bot
        </div>
        <div
          className="Button"
          onClick={() => {
            WebApp.openTelegramLink(vaultURI);
          }}
        >
          Open Vault
        </div>
        <div
          className="Button"
          onClick={async () => {
            const response = await fetch(imageAssetURL);
            const blob = await response.blob();
            const filesArray: File[] = [
              new File([blob], "meme.jpg", {
                type: "image/jpeg",
                lastModified: new Date().getTime(),
              }),
            ];
            navigator.share({
              text: `Check out the meme: ${appURI}`,
              // url: appURI,
              files: filesArray,
            });
          }}
        >
          Share to Group
        </div>
        <div
          className="Button"
          onClick={() => {
            WebApp.isFullscreen
              ? WebApp.exitFullscreen()
              : WebApp.requestFullscreen();
          }}
        >
          Toggle Fullscreen
        </div>
        <div
          className="Button"
          onClick={() => {
            WebApp.addToHomeScreen();
          }}
        >
          Add to Homescreen
        </div>
      </div>
      <div className="Container">
        <TonConnectButton />

        <div className="Card">
          <b>Counter Address</b>
          <div className="Hint">{address?.slice(0, 30) + "..."}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? "Loading..."}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
