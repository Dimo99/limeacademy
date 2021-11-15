// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract USElection is Ownable {
    uint8 public constant BIDEN = 1;
    uint8 public constant TRUMP = 2;

    bool public electionEnded;

    mapping(uint8 => uint8) public seats;
    mapping(string => bool) public resultsSubmited;

    struct StateResult {
        string name;
        uint votesBiden;
        uint votesTrump;
        uint8 stateSeats;
    }
    
    event LogStateResult(uint8 winner, uint8 stateSeats, string state);
    event LogElectionEnded(uint winner);
    
    modifier onlyActiveElection() {
        require(!electionEnded, "The election has ended already");
        _;
    }

    function submitStateResult(StateResult calldata result) public onlyActiveElection onlyOwner {
        require(result.stateSeats > 0, "States must have at least 1 seat");
        require(result.votesBiden != result.votesTrump, "There could not be tie");
        require(!resultsSubmited[result.name], "This state result was already submitted!");

        uint8 winner;
        if(result.votesBiden > result.votesTrump) {
            winner = BIDEN;
        } else {
            winner = TRUMP;
        }
        
        seats[winner] += result.stateSeats;
        resultsSubmited[result.name] = true;
        
        emit LogStateResult(winner, result.stateSeats, result.name);
    }

    function currentLeader() public view returns(uint8) {
        if(seats[BIDEN] > seats[TRUMP]) {
            return BIDEN;
		}

		if(seats[TRUMP] > seats[BIDEN]) {
		    return TRUMP;
		}
		    
		return 0;
    }

    function endElection() public onlyOwner {
        electionEnded = true;
        emit LogElectionEnded(currentLeader());
    }
}