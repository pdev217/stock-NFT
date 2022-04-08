// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract StokeNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721("StokeNFT", "NFT") {}

    //get the current supply of tokens
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function createToken(uint256 tokenId, address recipient, string memory tokenURI) public returns (uint256) {
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}