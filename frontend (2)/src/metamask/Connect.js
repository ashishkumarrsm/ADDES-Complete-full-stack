// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
// import {
//   useWeb3Modal,
//   useWeb3ModalProvider,
//   useWeb3ModalAccount,
//   useWeb3ModalState,
//   useDisconnect,
// } from "@web3modal/ethers/react";

// // Configure Web3Modal
// createWeb3Modal({
//   ethersConfig: defaultConfig({
//     metadata: {
//       name: "USDT Transfer App",
//       description: "Transfer USDT across different networks",
//     },
//   }),
//   chains: [
//     {
//       chainId: 56,
//       name: "BNB Smart Chain",
//       currency: "BNB",
//       explorerUrl: "https://bscscan.com",
//       rpcUrl: "https://bsc-dataseed.binance.org",
//     },
//   ],
//   projectId: "b00311bb20f1d71b977b474eac2b7dcd", // Get this from cloud.walletconnect.com
// });

// const BSC_CHAIN_ID = "0x38"; // BSC Mainnet Chain ID
// const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";
// const BSCSCAN_API_URL = "https://api.bscscan.com/api";

// const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT
// const USDT_ABI = [
//   "function balanceOf(address) view returns (uint256)",
//   "function decimals() view returns (uint8)",
//   "function transfer(address, uint256) returns (bool)",
// ];

// export default function Connect() {
//   const { open } = useWeb3Modal();
//   const { address, isConnected } = useWeb3ModalAccount();
//   const { chainId } = useWeb3ModalState();
//   const { disconnect } = useDisconnect();
//   const { walletProvider } = useWeb3ModalProvider();

//   const [bnbBalance, setBnbBalance] = useState("0.00");
//   const [usdtBalance, setUsdtBalance] = useState("0.00");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Improved network switching function
//   const switchToBNBChain = async () => {
//     if (!walletProvider) {
//       console.warn("Provider not initialized");
//       setError("Wallet provider not available. Please connect again.");
//       return;
//     }

//     try {
//       if (walletProvider.provider) {
//         // For Web3Modal v3
//         const ethersProvider = new ethers.BrowserProvider(
//           walletProvider.provider
//         );
//         await ethersProvider.send("wallet_switchEthereumChain", [
//           { chainId: BSC_CHAIN_ID },
//         ]);
//       } else {
//         // Legacy approach
//         await walletProvider.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: BSC_CHAIN_ID }],
//         });
//       }
//     } catch (err) {
//       // Check if this is because the chain hasn't been added
//       if (err.code === 4902) {
//         try {
//           const params = [
//             {
//               chainId: BSC_CHAIN_ID,
//               chainName: "BNB Smart Chain",
//               nativeCurrency: {
//                 name: "BNB",
//                 symbol: "BNB",
//                 decimals: 18,
//               },
//               rpcUrls: [BSC_RPC_URL],
//               blockExplorerUrls: ["https://bscscan.com/"],
//             },
//           ];

//           if (walletProvider.provider) {
//             // For Web3Modal v3
//             const ethersProvider = new ethers.BrowserProvider(
//               walletProvider.provider
//             );
//             await ethersProvider.send("wallet_addEthereumChain", params);
//           } else {
//             // Legacy approach
//             await walletProvider.request({
//               method: "wallet_addEthereumChain",
//               params,
//             });
//           }
//         } catch (addError) {
//           console.error("Failed to add BSC network:", addError);
//           setError("Failed to add BSC network to your wallet");
//         }
//       } else {
//         console.error("Failed to switch network:", err);
//         setError("Failed to switch to BSC network");
//       }
//     }
//   };

//   // Enhanced balance fetching with proper error handling
//   const fetchBalances = async () => {
//     if (!address || !walletProvider) {
//       console.warn("Account or provider not available");
//       return;
//     }

//     try {
//       // Create a provider that works with any web3 wallet
//       let ethersProvider;

