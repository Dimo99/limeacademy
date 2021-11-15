// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the ownercl");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}
