const hre = require("hardhat");

async function main() {
    const HospitalReferral = await hre.ethers.getContractFactory("HospitalReferral");
    const contract = await HospitalReferral.deploy();

    console.log(`Contract deployed at: ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