//       if (walletProvider.provider) {
//         ethersProvider = new ethers.BrowserProvider(walletProvider.provider);
//       } else {
//         // For most web3 wallets
//         ethersProvider = new ethers.BrowserProvider(walletProvider);
//       }

//       // Fetch BNB balance
//       const bnbBal = await ethersProvider.getBalance(address);
//       setBnbBalance(ethers.formatEther(bnbBal));

//       // Check if USDT contract exists at the address
//       const code = await ethersProvider.getCode(USDT_ADDRESS);
//       if (code === "0x") {
//         console.warn("No contract found at USDT address");
//         setUsdtBalance("0");
//         return;
//       }

//       // Fetch USDT balance with safe fallbacks
//       const usdtContract = new ethers.Contract(
//         USDT_ADDRESS,
//         USDT_ABI,
//         ethersProvider
//       );

//       // Get decimals with fallback
//       let decimals = 18;
//       try {
//         decimals = await usdtContract.decimals();
//       } catch (decimalErr) {
//         console.warn("Failed to get decimals, using default:", decimalErr);
//       }

//       // Get balance with fallback
//       let usdtBal = ethers.parseUnits("0", decimals);
//       try {
//         usdtBal = await usdtContract.balanceOf(address);
//       } catch (balErr) {
//         console.warn("Failed to get USDT balance:", balErr);
//       }

//       setUsdtBalance(ethers.formatUnits(usdtBal, decimals));
//     } catch (err) {
//       console.error("Balance fetch error:", err);
//       setError(`Failed to fetch wallet balances: ${err.message}`);
//     }
//   };

//   // Function to fetch BNB and USDT balances

//   useEffect(() => {
//     if (isConnected && address) {
//       fetchBalances();
//     }
//   }, [isConnected, address, chainId]);

//   const disconnectWallet = async () => {
//     try {
//       await disconnect();
//       setBnbBalance("0.00");
//       setUsdtBalance("0.00");
//     } catch (error) {
//       console.error("Disconnect error:", error);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="overflow-hidden px-4 rounded-sm shadow-2xl backdrop-blur-md bg-gray-900/50 sm:px-8">
//         {isConnected ? (
//           <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-3">
//             <div className="p-4 rounded-xl border backdrop-blur-sm bg-yellow-500/10 border-yellow-500/20">
//               <p className="text-sm text-yellow-100/80">BNB Balance</p>
//               <p className="text-lg font-semibold text-yellow-400 break-all">
//                 {bnbBalance} BNB
//               </p>
//             </div>
            
//             <div className="p-4 rounded-xl border backdrop-blur-sm bg-green-500/10 border-green-500/20">
//               <p className="text-sm text-green-100/80">USDT Balance</p>
//               <p className="text-lg font-semibold text-green-400 break-all">
//                 ${usdtBalance}
//               </p>
//             </div>
            
//             <div className="flex flex-col justify-between p-4 rounded-xl border backdrop-blur-sm bg-white/10 border-white/20">
//               <div className="text-base font-semibold text-center break-all text-white/90">
//                 {address}
//               </div>
//               <button
//                 className="px-4 py-2 mt-2 text-sm text-white rounded-lg transition-colors duration-200 bg-red-500/80 hover:bg-red-600/80"
//                 onClick={disconnectWallet}
//               >
//                 Disconnect
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex justify-end py-2">
//             <button
//               className="px-6 py-3 font-medium text-blue-200 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-200 bg-blue-500/20 hover:bg-blue-500/30 hover:text-blue-300 border-blue-500/20 hover:border-blue-400/30 hover:shadow-blue-500/10"
//               onClick={() => open()}
//             >
//               Connect Wallet
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3Modal,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3ModalState,
  useDisconnect,
} from "@web3modal/ethers/react";

// Import icons
import { BiWallet, BiRefresh, BiLinkExternal } from "react-icons/bi";
import { FaEthereum, FaExchangeAlt } from "react-icons/fa";
import { SiTether } from "react-icons/si";

