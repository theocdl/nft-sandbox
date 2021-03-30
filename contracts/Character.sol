// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Character is ERC1155, Ownable {
    address public dai;
    address public beneficiary;
    uint256 public constant EMPEROR = 0;
    uint256 public constant PHARAOH = 1;
    uint256 public constant SHOGUN = 2;

    uint public emperorSupply;
    uint public pharaohSupply;
    uint public shogunSupply;


    event Minted(uint256 indexed name, uint256 indexed amount);

    constructor(address _dai, address _beneficiary) public ERC1155("https://ipfs.io/ipfs/QmUS2WzBGhX6saW3NhkwBrxKBU5SE8fUHM8o7FfEdkrKbc/{id}.json")
    {
        dai = _dai;
        beneficiary = _beneficiary;
        emperorSupply = 2000;
        pharaohSupply = 2000;
        shogunSupply = 2000;
    }

    function buyEmperor(uint256 _amount) external
    {
        uint256 amount = _amount;
        uint256 price = amount * 1000000000000000000 * 50;

        require(
            emperorSupply > 0,
            "There is no more Emperor !"
        );

        require(
            amount < emperorSupply,
            "You ask to much Emperor !"
        );

        IERC20(dai).transferFrom(msg.sender, beneficiary, price);

        _mint(msg.sender, EMPEROR, amount, "");
        emperorSupply -= amount;
        emit Minted(EMPEROR, amount);
    }

    function buyPharaoh(uint256 _amount) external
    {
        uint256 amount = _amount;
        uint256 price = amount * 1000000000000000000 * 50;

        require(
            pharaohSupply > 0,
            "There is no more Pharaoh !"
        );

        require(
            amount < pharaohSupply,
            "You ask to much Pharaoh !"
        );

        IERC20(dai).transferFrom(msg.sender, beneficiary, price);

        _mint(msg.sender, PHARAOH, amount, "");
        pharaohSupply -= amount;
        emit Minted(PHARAOH, amount);
    }

    function buyShogun(uint256 _amount) external
    {
        uint256 amount = _amount;
        uint256 price = amount * 1000000000000000000 * 50;
        require(
            shogunSupply > 0,
            "There is no more Shogun !"
        );

        require(
            amount < shogunSupply,
            "You ask to much Shogun !"
        );

        IERC20(dai).transferFrom(msg.sender, beneficiary,price);

        _mint(msg.sender, SHOGUN, amount, "");
        shogunSupply -= amount;
        emit Minted(SHOGUN, amount);
    }
}
