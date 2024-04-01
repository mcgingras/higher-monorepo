// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface IWETH {
    function deposit() external payable;
    function approve(address spender, uint256 amount) external returns (bool);
}
