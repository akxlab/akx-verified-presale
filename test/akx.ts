
/**
 * 
 * autogenerated by solidity-visual-auditor
 * 
 * execute with: 
 *  #> npx hardhat test <path/to/this/test.js>
 * 
 * */
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import fs from "fs";




describe('AKX', function () {

    const O: any = fs.readFileSync("./addresses/presaleAKXPriceOracle.json").toString();
    const T: any = fs.readFileSync("./addresses/presaleLABZ.json").toString();
    const N: any = fs.readFileSync("./addresses/presaleNFT.json").toString();
    const AKX1: any = fs.readFileSync("./addresses/presaleAKX.json").toString();
   


    async function deployAKXFixture() {
        const signers = await ethers.getSigners();
        const signer = signers[0];
        const akx = await ethers.getContractFactory("AKX");

        const akxArgs = [JSON.parse(O).address, JSON.parse(T).address, JSON.parse(N).address, signer.address];
        const AKX = await upgrades.deployProxy(akx, akxArgs, { kind: "uups", initializer: "initialize" });
        return { AKX, akxArgs, signer, signers };
    }


    async function getPriceOracleFixture() {
        const signers = await ethers.getSigners();
        const posigner = signers[0];

       const PO = await ethers.getContractFactory("AKXPriceOracle");
       const po = await PO.deploy();
       return {po, posigner};

    }

    async function getLabzFixture() {
        const signers = await ethers.getSigners();
        const lsigner = signers[0];

       const L:any = await ethers.getContractFactory("LABZ");
       const labz = await L.deploy(lsigner.address);
       return {labz, lsigner};

    }

    async function getNftVip() {
        const signers = await ethers.getSigners();
        const nsigner = signers[0];
        const {labz, lsigner} = await loadFixture(getLabzFixture);
       const L:any = await ethers.getContractFactory("VipNfts");
       const nft = await L.deploy(labz.address);
       return {nft, nsigner};

    }

    async function setupVipNftRoles() {
        const signers = await ethers.getSigners();
        const C = await ethers.getContractAt("VipNfts", JSON.parse(N).address);
        C.connect(signers[0])
    const AKXADDR = JSON.parse(AKX1).address;
    const MINTER = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
        const tx = await C.grantRole(MINTER, AKXADDR);
        return await tx.wait();
    }
  
    /* create named accounts for contract roles */

    before(async () => {
        /* before tests */


    })
    beforeEach(async () => {
        /* before each context */
      //  const { AKX, akxArgs, signer, signers } = await loadFixture(deployAKXFixture);
     
    })

   

    describe("LABZ (ERC20) deployment", function() {
       

        it("should return deployment address", async function() {

            const {labz, lsigner} = await loadFixture(getLabzFixture);
            expect(labz.address).to.not.be.undefined;
        });
        
    });

    describe("VIP NFT Manager deployment", function() {
       

        it("should return deployment address", async function() {

            const {nft, nsigner} = await loadFixture(getNftVip);
            expect(nft.address).to.not.be.undefined;
        });
        
    });

    describe("AKX UUPS Proxy deployment", function() {

        
        it("should return deployment address", async function()  {
           
            const {labz, lsigner} = await loadFixture(getLabzFixture);
            const {nft, nsigner} = await getNftVip();
         
            const akx = await ethers.getContractFactory("AKX");
            const akxArgs = [JSON.parse(O).address, labz.address, nft.address, nsigner.address];
            const AKX = await upgrades.deployProxy(akx, akxArgs, { kind: "uups", initializer: "initialize" });
            expect(AKX.address).to.not.be.undefined;
            const implementation = await upgrades.erc1967.getImplementationAddress(AKX.address);
            expect(implementation).to.not.be.undefined;
        });

        it("should return implementation address", async function()  {
           
            const {labz, lsigner} = await loadFixture(getLabzFixture);
            const {nft, nsigner} = await getNftVip();
         
            const akx = await ethers.getContractFactory("AKX");
            const akxArgs = [JSON.parse(O).address, labz.address, nft.address, nsigner.address];
            const AKX = await upgrades.deployProxy(akx, akxArgs, { kind: "uups", initializer: "initialize" });
            const implementation = await upgrades.erc1967.getImplementationAddress(AKX.address);
            expect(implementation).to.not.be.undefined;
        });

        describe("environment setup", function() {
            it("should set AKX as minter on VipNfts manager contract", async function() {
            let tx;
            try {

            tx = await setupVipNftRoles();

            if(tx.transactionHash) {
                return true;
            }
         

            } catch(err) {
                console.log(err);
            }

        });

        it("should grant minter role to AKX contract", async function() {
            const signers = await ethers.getSigners();
            const Token = await ethers.getContractAt("LABZ", JSON.parse(T).address);
            Token.connect(signers[0]);

            let tx;
            try {
                tx = await Token.setNewMinter(JSON.parse(AKX1).address);
                await tx.wait();
                if(tx.hash) {
                    return true;
                }
            } catch(err) {
                console.log(err);
                return false;
            }

    
        });
    });


    });

   
});
