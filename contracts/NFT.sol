// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155, Ownable {

    uint256 public constant RUNNER = 0;

    constructor() public ERC1155("https://ipfs.io/ipfs/QmaP3Te1XuMQQbRw9FCQM93x9SUysquYfNi7FokmgzEiCX")
    {

    }

    function create() onlyOwner() external
    {

        _mint(msg.sender, RUNNER, 1, "");
    }
}
