const { expect } = require("chai");

let marketContract;
let MarketPlace;

describe("StokeMarketPlace contract", function() {
    it("Should make offer", async function() {
      MarketPlace = await ethers.getContractFactory("StokeMarketplace");
      marketContract = await MarketPlace.deploy();
  
      expect(
        await marketContract.makeOffer(
          "0xc778417E063141139Fce010982780140Aa0cD5Ab",
          50000,
          1,
          1450
        )
      )
    })
  
    it("Should get offerItem by Id", async function() {
      await marketContract.getOffersByTokenId(1);
    })
})