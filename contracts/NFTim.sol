// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "./ERC721Identifier/ERC721Identifier.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTim is ERC721Identifier, Ownable {
    struct Data {
        string name;
        string surname1;
        string surname2;
        uint256 id;
        address addr;
    }

    uint256 tokenCounter;

    mapping(uint256 => Data) public members;
    mapping(address => uint256) public addr_id;

    constructor() ERC721Identifier("NFTim", "TIM") {
        tokenCounter = 0;
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`, but only the owner of this contract is able to do it.
     * This function calls the internal function _mint from ERC721Identifier.sol
     */
    function mint(
        string memory _name,
        string memory _surname1,
        string memory _surname2,
        address to
    ) external onlyOwner {
        require(addr_id[to] == 0, "This address already has an identity");
        tokenCounter = tokenCounter + 1;
        addr_id[to] = tokenCounter;
        members[tokenCounter] = Data(
            _name,
            _surname1,
            _surname2,
            tokenCounter,
            to
        );
        _mint(to, tokenCounter);
    }

    /**
     * @dev Destroys `tokenId`, but only the owner of this contract is able to do it.
     * This function calls the internal function _burn from ERC721Identifier.sol
     */

    function burn(uint256 tokenId) external onlyOwner {
        delete members[tokenId];
        _burn(tokenId);
    }
}
