// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Game is ERC1155, Ownable {

    uint public id = 0;
    string public name;
    uint  public supply;
    uint  public tokenID;

    event Won(address indexed addr, uint indexed idTo);

    constructor() public ERC1155("https://ipfs.io/ipfs/QmNTGqMcWctH7uGNsfHEyqLAEGmYtmCCZQwvpNFHBub6V3")

    {
        name = "Soul Edge";
        supply = 1;
        tokenID = 0;
    }

    struct winner
    {

        address player;
        bool claimed;
        bool won;

    }

    mapping(uint => winner) public winners;


    function whitelistWinner(address _winner) external onlyOwner {

        //if the person wins the game, he can access this function which allows to claim the reward.

        id += 1;
        winners[id].won = true;
        winners[id].claimed = false;
        winners[id].player = _winner;

    }

    function claimReward() public {

        uint numW;

        for (uint i = 1; i <= id; i++) {
            if (msg.sender == winners[i].player) {
                numW = i;
                break;
            }
        }

        require(
            winners[numW].claimed == false,
            "You have already collected your reward"
        );

        require(
            winners[numW].won == true,
            "You didn't won the game"
        );

        _mint(msg.sender, tokenID, supply, "");

        emit Won(winners[numW].player, tokenID);

        winners[numW].won = false;
        winners[numW].claimed = true;

    }

    function getToRecoverItsGain() public view returns (bool){

        uint numW;
        for (uint i = 1; i <= id; i++) {
            if (msg.sender == winners[i].player) {
                numW = i;
                break;
            }
        }
        return winners[numW].claimed;
    }

    function getWin() public view returns (bool){

        uint numW;
        for (uint i = 1; i <= id; i++) {
            if (msg.sender == winners[i].player) {
                numW = i;
                break;
            }
        }
        return winners[numW].won;
    }
}