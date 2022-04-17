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

    struct Offer {
        address sender;
        uint256 amount;
        uint256 expiresAt;
    }

    struct Token {
        uint256 tokenId;
        string tokenURI;
    }

    constructor() {
        marketowner = payable(msg.sender);
    }

    modifier onlyByOwner {
        require(msg.sender == marketowner, "You are not an owner of Marketplace.");
        _;
    }

    function accept(
        Offer memory offer,
        address WETH,
        address _nftContract,
        Token memory token
    ) public {
        require(offer.expiresAt >= block.timestamp, "MarketPlace: the offer expired");

        //calc service fee -2.5%
        uint marketFeePercentage = 25;
        uint commissionDenominator = 1000;
        uint serviceFee = offer.amount * marketFeePercentage / commissionDenominator;
        
        uint256 balance = IERC20(WETH).balanceOf(offer.sender);
        require(balance >= offer.amount, "MarketPlace: Offer sender has no enought token");
        //approve feature
        (bool success,) = WETH.call(abi.encodeWithSignature("_approve(address,address,uint256)", offer.sender, address(this), offer.amount));
        console.log(success);

         //transfer nft
         (bool success1,) = _nftContract.call(
            abi.encodeWithSignature(
                "createToken(uint256,address,string)",
                token.tokenId,
                offer.sender,
                token.tokenURI
            )
        );
        console.log(success1);

        require(IERC20(WETH).allowance(offer.sender, address(this)) == offer.amount, "insufficient amount");

        //transfer weth token
        IERC20(WETH).transferFrom(offer.sender, msg.sender, (offer.amount - serviceFee));
        IERC20(WETH).transferFrom(offer.sender, marketowner, serviceFee);
    }
    

    // function test(
    //     address sender,
    //     uint256 amount,
    //     uint256 deadline,
    //     address WETH,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) public {
    //     // (bool success,) = WETH.call(abi.encodeWithSignature("permit(address,address,uint256,uint256,uint8,bytes32,bytes32)", sender, address(this), amount, deadline, v, r, s));
    //     (bool success,) = WETH.call(abi.encodeWithSignature("_approve(address,address,uint256)", sender, address(this), amount));
    //     console.log(success);
    //     require(IERC20(WETH).allowance(sender, address(this)) == amount, "insfluience amount");
    //     // (bool success,) = WETH.call(abi.encodeWithSignature("test(address,uint256)", sender, amount));
    // }

    // function acceptOffer(
    //     address _token,
    //     address _sender,
    //     uint256 _amount,
    //     uint256 _expiresAt,
    //     address _nftContract,
    //     uint256 _tokenId,
    //     string memory _tokenURI
    // ) public nonReentrant {

    //     require(_expiresAt >= block.timestamp, "Marketplace: the offer expired");

    //     //calc service fee - 2.5%
    //     uint marketFeePercentage = 25;
    //     uint commissionDenominator = 1000;
    //     uint serviceFee = _amount * marketFeePercentage / commissionDenominator;

    //     require(IERC20(_token).allowance(_sender, address(this)) == _amount, "insufficient amount");
    //     IERC20(_token).transferFrom(_sender, msg.sender, (_amount-serviceFee));
    //     IERC20(_token).transferFrom(_sender, marketowner, serviceFee);

    //     (bool success, bytes memory result) = _nftContract.call(abi.encodeWithSignature("createToken(uint256,address,string)", _tokenId, _sender, _tokenURI));
        
    //     console.log(success);
    // }
}