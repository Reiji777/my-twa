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
const storyAssetURL =
  "https://rr1---sn-4ox-ixal.googlevideo.com/videoplayback?expire=1722683987&ei=872tZqL7KNmRv_IP0fblyQQ&ip=193.9.158.234&id=o-AP6idbPOftyA7oRlH-9-ufIRuTbzk7vPfoBYeg--Hm9z&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Zk&mm=31%2C29&mn=sn-4ox-ixal%2Csn-ixh7yn7e&ms=au%2Crdu&mv=u&mvi=1&pl=24&bui=AXc671JOdB5CjEAcq76Wi-PYxHlDt-HsN0dluP9ep6IZyyor4G69pToD_HNJHLes9t1o6mZ22DJnETs3&vprv=1&svpuc=1&mime=video%2Fmp4&ns=_ojE2EgSaaA7PHp7DZcwGaEQ&rqh=1&gir=yes&clen=1200219&ratebypass=yes&dur=17.301&lmt=1720670072585078&mt=1722661621&fvip=3&lmw=1&c=TVHTML5&sefc=1&txp=5530434&n=7Hp9Ai6Qjlomgw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJsLj0u0LcNE8tQYdTIRulBZW6eU1xjXhM0ToOdC8R49AiA5KlphTdGVgJxWb9m71lhpCtUz_TV7I7-d4HIVk9FMSQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AGtxev0wRQIhAPqUddUgG9Fy0klX1n0PwDWfB0ABw7t-6E9HUWSXwf18AiAsQP0uN6PFWyz0STSKG_HVlyPfA-rzY4vzLC-Hv9HRdQ%3D%3D&title=4%E4%BA%BA%E7%8E%A9%EF%BC%81%E7%9C%9F%E7%B4%A7%E5%BC%A0%EF%BC%81%EF%BC%81|||%E6%89%8B%E6%8C%87%E5%A4%B4%E6%80%8E%E4%B9%88%E9%83%BD%E5%87%BA%E6%B1%97%E4%BA%86%EF%BC%81";

function App() {
  const { value, address } = useCounterContract();
  // https://core.telegram.org/bots/webapps#webappinitdata
  const initData = WebApp?.initDataUnsafe;
  const tgId = initData?.user?.id;
  const tgUserName = initData?.user?.username;
  const invitedBy = initData?.start_param;

  // useEffect(() => {
  //   window.scrollTo(0, 1);}, [])

  return (
    <div className="App wrapper">
      <div className="Container">
        <div className="Card">
          <b>Telegram ID</b>
          <div>{tgId}</div>
          <b>Username</b>
          <div>{tgUserName}</div>
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
          Share
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
            WebApp.shareToStory(storyAssetURL, { text: "Check out my story" });
          }}
        >
          Post Story
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
