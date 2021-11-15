const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElection.sol/USElection.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "40c2813049e44ec79cb4d7e0d18de173"
  );

  const wallet = new hre.ethers.Wallet(
    "7be17a3ad85e054007d2ad61624017461389f4472259861e26bc37113f4c1f3c",
    provider
  );
  const balance = await wallet.getBalance();

  const electionContract = new hre.ethers.Contract(
    "0x475517fd93794bee28A8fCdB98799FfC6292475e",
    USElection.abi,
    wallet
  );

  const transactionOhio = await electionContract.submitStateResult([
    "Ohio",
    250,
    150,
    24,
  ]);
  console.log("State Result Submission Transaction:", transactionOhio.hash);
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
