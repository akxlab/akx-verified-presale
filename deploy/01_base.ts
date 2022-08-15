import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
const {utils} = require("ethers");
import { writeAddress } from '../config/funcs';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  const {deployments, getNamedAccounts, upgrades} = hre;
  const {deploy} = deployments;
  const deployers = await hre.ethers.getSigners();
  const deployer = deployers[0].address;



  const date = new Date();


const O = await deploy("AKXPriceOracle", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
   waitConfirmations:0
 });

 const T = await deploy("LABZ", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
   waitConfirmations:0
  });


  const NFT = await deploy("VipNfts", { from: deployer,
    args: [T.address],
    log: true,
    autoMine: true,
  waitConfirmations:3});

  const akx = await ethers.getContractFactory("AKX");
  const akxArgs = [O.address, T.address, NFT.address, deployer];
  const AKX = await upgrades.deployProxy(akx, akxArgs, {kind: "uups", initializer: "initialize"});
  await AKX.deployTransaction.wait(0);

  const nftInstance = await ethers.getContractAt("VipNfts", NFT.address, deployers[0]);
  nftInstance.connect(deployers[0]);


  const labzInstance = await ethers.getContractAt("LABZ", T.address, deployers[0]);

 

  console.log(`LABZ token deployed to: ${T.address}`);

  writeAddress("AKXPriceOracle", O.address);
  writeAddress("LABZ", T.address);
  writeAddress("NFT", NFT.address);
  writeAddress("AKX", AKX.address);

  /*await hre.run("verify:verify", {
    address: O.address, 
    constructorArguments: []
  });*/

  /*await hre.run("verify:verify", {
    address: T.address,
    constructorArguments: [deployer]
  });
  await hre.run("verify:verify", {
    address: NFT.address,
    constructorArguments: [T.address]
  });*/

  const akxImpl = await upgrades.erc1967.getImplementationAddress(AKX.address);



};
export default func;

