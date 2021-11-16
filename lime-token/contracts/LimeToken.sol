// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma abicoder v2;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract LimeToken is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("LimeToken", "LMT") {}
}
