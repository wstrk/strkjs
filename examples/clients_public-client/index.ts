import { http, createPublicClient, stringify } from 'strkjs'
import { mainnet, sepolia, goerli } from 'strkjs/chains'

const publicClients = [
  createPublicClient({
    chain: mainnet,
    transport: http(
      'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/mUuYKCE9VZg_ouOyAnoYg2vPpKp0RMkY',
    ),
  }),
  createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
  createPublicClient({
    chain: goerli,
    transport: http(
      'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/mUuYKCE9VZg_ouOyAnoYg2vPpKp0RMkY',
    ),
  }),
  // createPublicClient({
  //   chain: polygon,
  //   transport: http(),
  // }),
  // createPublicClient({
  //   chain: optimism,
  //   transport: http(),
  // }),
]

export default await Promise.all(
  publicClients.flatMap(async (client) =>
    [
      `<h2>${client.chain?.name}</h2>`,
      `<div>Current Block Number: ${await client.getChainId()}</div>`,
      `<div>Client: <pre><code>${stringify(
        client,
        null,
        2,
      )}</code></pre></div>`,
    ].join('\n'),
  ),
)
