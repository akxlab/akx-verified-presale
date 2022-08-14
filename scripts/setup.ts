import { ethers, upgrades } from "hardhat";
import fs from "fs";

const O: any = fs.readFileSync("./addresses/presaleAKXPriceOracle.json").toString();
const T: any = fs.readFileSync("./addresses/presaleLABZ.json").toString();
const N: any = fs.readFileSync("./addresses/presaleNFT.json").toString();
const AKX1: any = fs.readFileSync("./addresses/presaleAKX.json").toString();

async function main() {
    const signers = await ethers.getSigners();
  const C = await ethers.getContractAt("VipNfts", JSON.parse(N).address);
    C.connect(signers[0])
const AKXADDR = JSON.parse(AKX1).address;
const MINTER = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
    const tx = await C.grantRole(MINTER, AKXADDR);
    await tx.wait();

    const Token = await ethers.getContractAt("LABZ", JSON.parse(T).address);
    Token.connect(signers[0]);

    const tx3 = await Token.setNewMinter(AKXADDR);
    await tx3.wait();

    console.log(tx.hash, tx3.hash);

    const A = await ethers.getContractAt("AKX", AKXADDR);
    A.connect(signers[0]);

    const tx2 = await A.buy({from: signers[0].address, value: ethers.utils.parseEther("1")});
    await tx2.wait()

    console.log(tx2.data);


 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


