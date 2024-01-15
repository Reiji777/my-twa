import ReactDOM from 'react-dom/client';
import WebApp from '@twa-dev/sdk'
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import './index.css';

// Initialize mini app
// https://core.telegram.org/bots/webapps

// ready() needs to be called as early as possible
WebApp.ready();
// expand() is needed to display the mini app fullscreen
WebApp.expand();


// this manifest is used temporarily for development purposes
// Needed for TON Connect: https://docs.ton.org/develop/dapps/ton-connect/manifest
const manifestUrl = 'https://reiji777.github.io/my-twa/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
