import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";


const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [ getPhantomWallet(), getSlopeWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
      
          <li>
            <a href="https://apexninjaguru.com/" onClick={toggleMenu}>
              <b>
              Home
              </b>
            </a>
          </li>
          <li>
            <a href="https://apexninjaguru.com/#Roadmap" onClick={toggleMenu}>
              <b>
              Roadmap
              </b>
            </a>
          </li>
          {/* <li>
            <a href="https://apexninjaguru.com/#Attributes" onClick={toggleMenu}>
              <b>
              Rarity
              </b>
            </a>
          </li>
          <li>
            <a href="https://apexninjaguru.com/#Team" onClick={toggleMenu}>
              <b>
              Team
              </b>
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://apexninjaguru.com/">
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
            </a>

            </div>
          </li> */}
        </ul>
      </div>
  
      <nav>
        <div className="nav-container">
          <a href="https://dopedudes.art/">
          <img className="mobile-nav-logo" width="100" src="/img/logo.png" alt="" />
          </a>
          <div className="social-icons hide-800" style={{ padding: "20px 0 0" }}>
          <img className="mobile-nav-logo" width="108" src="/img/1.png" alt="" />
          </div>
          <div className="social-icons hide-800" style={{ padding: "20px 0 0" }}>
          <img className="mobile-nav-logo" width="108" src="/img/2.png" alt="" />
          </div>
          <div className="social-icons hide-800" style={{ padding: "20px 0 0" }}>
          <img className="mobile-nav-logo" width="108" src="/img/3.png" alt="" />
          </div>
          <div className="social-icons hide-800" style={{ padding: "20px 0 0" }}>
          <img className="mobile-nav-logo" width="108" src="/img/4.png" alt="" />
          </div>
          <div className="social-icons hide-800" style={{ padding: "20px 0 0" }}>
          <img className="mobile-nav-logo" width="108" src="/img/5.png" alt="" />
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h3 className="text-secondary-color" style={{ color: "white" }} >Welcome To The</h3>
              <h1 className="pb-3" style={{ color: "white" }} >Dope Dudes Mint</h1>
              <h3 className="pb-3" style={{ color: "white" }}>WL Presale:   0.3 SOL 
                            <br />
               Public Sale:   0.5 SOL 
              </h3>
{/* 
              <div className="social-icons hide-800">
                <a target="_blank" href="http://www.twitter.com/">
            <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a target="_blank" href="https://discord.gg/B79cJg3Khy">

            <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>

          </div> */}
              <p className="text-secondary-color">
                

              Dope Dudes are 2222 unique PFP avatars. We created over 350 assets paired with 8 traits. The possibilities are undetermined, and the assets are ranked by their rarity. Every single piece of the assets is hand drawn and quality is checked by our artist thoughtfully.



</p>
<br />
<p className="text-secondary-color">
The Dope Dudes are living in Solana blockchain and they costs 0.5 SOL per mint. Let’s hop into the world of Dope Dudes to explore and rise to the moon with community.
              </p>
            </div>
            
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                      
                        <Minter
                          candyMachineId={candyMachineId}
                          
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                      
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>

      </div>
    </div>
  );
};

export default App;
