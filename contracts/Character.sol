// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Character is ERC1155, Ownable {

    uint256 public constant SIEGFRIED = 0;
    uint256 public constant MITSURUGI = 1;

    event Minted(uint256 indexed name, uint256 indexed amount);

    constructor() public ERC1155("https://ipfs.io/ipfs/QmUeLh7mVrkFujCxHNL7AGhoWkNVfb2DZBxDQ4zFSHchdJ/{id}.json")
    {

    }

    function mintOneSiegfried(uint256 _amount) onlyOwner() external
    {
        _mint(msg.sender, SIEGFRIED, _amount, "");
        emit Minted(SIEGFRIED, _amount);
    }

    function mintOneMitsurugi(uint256 _amount) onlyOwner() external
    {
        _mint(msg.sender, MITSURUGI, _amount, "");
        emit Minted(MITSURUGI, _amount);

    }
}
