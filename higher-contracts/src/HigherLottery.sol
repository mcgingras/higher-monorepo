// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IWETH} from "./interfaces/IWeth.sol";
import {IV3SwapRouter} from "./interfaces/IV3SwapRouter.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";


contract HigherLotteryTicket is ERC721Enumerable {
    address public owner;
    address public renderer;
    uint256 public lotteriesClaimed;
    uint256 public constant PRICE = 0.000777 ether;
    uint256 public constant LOTTERY_ROUND_SIZE = 2;
    address public HIGHER_TOKEN_ADDRESS = 0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe;
    address public WETH_TOKEN_ADDRESS = 0x4200000000000000000000000000000000000006;
    address public V2_SWAP_ROUTER_ADDRESS = 0x2626664c2603336E57B271c5C0b26F421741e481;

    constructor(address _renderer) ERC721("Higher Lottery", "HIGHER") {
        owner = msg.sender;
        renderer = _renderer;
    }

    function mint() external payable {
        require(msg.value == PRICE, "HigherLottery: invalid price");
        _safeMint(msg.sender, totalSupply());
    }

    function batchMint(uint256 _amount) external payable {
        require(msg.value == PRICE * _amount, "HigherLottery: invalid price");
        for (uint256 i = 0; i < _amount; i++) {
            _safeMint(msg.sender, totalSupply());
        }
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        return IRenderer(renderer).tokenURI(tokenId);
    }

    function canDrawWinner() internal view returns (bool) {
        return totalSupply() >= LOTTERY_ROUND_SIZE * (lotteriesClaimed + 1);
    }

    function drawWinner() external {
        require(canDrawWinner(), "HigherLottery: cannot draw yet");
        uint256 amountIn = PRICE * LOTTERY_ROUND_SIZE;
        address winner = _drawWinner();

        // weth transfers
        IWETH(WETH_TOKEN_ADDRESS).deposit{value: amountIn}();
        IWETH(WETH_TOKEN_ADDRESS).approve(address(V2_SWAP_ROUTER_ADDRESS), amountIn);

        // swap
        _tokenSwap(amountIn, winner);

        // update number cli
        lotteriesClaimed++;
    }

    function _tokenSwap(uint256 amount, address recipient) internal {
        uint24 poolFee = 10000; // highest fee -- this is what the pool is charging

        IV3SwapRouter.ExactInputSingleParams memory params =
            IV3SwapRouter.ExactInputSingleParams({
                tokenIn: WETH_TOKEN_ADDRESS,
                tokenOut: HIGHER_TOKEN_ADDRESS,
                fee: poolFee,
                recipient: recipient,
                amountIn: amount,
                amountOutMinimum: 0, // todo: fix
                sqrtPriceLimitX96: 0 // todo: fix
            });

        // The call to `exactInputSingle` executes the swap.
        uint256 amountOut = IV3SwapRouter(V2_SWAP_ROUTER_ADDRESS).exactInputSingle(params);
    }

}
