const hre = require("hardhat");

async function main() {
    const Counter = await hre.ethers.getContractFactory("Counter");
    const contract = await Counter.deploy();

    console.log(`Contract deployed at: ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
