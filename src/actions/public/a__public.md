Here is where I write some of my thoughts

There should be a SNIP1193 Proposal which contains the list of Starknet RPC Methods and how they are used

Here are some of the Public Methods that have been implemented yet


## Getting Contracts and Block Information

Retrieves information related to contract classes and block details on Starknet.


- [x] starknet_getClassHashAt
- [x] starknet_getStorageAt
- [ ] starknet_getStateUpdate
- [ ] starknet_getBlockWithTxHashes
- [ ] starknet_getBlockWithTxs
- [ ] starknet_getClass
- [ ] starknet_getClassAt


## Transaction Management  

Submit and manage transactions on StarkNet.

- [ ] starknet_addDeployAccountTransaction
- [ ] starknet_addDeclareTransaction
- [ ] starknet_addInvokeTransaction

## Querying Transactions

Retrieve details about specific transactions and their status on the StarkNet chain.

- [ ] starknet_getTransactionByBlockIdAndIndex
- [ ] starknet_getTransactionReceipt
- [ ] starknet_getBlockTransactionCount
- [ ] starknet_getTransactionByHash
- [ ] starknet_pendingTransactions


- [x] starknet_chainId