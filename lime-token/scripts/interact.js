const { ethers } = require("ethers");
const ETHWrapper = require("../artifacts/contracts/ETHWrapper.sol/ETHWrapper.json");
const WETH = require("../artifacts/contracts/WETH.sol/WETH.json");

const run = async function () {
  const providerUrl = "http://localhost:8545";
  const walletPrivateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  const wrapperContractAddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(walletPrivateKey, provider);

  const wrapperContract = new ethers.Contract(
    wrapperContractAddress,
    ETHWrapper.abi,
    wallet
  );

  const wethAddress = await wrapperContract.WETHToken();
  const tokenContract = new ethers.Contract(wethAddress, WETH.abi, wallet);

  const wrapValue = ethers.utils.parseEther("1");

  const wrapTx = await wallet.sendTransaction({
    to: wrapperContractAddress,
    value: wrapValue,
  });
  await wrapTx.wait();

  let walletBalanceInETH = await provider.getBalance(wallet.address);
  console.log("ETH balance after wrapping:", walletBalanceInETH.toString());

  let balance = await tokenContract.balanceOf(wallet.address);
  console.log("WETH balance after wrapping:", balance.toString());

  let contractETHBalance = await provider.getBalance(wrapperContractAddress);
  console.log(
    "Contract ETH balance after wrapping:",
    contractETHBalance.toString()
  );
};

run();
