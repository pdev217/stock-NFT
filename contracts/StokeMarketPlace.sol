// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract StokeMarketplace is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _offerCounter; // start from 1

    struct OfferItem {
        uint id;
        address token;
        uint256 tokenId;
        uint256 price;
        address payable from;
        uint256 expiresAt;
        uint256 startedAt;
    }

    event offerItemCreated (
        uint id,
        address token,
        uint256 tokenId,
        uint256 price,
        address payable from,
        uint256 expiresAt,
        uint256 startedAt
    );

    mapping(uint256 => OfferItem) public offerItems;
    
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
        uint256 _expiresAt
    ) public nonReentrant {
        require(IERC20(_token).allowance(msg.sender, address(this)) == amount, "insuffeciant balance");
        IERC20(_token).transferFrom(msg.sender, address(this), amount);

        _offerCounter.increment();
        uint256 id = _offerCounter.current();

        offerItems[id] = OfferItem(
            id,
            _token,
            _tokenId,
            amount,
            payable(msg.sender),
            _expiresAt,
            block.timestamp
        );

        emit offerItemCreated(
            id,
            _token,
            _tokenId,
            amount,
            payable(msg.sender),
            _expiresAt,
            block.timestamp
        );
    }

    function acceptOffer(
        uint _id,
        address _nftContract
    ) public nonReentrant {
        address token = offerItems[_id].token;
        uint256 amount = offerItems[_id].price;
        require(offerItems[_id].expiresAt >= block.timestamp, "Marketplace: the offer expired");

        IERC20(token).transfer(msg.sender, amount);

        //transfer nft
        //require(msg.sender == offerItems[_id].from, "You are an owner of NFT.");

        // token.transfer(ownerAddress, amount);
        // address from = offerItems[_id].from;
        // uint256 tokenId = offerItems[_id].tokenId;
        // IERC721(_nftContract).transferFrom(msg.sender, from, tokenId);
        delete offerItems[_id];
    }
}