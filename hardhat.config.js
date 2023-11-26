/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { utils, BigNumber } = require("ethers");
const { ethers } = require("ethers");

const privateKey = process.env.PRIVATE_KEY;
const url = process.env.RPC_URL;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    const address = await account.getAddress();
    const balance = await account.provider.getBalance(address);
    console.log(address + " " + ethers.formatEther(balance));
    console.log(account);
  }
});

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: url,
      accounts: [privateKey],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
