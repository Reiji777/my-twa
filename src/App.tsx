import "./App.css";
import WebApp from "@twa-dev/sdk";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "./hooks/useCounterContract";

const shareURI = "https://t.me/share/url?url=";
const appURI = "t.me/PlayLuckyBot/demo";

function App() {
  const { value, address } = useCounterContract();
  // https://core.telegram.org/bots/webapps#webappinitdata
  const initData = WebApp?.initDataUnsafe;
  const tgId = initData?.user?.id;
  const tgUserName = initData?.user?.username;
  const invitedBy = initData?.start_param;

  return (
    <div className="App">
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
            const referralURI = tgUserName
              ? `${appURI}?startapp=${tgUserName}`
              : appURI;
            // share feature: https://core.telegram.org/widgets/share
            // From SDK 7.0, openTelegramLink no longer closes the mini app, which enables in-app sharing
            WebApp.openTelegramLink(
              shareURI.concat(referralURI, "&text=").concat("Share testing...")
            );
          }}
        >
          Share
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
