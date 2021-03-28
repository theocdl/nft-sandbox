// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Character is ERC1155, Ownable {
    address public dai;
    address public beneficiary ;
    uint256 public constant SIEGFRIED = 0;
    uint256 public constant MITSURUGI = 1;
    uint public supplySiegfried;
    uint public supplyMitsurugi;
    uint public supplySiegfriedMax;
    uint public supplyMitsurugiMax;

    event Minted(uint256 indexed name, uint256 indexed amount);

    constructor(address _dai, address _beneficiary) public ERC1155("https://ipfs.io/ipfs/QmUeLh7mVrkFujCxHNL7AGhoWkNVfb2DZBxDQ4zFSHchdJ/{id}.json")
    {
        dai = _dai;
        beneficiary = _beneficiary;
    }

    function buySiegfried(uint256 _amount)  external
    {
        uint256 amount = _amount;

        require(
            supplySiegfried < supplySiegfriedMax,
            "There is no more Siegfried !"
        );

        require(
            supplySiegfried + amount <= supplySiegfriedMax,
            "There is no more Siegfried !"
        );

        IERC20(dai).transferFrom(msg.sender, beneficiary, amount);

        _mint(msg.sender, SIEGFRIED, amount, "");
        supplySiegfried += 1;
        emit Minted(SIEGFRIED, amount);
    }

    function buyMitsurugi(uint256 _amount)  external
    {
        uint256 amount = _amount;

        require(
            supplyMitsurugi < supplyMitsurugiMax,
            "There is no more Mitsurugi !"
        );

        require(
            supplyMitsurugi + amount <= supplyMitsurugiMax,
            "You ask to much Mitsurugi !"
        );

        IERC20(dai).transferFrom(msg.sender, beneficiary, amount);

        _mint(msg.sender, MITSURUGI, amount, "");
        supplyMitsurugi += 1;
        emit Minted(MITSURUGI, amount);

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

    function supplyOfItem(uint _supplySiegfriedMax, uint _supplyMitsurugiMax) onlyOwner() external
    {
        supplySiegfriedMax = _supplySiegfriedMax;
        supplyMitsurugiMax = _supplyMitsurugiMax;
    }
}
