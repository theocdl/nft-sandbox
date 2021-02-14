// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NFT is ERC1155 {

    uint supply;

    constructor() public ERC1155("https://ipfs.io/ipfs/QmfYyTACYNmFFZGbVoAT24o8pvbw5HfC1WjAeRoSdi1ZdW") {}

    function create(uint _supply) external {
        supply = _supply;
        _mint(msg.sender, 0, _supply * 10 ** 18, "");
    }
}
