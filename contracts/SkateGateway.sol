// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SkateGateway is Ownable {
    mapping(address => bool) public registeredApps;
    mapping(uint256 => Intent) public intents;
    uint256 public nextIntentId = 1;

    struct Intent {
        address user;
        address app;
        bytes intentData;
        bool executed;
    }

    event IntentCreated(uint256 indexed intentId, address indexed user, address indexed app, bytes intentData);
    event IntentExecuted(uint256 indexed intentId);

    function registerApp(address _app) external onlyOwner {
        registeredApps[_app] = true;
    }

    function createIntent(address _app, bytes calldata _intentData) external payable returns (uint256) {
        require(registeredApps[_app], "App not registered");
        
        uint256 intentId = nextIntentId;
        intents[intentId] = Intent({
            user: msg.sender,
            app: _app,
            intentData: _intentData,
            executed: false
        });

        nextIntentId++;

        emit IntentCreated(intentId, msg.sender, _app, _intentData);

        return intentId;
    }

    function executeIntent(uint256 _intentId) external {
        Intent storage intent = intents[_intentId];
        require(!intent.executed, "Intent already executed");
        require(registeredApps[intent.app], "App not registered");
        (bool success, ) = intent.app.call(abi.encodeWithSignature("executeIntent(uint256,address,bytes)", _intentId, intent.user, intent.intentData));
        require(success, "Intent execution failed");

        intent.executed = true;
        emit IntentExecuted(_intentId);
    }
    function withdrawToken(IERC20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Transfer failed");
    }
}
