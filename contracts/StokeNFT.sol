// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract StokeNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;
    constructor() ERC721("StokeNFT", "NFT") {}

    struct Token {
        uint256 tokenId;
    }
    
     mapping(uint256 => Token) public tokens;

     function totalSupply() public view returns (uint256) {
        return _tokenCounter.current();
    }

    function createToken(uint256 _tokenId, address recipient, string memory tokenURI) public returns (uint256) {
        _tokenCounter.increment();

        uint256 id = _tokenCounter.current();

        _safeMint(recipient, _tokenId);
        _setTokenURI(_tokenId, tokenURI);

        tokens[id] = Token(
            _tokenId
        );

        return _tokenId;
    }

     function statusForToken(uint256 _tokenId) public view returns(bool){
        bool state = false;
        for(uint i = 1; i <= _tokenCounter.current(); i++) {
            if(tokens[i].tokenId == _tokenId) {
                state = true;
            }
        }

       return state;
    }
}