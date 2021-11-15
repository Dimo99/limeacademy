const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElection.sol/USElection.json");

const run = async function () {
  const provider = new hre.ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const wallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const electionContract = new hre.ethers.Contract(
    contractAddress,
    USElection.abi,
    wallet
  );

  const hasEnded = await electionContract.electionEnded();
  console.log("The election has ended:", hasEnded);

  const hasResutsForOhio = await electionContract.resultsSubmited("Ohio");
  console.log("Have results for Ohio:", hasResutsForOhio);

  const transactionOhio = await electionContract.submitStateResult([
    "Ohio",
    250,
    150,
    24,
  ]);

  const transactionReceipt = await transactionOhio.wait();

  if (transactionReceipt.status != 1) {
    console.log("Transaction was not successful");
    return;
  }

  const resultsSubmitedOhioNew = await electionContract.resultsSubmited("Ohio");
  console.log("Results submitted for Ohio", resultsSubmitedOhioNew);

  const currentLeader = await electionContract.currentLeader();
  console.log("Current leader", currentLeader);
};

run();
