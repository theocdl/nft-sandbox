// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Character is ERC1155, Ownable {

    uint256 public constant CHARACTER = 0;

    constructor() public ERC1155("https://ipfs.io/ipfs/QmQu7BGGQpyi7VTuHjtK5tQdWobF9iYenscLetgZqF3npj")
    {

    }

    function create() onlyOwner() external
    {
        _mint(msg.sender, CHARACTER, 1, "");
    }
}
