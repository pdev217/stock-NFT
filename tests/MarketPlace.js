const {
  expect
} = require("chai");
const web3Abi = require("web3-eth-abi");

let WETH, weth;
let nftArtifact, nftContract;
let marketContract;
let MarketPlace;
let owner, account1, account2;

describe("StokeMarketPlace contract", function () {
  it("Deploy contracts", async function () {
    [owner, account1, account2] = await ethers.getSigners();

    MarketPlace = await  ethers.getContractFactory('StokeMarketplace');
    marketContract = await MarketPlace.deploy();
    await marketContract.deployed();
    console.log("Marketplace Deployed to:", marketContract.address);

    nftArtifact = await  ethers.getContractFactory('StokeNFT');
    nftContract = await nftArtifact.deploy();
    await nftContract.deployed();
    console.log("NFT deployed to:", nftContract.address);

    WETH = await  ethers.getContractFactory('WETH9');
    // weth = await WETH.deploy('WrappedEther', 'WETH', 18, ethers.utils.parseUnits("100000000", 18), owner.address, owner.address);
    weth = await WETH.deploy();
    await weth.deployed();
    console.log("WETH deployed to:", weth.address);
  })

  it("Start making offer", async function () {
    await weth.connect(account1).deposit(ethers.utils.parseUnits(String(1000), 18));
    await weth.connect(account2).deposit(ethers.utils.parseUnits(String(1000), 18));
    await nftContract.connect(account1).createToken(0, account1.address, 'ipfs://lion');
    await weth.connect(account2).approve(marketContract.address, ethers.utils.parseUnits(String(1000), 18));
    await marketContract.connect(account2).makeOffer(weth.address, ethers.utils.parseUnits(String(1000), 18), 0, nftContract.address,  Date.now("2022-04-11"));
  })
  
  it("Start accept offer", async function() {
    await nftContract.connect(account1).approve(marketContract.address, 0);
    await marketContract.connect(account1).acceptOffer(1);
  })
})