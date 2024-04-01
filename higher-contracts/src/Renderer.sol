// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/utils/Strings.sol";
import "lib/openzeppelin-contracts/contracts/utils/Base64.sol";

/// @title Higherenderer
/// @notice Creates SVG on-chain for higher NFT
/// inspired by UNI: https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/NFTSVG.sol
contract Renderer {
    using Strings for uint256;

    uint256 constant ARROW_SIZE = 64;

    bool[7][7] public configA = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, true, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
    ];

    bool[7][7] public configB = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, true, true, true, false, false],
        [false, false, true, true, true, false, false],
        [false, false, true, true, true, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
    ];

    bool[7][7] public configC = [
        [false, false, false, false, false, false, false],
        [false, false, false, true, false, false, false],
        [false, false, true, true, true, false, false],
        [false, true, true, true, true, true, false],
        [false, false, true, true, true, false, false],
        [false, false, false, true, false, false, false],
        [false, false, false, false, false, false, false]
    ];

    bool[7][7] public configD = [
        [false, false, false, false, false, false, false],
        [false, false, true, true, true, false, false],
        [false, true, true, true, true, true, false],
        [false, true, true, true, true, true, false],
        [false, true, true, true, true, true, false],
        [false, false, true, true, true, false, false],
        [false, false, false, false, false, false, false]
    ];

    bool[7][7] public configE = [
        [false, false, false, true, false, false, false],
        [false, false, true, true, true, false, false],
        [false, true, true, true, true, true, false],
        [true, true, true, true, true, true, true],
        [false, true, true, true, true, true, false],
        [false, false, true, true, true, false, false],
        [false, false, false, true, false, false, false]
    ];

     bool[7][7] public configF = [
        [false, false, true, true, true, false, false],
        [false, true, true, true, true, true, false],
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true],
        [false, true, true, true, true, true, false],
        [false, false, true, true, true, false, false]
    ];

    bool[7][7] public configG = [
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true],
        [true, true, true, true, true, true, false]
    ];

    mapping (uint8 => bool[7][7]) public configs;

    constructor() {
        configs[0] = configA;
        configs[1] = configB;
        configs[2] = configC;
        configs[3] = configD;
        configs[4] = configE;
        configs[5] = configF;
        configs[6] = configG;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        string memory output = generateSVG(tokenId);
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Higher machine #', tokenId.toString(), '", "description": "Higher?", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
        output = string(abi.encodePacked('data:application/json;base64,', json));
        return output;
    }


    function generateSVG(uint256 tokenId) internal view returns (string memory svg) {
        return
            string(
                abi.encodePacked(
                    generateSVGDefs(),
                    generateSVGBody(tokenId),
                    "</svg>"
                )
            );
    }


    function generateSVGDefs() private view returns (string memory svg) {
        svg = string(
            abi.encodePacked(
                "<svg width='448' height='448' viewBox='0 0 448 448' xmlns='http://www.w3.org/2000/svg' shape-rendering='crispEdges'",
                " xmlns:xlink='http://www.w3.org/1999/xlink'>",
                // "<defs>",
                // "<style>",
                // "@import url('https://fonts.googleapis.com/css?family=Inter:400');",
                // "</style>",
                // "</defs>",
                "<rect width='100%' height='100%' rx='8' fill='#000'/>"
            ));
    }



    function generateSVGBody(uint256 tokenId) private view returns (string memory svg) {
        uint256 degree = _getRandomDegree(tokenId);
        uint256 normalizedDegree = 90 - degree;
        string memory color = _mapAngleToColor(degree);
        svg = string(
            abi.encodePacked(
                "<rect width='100%' height='100%' rx='8' fill='",
                 color,
                "'/>",
                generateArrowGrid(normalizedDegree),
                generatePercentageText(normalizedDegree)
            )
        );
    }

    function generateArrow(uint256 x, uint256 y, uint256 degree) private view returns (string memory svg) {
        svg = string(
            abi.encodePacked(
                "<g style='transform: translate(",
                (ARROW_SIZE * x).toString(),
                "px, ",
                (ARROW_SIZE * y + 5).toString(),
                "px);'>",
                "<text x='0' y='0' font-family='Inter' font-size='",
                ARROW_SIZE.toString(),
                "' fill='white' transform='rotate(",
                degree.toString(),
                ")' transform-origin='32px 26px' lengthAdjust='spacingAndGlyphs' textLength='",
                ARROW_SIZE.toString(),
                "' dominant-baseline='hanging'>&#x2191;</text>",
                "</g>"
            )
        );
    }

    function generateArrowGrid(uint256 degree) private view returns (string memory svg) {
        uint8 configIndex = uint8((degree) / 15);
        bool[7][7] memory config = configs[configIndex];

        bytes memory buffer;
        for (uint256 y = 0; y < 7; y++) {
            for (uint256 x = 0; x < 7; x++) {
                if (config[y][x]) {
                    buffer = abi.encodePacked(buffer, generateArrow(x, y, degree));
                }
            }
        }

        return string(buffer);
    }

    function generatePercentageText(uint256 degree) private view returns (string memory svg) {
        svg = string(
            abi.encodePacked(
                "<g style='transform: translate(390px, 390px);'>",
                "<rect x='0' y='0' width='50' height='50' rx='4' fill='#ffffff30' />",
                "<text x='25' y='25' font-family='Inter' font-size='24' fill='white' text-anchor='middle' dominant-baseline='central'>",
                degree.toString(),
                "</text>",
                "</g>"
            )
        );
    }


    /// @notice Get a random degree between 0 and 90
    /// @return uint256 A random uint between 0 and 90
    function _getRandomDegree(uint256 tokenId) private view returns (uint256) {
        // Get the block hash of the previous block

        bytes memory code = abi.encodePacked(
                "HIGHER",
                tokenId.toString(),
                "YEAHBOI"
            );

        // Convert the code to a uint256
        uint256 randomNumber = uint256(keccak256(code));

        // Map the random number to a value between 0 and 360
        uint256 mappedNumber = randomNumber % 91; // Modulus 91 to get a number between 0 and 90

        return mappedNumber;
    }

    /// @notice Map an angle to a color in HSL format
    /// @param degree The angle to map to a color
    /// @return string The color in HSL format
    function _mapAngleToColor(uint256 degree) private pure returns (string memory) {
        uint256 hue;
        uint256 saturation;

        hue = degree * 50 / 90;
        saturation =  60 - (degree / 90) * 25;

        // Convert hue and saturation to color string in HSL format
        return string(abi.encodePacked("hsl(110,", hue.toString(), "%,", saturation.toString(), "%)"));
    }
}
