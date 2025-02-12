// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HospitalReferral {
    struct Hospital {
        string name;
        uint256 availableBeds;
        bool registered;
    }

    mapping(address => Hospital) public hospitals;
    address[] public hospitalList;

    event HospitalRegistered(
        address indexed hospital,
        string name,
        uint256 availableBeds
    );
    event BedsUpdated(address indexed hospital, uint256 newBedCount);

    function registerHospital(
        string memory _name,
        uint256 _availableBeds
    ) public {
        require(!hospitals[msg.sender].registered, "Already registered");

        hospitals[msg.sender] = Hospital(_name, _availableBeds, true);
        hospitalList.push(msg.sender);

        emit HospitalRegistered(msg.sender, _name, _availableBeds);
    }

    function updateBeds(uint256 _availableBeds) public {
        require(hospitals[msg.sender].registered, "Not registered");

        hospitals[msg.sender].availableBeds = _availableBeds;
        emit BedsUpdated(msg.sender, _availableBeds);
    }

    function getHospitals() public view returns (address[] memory) {
        return hospitalList;
    }

    function getHospitalData(
        address _hospital
    ) public view returns (string memory, uint256) {
        require(hospitals[_hospital].registered, "Hospital not found");
        return (hospitals[_hospital].name, hospitals[_hospital].availableBeds);
    }
}
