// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PollRegistry {
    address[] public pollContracts;

    event PollCreated(address indexed pollContract, string title, address owner);

    function createPoll(string memory pollTitle) public {
        Vote newPoll = new Vote(pollTitle, msg.sender);
        pollContracts.push(address(newPoll));
        emit PollCreated(address(newPoll), pollTitle, msg.sender);
    }

    function getPollContracts() public view returns (address[] memory) {
        return pollContracts;
    }
}

contract Vote {
    struct Candidate {
        uint voteCount;
        string name;
        string imageURL;
    }

    string public title;
    Candidate[] public candidates;
    address public owner;

    // Mapping to track whether an address has voted
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint indexed candidateId, string name, string imageURL, uint voteCount);
    event Voted(address indexed voter, uint indexed candidateId);

    constructor(string memory pollTitle, address _owner) {
        title = pollTitle;
        owner = _owner;
    }

    function addCandidate(string memory name, string memory imageURL) public {
        require(msg.sender == owner, "Only the owner can add candidates");
        candidates.push(Candidate(0, name, imageURL));
        uint candidateId = candidates.length - 1;
        emit CandidateAdded(candidateId, name, imageURL, 0);
    }

    function vote(uint candidateId) public {
        require(candidateId >= 0 && candidateId < candidates.length, "Invalid candidate ID");
        require(msg.sender != owner, "Owner cannot vote");
        require(!hasVoted[msg.sender], "You have already voted");
        require(candidates[candidateId].voteCount + 1 > candidates[candidateId].voteCount, "Overflow error"); // Protect against overflow
        candidates[candidateId].voteCount++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, candidateId);
    }
}
