import "./App.css";
import WebApp from "@twa-dev/sdk";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "./hooks/useCounterContract";

function App() {
  const { value, address } = useCounterContract();
  // https://core.telegram.org/bots/webapps#webappinitdata
  const initData = WebApp?.initDataUnsafe;
  const tgId = initData?.user?.id;

  return (
    <div className="App">
      <div className="Container">
        <div className="Card">
          <b>Telegram ID</b>
          <div>{tgId}</div>
        </div>
        <div className="Card">
          <b>Invited by</b>
          <div>{"Loading..."}</div>
        </div>
        <div className="Button">Share</div>
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
