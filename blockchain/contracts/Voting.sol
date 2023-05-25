// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Squad.sol";
import "./SquadToken.sol";

contract Voting {
    struct Proposal {
        string description;
        uint256 deadline;
        mapping(address => uint256) votes;
        uint256 totalVotes;
        bool executed;
    }

    Squad public squad;
    SquadToken public token;
    Proposal[] public proposals;

    event ProposalCreated(
        uint256 proposalId,
        string description,
        uint256 deadline
    );
    event VoteCast(uint256 proposalId, address voter, uint256 weight);

    constructor(Squad _squad, SquadToken _token) {
        squad = _squad;
        token = _token;
    }

    function createProposal(
        string calldata description,
        uint256 duration
    ) external {
        require(
            token.balanceOf(msg.sender) > 0,
            "Only token holders can create proposals"
        );
        uint256 deadline = block.timestamp + duration;
        proposals.push(Proposal(description, deadline, 0, false));
        emit ProposalCreated(proposals.length - 1, description, deadline);
    }

    function vote(uint256 proposalId) external {
        require(proposalId < proposals.length, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(proposal.votes[msg.sender] == 0, "You have already voted");
        uint256 weight = token.balanceOf(msg.sender);
        require(weight > 0, "Only token holders can vote");
        proposal.votes[msg.sender] = weight;
        proposal.totalVotes += weight;
        emit VoteCast(proposalId, msg.sender, weight);
    }
}
