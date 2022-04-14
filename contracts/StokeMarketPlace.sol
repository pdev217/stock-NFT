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

    constructor() {
        marketowner = payable(msg.sender);
    }

    modifier onlyByOwner {
        require(msg.sender == marketowner, "You are not an owner of Marketplace.");
        _;
    }
    function acceptOffer(
        address _token,
        address _sender,
        uint256 _amount,
        uint256 _expiresAt,
        address _nftContract,
        uint256 _tokenId,
        string memory _tokenURI
    ) public nonReentrant {

        require(_expiresAt >= block.timestamp, "Marketplace: the offer expired");

        //calc service fee - 2.5%
        uint marketFeePercentage = 25;
        uint commissionDenominator  = 1000;
        uint serviceFee = _amount * marketFeePercentage / commissionDenominator;

        require(IERC20(_token).allowance(_sender, address(this)) == _amount, "insufficient amount");
        IERC20(_token).transferFrom(_sender, msg.sender, (_amount-serviceFee));
        IERC20(_token).transferFrom(_sender, marketowner, serviceFee);

        (bool success, bytes memory result) = _nftContract.call(abi.encodeWithSignature("createToken(uint256,address,string)", _tokenId, _sender, _tokenURI));
        
        console.log(success);
    }
}