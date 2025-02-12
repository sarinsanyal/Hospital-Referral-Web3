import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";


// definations
const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(import.meta.env.VITE_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: import.meta.env.SSR,
});
const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