// Configure Web3Modal
createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata: {
      name: "USDT Transfer App",
      description: "Transfer USDT across different networks",
    },
  }),
  chains: [
    {
      chainId: 56,
      name: "BNB Smart Chain",
      currency: "BNB",
      explorerUrl: "https://bscscan.com",
      rpcUrl: "https://bsc-dataseed.binance.org",
    },
  ],
  projectId: "b00311bb20f1d71b977b474eac2b7dcd",
});

const BSC_CHAIN_ID = "0x38"; // BSC Mainnet Chain ID
const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT
const USDT_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address, uint256) returns (bool)",
];

export default function Connect() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { chainId } = useWeb3ModalState();
  const { disconnect } = useDisconnect();
  const { walletProvider } = useWeb3ModalProvider();

  const [bnbBalance, setBnbBalance] = useState("0.00");
  const [usdtBalance, setUsdtBalance] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Network switching function
  const switchToBNBChain = async () => {
    if (!walletProvider) {
      setError("Wallet provider not available. Please connect again.");
      return;
    }

    try {
      setLoading(true);
      if (walletProvider.provider) {
        const ethersProvider = new ethers.BrowserProvider(walletProvider.provider);
        await ethersProvider.send("wallet_switchEthereumChain", [{ chainId: BSC_CHAIN_ID }]);
      } else {
        await walletProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BSC_CHAIN_ID }],
        });
      }
      setLoading(false);
    } catch (err) {
      if (err.code === 4902) {
        try {
          const params = [
            {
              chainId: BSC_CHAIN_ID,
              chainName: "BNB Smart Chain",
              nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              rpcUrls: [BSC_RPC_URL],
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ];

          if (walletProvider.provider) {
            const ethersProvider = new ethers.BrowserProvider(walletProvider.provider);
            await ethersProvider.send("wallet_addEthereumChain", params);
          } else {
            await walletProvider.request({ method: "wallet_addEthereumChain", params });
          }
        } catch (addError) {
          setError("Failed to add BSC network to your wallet");
        }
      } else {
        setError("Failed to switch to BSC network");
      }
      setLoading(false);
    }
  };

  // Balance fetching function
  const fetchBalances = async () => {
    if (!address || !walletProvider) return;

    try {
      setRefreshing(true);
      let ethersProvider;

      if (walletProvider.provider) {
        ethersProvider = new ethers.BrowserProvider(walletProvider.provider);
      } else {
        ethersProvider = new ethers.BrowserProvider(walletProvider);
      }

      // Fetch BNB balance
      const bnbBal = await ethersProvider.getBalance(address);
      setBnbBalance(ethers.formatEther(bnbBal));

      // Check if USDT contract exists
      const code = await ethersProvider.getCode(USDT_ADDRESS);
      if (code === "0x") {
        setUsdtBalance("0");
        setRefreshing(false);
        return;
      }

      // Fetch USDT balance
      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, ethersProvider);

      // Get decimals with fallback
      let decimals = 18;
      try {
        decimals = await usdtContract.decimals();
      } catch (decimalErr) {
        console.warn("Failed to get decimals, using default:", decimalErr);
      }

      // Get balance with fallback
      let usdtBal = ethers.parseUnits("0", decimals);
      try {
        usdtBal = await usdtContract.balanceOf(address);
      } catch (balErr) {
        console.warn("Failed to get USDT balance:", balErr);
      }

      setUsdtBalance(ethers.formatUnits(usdtBal, decimals));
      setRefreshing(false);
    } catch (err) {
      console.error("Balance fetch error:", err);
      setError(`Failed to fetch wallet balances: ${err.message}`);
      setRefreshing(false);
    }
  };

  // Effect to fetch balances when connected
  useEffect(() => {
    if (isConnected && address) {
      fetchBalances();
    }
  }, [isConnected, address, chainId]);

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      await disconnect();
      setBnbBalance("0.00");
      setUsdtBalance("0.00");
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  // View on BSC Scan
  const viewOnBscScan = () => {
    if (address) {
      window.open(`https://bscscan.com/address/${address}`, '_blank');
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="rounded-xl shadow-xl bg-gradient-to-r from-gray-900 to-gray-400 border border-gray-700">
        {isConnected ? (
          <div className="p-6">
            {/* Header with address and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="p-2 rounded-lg bg-blue-500/20 mr-3">
                  <BiWallet className="text-blue-400 text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Connected Wallet</p>
                  <p className="text-blue-300 text-sm font-mono">{formatAddress(address)}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={fetchBalances}
                  disabled={refreshing}
                  className="px-3 py-2 rounded-lg flex items-center text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <BiRefresh className={`mr-1 text-sm ${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                
                <button
                  onClick={viewOnBscScan}
                  className="px-3 py-2 rounded-lg flex items-center text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <BiLinkExternal className="mr-1 text-sm" />
                  BscScan
                </button>
                
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-red-300 bg-red-900/30 hover:bg-red-900/50 transition-colors border border-red-800/50"
                >
                  Disconnect
                </button>
              </div>
            </div>
            
            {/* Balance cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BNB Balance Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-900/20 to-yellow-900/5 border border-yellow-700/30">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-yellow-200/80 font-medium">BNB Balance</h3>
                  <div className="p-2 rounded-full bg-yellow-500/10">
                    <FaEthereum className="text-yellow-400" />
                  </div>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-yellow-400">
                    {Number(bnbBalance).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </span>
                  <span className="ml-2 text-xs font-medium text-yellow-200/70">BNB</span>
                </div>
                
                <div className="mt-2 text-xs text-yellow-200/50">
                  ≈ ${(Number(bnbBalance) * 270).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                </div>
              </div>
              
              {/* USDT Balance Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-green-900/20 to-green-900/5 border border-green-700/30">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-green-200/80 font-medium">USDT Balance</h3>
                  <div className="p-2 rounded-full bg-green-500/10">
                    <SiTether className="text-green-400" />
                  </div>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-green-400">
                    {Number(usdtBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="ml-2 text-xs font-medium text-green-200/70">USDT</span>
                </div>
                
                <div className="mt-2 text-xs text-green-200/50">
                  BSC Network • BEP-20
                </div>
              </div>
            </div>
            
            {/* Network info */}
            <div className="mt-4 flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-400">
                  {chainId === 56 ? "BNB Smart Chain" : "Switch to BSC Network"}
                </span>
              </div>
              
              {chainId !== 56 && (
                <button
                  onClick={switchToBNBChain}
                  disabled={loading}
                  className="px-3 py-1 text-xs rounded-md flex items-center text-blue-300 bg-blue-900/30 hover:bg-blue-900/50 transition-colors border border-blue-700/30"
                >
                  <FaExchangeAlt className="mr-1" />
                  Switch Network
                </button>
              )}
            </div>
            
            {/* Error display */}
            {error && (
              <div className="mt-3 p-3 text-sm text-red-300 bg-red-900/20 rounded-lg border border-red-800/30">
                {error}
              </div>
            )}
          </div>
        ) : (
          /* Not connected state */
          <div className="py-8 px-6 flex flex-col items-center justify-center">
            <div className="p-4 mb-4 rounded-full bg-blue-500/10">
              <BiWallet className="text-blue-400 text-3xl" />
            </div>
            <h2 className="text-lg font-medium text-gray-200 mb-2">Connect Your Wallet</h2>
            <p className="text-sm text-gray-400 mb-6 text-center max-w-md">
              Connect your wallet to access USDT transfer features on the BNB Smart Chain network
            </p>
            <button
              className="px-6 py-3 font-medium rounded-xl transition-all duration-300 
                         bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600
                         text-white shadow-lg hover:shadow-blue-700/20 flex items-center"
              onClick={() => open()}
            >
              <BiWallet className="mr-2" />
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}