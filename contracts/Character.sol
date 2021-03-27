// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Character is ERC1155, Ownable {

    uint256 public constant Mitsurugi = 0;
    uint256 public constant Siegfried = 1;

    constructor() public ERC1155("https://gateway.pinata.cloud/ipfs/QmSG2yhPzR4YV6473Sgdv8i26H9vCmw2FLNwAUXSmdKokh/Hexarchia/{name}.json")
    {

    }

    function mintOneMitsurugi() onlyOwner() external
    {
        _mint(msg.sender, Mitsurugi, 1, "");
    }

    function mintOneSiegfried() onlyOwner() external
    {
        _mint(msg.sender, Siegfried, 1, "");
    }
}
