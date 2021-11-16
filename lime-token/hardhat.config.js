require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploys the contract", async (taskArgs, hre) => {
  const LimeToken = await hre.ethers.getContractFactory("LimeToken");
  const lime = await LimeToken.deploy();

  await lime.deployed();

  console.log("LimeCoin deployed to:", lime.address);

  const ETHWrapper = await ethers.getContractFactory("ETHWrapper"); //
  const ethWrapperContract = await ETHWrapper.deploy();
  console.log("Waiting for ETHWrapper deployment...");
  await ethWrapperContract.deployed();
  console.log("ETHWrapper deployed to:", ethWrapperContract.address);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.6",
};
