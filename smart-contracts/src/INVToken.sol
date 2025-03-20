// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract INVToken is ERC20, Ownable, Pausable {
    mapping(address => uint256) private _stakedBalance;
    mapping(address => uint256) private _stakingTimestamp;
    
    uint256 public constant STAKING_PERIOD = 30 days;
    uint256 public constant REWARD_RATE = 5; // 5% APR

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor() ERC20("Inversion Token", "INV") {
        // Initial supply: 100 million tokens
        _mint(msg.sender, 100000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function stake(uint256 amount) public whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _stakedBalance[msg.sender] += amount;
        _stakingTimestamp[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), amount);

        emit Staked(msg.sender, amount);
    }

    function unstake() public whenNotPaused {
        require(_stakedBalance[msg.sender] > 0, "No staked tokens");
        require(
            block.timestamp >= _stakingTimestamp[msg.sender] + STAKING_PERIOD,
            "Staking period not completed"
        );

        uint256 stakedAmount = _stakedBalance[msg.sender];
        uint256 reward = calculateReward(msg.sender);

        _stakedBalance[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);

        emit Unstaked(msg.sender, stakedAmount);
        emit RewardPaid(msg.sender, reward);
    }

    function calculateReward(address account) public view returns (uint256) {
        uint256 timeStaked = block.timestamp - _stakingTimestamp[account];
        return (_stakedBalance[account] * REWARD_RATE * timeStaked) / (365 days * 100);
    }

    function stakedBalance(address account) public view returns (uint256) {
        return _stakedBalance[account];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
} 