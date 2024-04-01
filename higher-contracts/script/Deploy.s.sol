// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { Script } from "forge-std/Script.sol";
import { HigherLotteryTicket } from "../src/HigherLottery.sol";
import { Renderer } from "../src/Renderer.sol";

/// -----------------
/// SCRIPTS
/// -----------------
// forge script script/Deploy.s.sol:Deploy --fork-url http://localhost:8545 --broadcast --private-key $PRIVATE_KEY_1

/// -----------------
/// FINAL CONTRACT ADDRESSES
/// -----------------
/// renderer = 0xc5a5C42992dECbae36851359345FE25997F5C42d
/// nft = 0x67d269191c92Caf3cD7723F116c85e6E9bf55933

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();
        Renderer renderer = new Renderer();
        HigherLotteryTicket nft = new HigherLotteryTicket(address(renderer));
        vm.stopBroadcast();
    }
}
