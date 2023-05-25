// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Squad.sol";

contract RevenueShare is ReentrancyGuard {
    IERC20 public token;
    Squad public squad;
    mapping(address => uint256) public lastClaim;

    constructor(IERC20 _token, Squad _squad) {
        token = _token;
        squad = _squad;
    }

    function deposit(uint256 amount) external {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
    }

    function claim() external nonReentrant {
        require(squad.isMember(msg.sender), "Only squad members can claim");

        uint256 totalSupply = token.balanceOf(address(this));
        uint256 totalMembers = squad.memberCount();
        uint256 memberShare = totalSupply / totalMembers;

        lastClaim[msg.sender] = block.timestamp;
        require(
            token.transfer(msg.sender, memberShare),
            "Token transfer failed"
        );
    }
}
