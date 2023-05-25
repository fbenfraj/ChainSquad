// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Squad {
    struct Member {
        address memberAddress;
        bool isActive;
    }

    string public name;
    mapping(address => bool) public leaders;
    mapping(address => Member) public members;

    event MemberAdded(address memberAddress);
    event MemberRemoved(address memberAddress);
    event LeaderAdded(address newLeader);
    event LeaderRemoved(address oldLeader);

    modifier onlyLeader() {
        require(
            leaders[msg.sender] == true,
            "Only leader can call this function"
        );
        _;
    }

    constructor(address _leader, string memory _name) {
        name = _name;
        members[_leader] = Member(_leader, true);
        leaders[_leader] = true;
        emit LeaderAdded(_leader);
    }

    function addMember(address _memberAddress) public onlyLeader {
        members[_memberAddress] = Member(_memberAddress, true);
        emit MemberAdded(_memberAddress);
    }

    function removeMember(address _memberAddress) public onlyLeader {
        delete members[_memberAddress];
        emit MemberRemoved(_memberAddress);
    }

    function isMember(address _memberAddress) public view returns (bool) {
        return members[_memberAddress].isActive;
    }

    function addLeader(address newLeader) public onlyLeader {
        require(
            members[newLeader].isActive,
            "New leader must be an active member"
        );
        leaders[newLeader] = true;
        emit LeaderAdded(newLeader);
    }

    function removeLeader(address leaderToRemove) public onlyLeader {
        require(
            leaderToRemove != msg.sender,
            "Leader cannot remove themselves"
        );
        require(leaders[leaderToRemove] == true, "Address is not a leader");
        leaders[leaderToRemove] = false;
        emit LeaderRemoved(leaderToRemove);
    }
}
