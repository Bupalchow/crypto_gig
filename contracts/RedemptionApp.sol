// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RedemptionApp is Ownable {
    address public skateGateway;
    IERC20 public rewardToken;
    mapping(uint256 => bool) public executedIntents;

    event Redeemed(address indexed user, uint256 amount, uint256 chainId);

    constructor(address _skateGateway, address _rewardToken) {
        skateGateway = _skateGateway;
        rewardToken = IERC20(_rewardToken);
    }

    function setSkateGateway(address _skateGateway) external onlyOwner {
        skateGateway = _skateGateway;
    }

    function executeIntent(uint256 _intentId, address _user, bytes calldata _intentData) external {
        require(msg.sender == skateGateway, "Only Skate Gateway can execute intents");
        require(!executedIntents[_intentId], "Intent already executed");

        (uint256 chainId, uint256 amount) = abi.decode(_intentData, (uint256, uint256));

        require(rewardToken.balanceOf(address(this)) >= amount, "Insufficient rewards balance");
        require(rewardToken.transfer(_user, amount), "Reward transfer failed");

        executedIntents[_intentId] = true;
        emit Redeemed(_user, amount, chainId);
    }

    function withdrawToken(IERC20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Transfer failed");
    }
}
