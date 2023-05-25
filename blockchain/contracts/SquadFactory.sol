// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Squad.sol";
import "./SquadToken.sol";
import "./TokenVesting.sol";

contract SquadFactory {
    event SquadCreated(
        address squadAddress,
        address leader,
        string name,
        address squadTokenAddress
    );

    mapping(address => address) public squadToToken;
    mapping(address => TokenVesting) public memberToVesting;
    address[] public squads;

    function createSquad(
        string calldata name,
        string calldata tokenSymbol,
        uint256 initialTokenSupply
    ) external {
        Squad newSquad = new Squad(msg.sender, name);
        SquadToken newSquadToken = new SquadToken(
            name,
            tokenSymbol,
            initialTokenSupply
        );

        emit SquadCreated(
            address(newSquad),
            msg.sender,
            name,
            address(newSquadToken)
        );

        squads.push(address(newSquad));
        squadToToken[address(newSquad)] = address(newSquadToken);
    }

    function addMemberWithVesting(
        address squadAddress,
        address memberAddress,
        uint256 releaseTime
    ) external {
        require(
            msg.sender == Squad(squadAddress).leader(),
            "Only the leader can add members"
        );

        Squad(squadAddress).addMember(memberAddress);
        SquadToken token = SquadToken(squadToToken[squadAddress]);
        TokenVesting newVesting = new TokenVesting(
            token,
            memberAddress,
            releaseTime
        );
        token.transfer(address(newVesting), token.balanceOf(address(this)));
        memberToVesting[memberAddress] = newVesting;
    }

    function getAllSquads() public view returns (address[] memory) {
        return squads;
    }
}
