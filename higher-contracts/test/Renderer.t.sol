// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {console2, Test} from "forge-std/Test.sol";
import {Renderer} from "../src/Renderer.sol";

contract RendererTest is Test {
    Renderer public renderer;

    function setUp() public {
        // replace with proplot contract
        renderer = new Renderer();
    }

    function test_generateSVG() public {
        vm.roll(100);
        string memory b64 = renderer.tokenURI(1);
        console2.log(b64);
    }
}
