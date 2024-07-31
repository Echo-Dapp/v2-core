pragma solidity =0.5.16;

import './UniswapV2Factory.sol';

contract EchoSwapFactory is UniswapV2Factory {
    address[] public uniqueTokens;
    mapping(address => bool) private tokenRegistered;

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS');
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);

        if (!tokenRegistered[token0]) {
            allPairs.push(pair);
            tokenRegistered[token0] = true;
        }
        if (!tokenRegistered[token1]) {
            allPairs.push(pair);
            tokenRegistered[token1] = true;
        }

        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        uniqueTokens.push(token0);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function uniqueTokensLength() external view returns (uint256) {
        return uniqueTokens.length;
    }
}
