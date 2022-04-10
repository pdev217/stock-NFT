// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract StokeMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _offerCounter; // start from 1
    
    address payable public marketowner;

    struct OfferItem {
        uint id;
        address token;
        uint256 tokenId;
        uint256 price;
        address payable sender;
        address nftContract;
        uint256 expiresAt;
        uint256 startedAt;
    }

    event offerItemCreated (
        uint id,
        address token,
        uint256 tokenId,
        uint256 price,
        address payable sender,
        address nftContract,
        uint256 expiresAt,
        uint256 startedAt
    );

    mapping(uint256 => OfferItem) public offerItems;

    constructor() {
        marketowner = payable(msg.sender);
    }

    modifier onlyByOwner {
        require(msg.sender == marketowner, "You are not an owner of Marketplace.");
        _;
    }
    
    function getOffersByTokenId(uint256 tokenId) public view returns (OfferItem[] memory) {
        uint total = _offerCounter.current();
        uint count = 0;
        uint index = 0;

        for(uint i = 0; i <= total; i++) {
            if(offerItems[i].tokenId == tokenId) {
                count ++;
            }
        }

        OfferItem[] memory items = new OfferItem[](count);

        for(uint i = 1; i <= total; i++) {
            if(offerItems[i].tokenId == tokenId) {
                items[index] = offerItems[i];
                index ++;
            }
        }
        console.log(items.length);
        return items;
    }

    function makeOffer(
        address _token,
        uint256 amount,
        uint256 _tokenId,
        address _nftContract,
        uint256 _expiresAt
    ) public nonReentrant {
        _offerCounter.increment();
        uint256 id = _offerCounter.current();

        require(IERC20(_token).allowance(msg.sender, address(this)) == amount, "MarketPlace: influence amount");

        offerItems[id] = OfferItem(
            id,
            _token,
            _tokenId,
            amount,
            payable(msg.sender),
            _nftContract,
            _expiresAt,
            block.timestamp
        );

        emit offerItemCreated(
            id,
            _token,
            _tokenId,
            amount,
            payable(msg.sender),
            _nftContract,
            _expiresAt,
            block.timestamp
        );
    }

    function acceptOffer(
        uint _id
    ) public nonReentrant {
        address token = offerItems[_id].token;
        uint256 amount = offerItems[_id].price;
        address sender = offerItems[_id].sender;
        uint256 tokenId = offerItems[_id].tokenId;
        address nftContract = offerItems[_id].nftContract;

        require(offerItems[_id].expiresAt >= block.timestamp, "Marketplace: the offer expired");
        // require(msg.sender == offerItems[_id].sender, "You are not seller");
        require(IERC20(token).allowance(sender, address(this)) == amount, "MarketPlace: Inffluence amount");

        //calc service fee - 2.5%
        uint marketFeePercentage = 25;
        uint commissionDenominator  = 1000;
        uint serviceFee = amount * marketFeePercentage / commissionDenominator;

        IERC20(token).transferFrom(sender, address(this), amount);
        IERC20(token).transfer(msg.sender, (amount-serviceFee));
        IERC20(token).transfer(marketowner, serviceFee);

        require(IERC721(nftContract).getApproved(tokenId) == address(this), "MarketPlace: NFT must be approved to market");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        IERC721(nftContract).transferFrom(address(this), sender, tokenId);

        delete offerItems[_id];
    }
}