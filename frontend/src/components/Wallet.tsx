import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import toast from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import { usePoll } from "../contexts/PollContext";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
function Wallet() {
  const { readUser } = usePoll();
  const users = readUser();
  const [showAddress, setShowAddress] = useState(false);
  const { currentUser } = useUser();
  const loginTime = new Date();
  const expirationTime = new Date(loginTime.getTime() + 60000 * 30);

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  const { ethereum } = window;

  const contractAddress = "0xE050Fd03Ae651ee3C209e0506049B50b6395D326";

  const alchemyProvider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/zSkIJJHVNqSZOS211lgn95tYAhHu2vaj"
  );

  const walletProvider = new ethers.BrowserProvider(ethereum);
  const connectAccount = async () => {
    if (address != "") {
      if (showAddress === true) setShowAddress(false);
      else setShowAddress(true);
      return;
    }
    if (address === "") {
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setAddress(accounts[0]);
    localStorage.setItem("user", accounts[0]);
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    });
    toast.success("You are Logged In");
    localStorage.setItem("user", accounts[0]);
    localStorage.setItem("expirationTime", JSON.stringify(expirationTime));
    console.log(balance);
    setBalance(ethers.formatEther(balance));
    console.log(address);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User ", user);
    const expirationTime = new Date(
      JSON.parse(localStorage.getItem("expirationTime"))
    ).getTime();

    console.log(expirationTime);
    console.log(new Date().getTime());

    if (user && new Date().getTime() <= expirationTime) {
      setAddress(user);
      console.log("Address ", address);
    } else {
      setAddress("");
      expirationTime === 0 && localStorage.removeItem("expirationTime");
      console.log("Address ", address);
    }
  }, []);
  return (
    <>
      <section className="flex flex-col ">
        <button
          className="px-2 p-1 shadow-md rounded-md text-base"
          onClick={connectAccount}
        >
          {address === "" ? "Connect" : "Connected"}
        </button>
        {showAddress && <p className="text-base text-violet-500">{address}</p>}
      </section>
    </>
  );
}

export default Wallet;
