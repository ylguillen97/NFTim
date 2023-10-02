// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IERC721Identifier is IERC165 {
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function approve(address to, uint256 tokenId) external;

    function getApproved(
        uint256 tokenId
    ) external view returns (address operator);
}
