import type { Address } from 'abitype'
import type { 
    Quantity,
    RpcBlockNumber as BlockNumber,
    RpcBlockIdentifier as BlockIdentifier, 
} from './rpc.js'

import type { BlockTag } from './block.js'
import type { Hash, Felt } from './misc.js'
import type { Prettify } from './utils.js'
import type { StateUpdateType } from '../types/stateUpdate.js'



//////////////////////////////////////////////////
// Provider

export type SNIP1474Methods = [...PublicRpcSchema, ...WalletRpcSchema]

export type SNIP1193Provider = Prettify<
  SNIP1193Events & {
    request: SNIP1193RequestFn<SNIP1474Methods>
  }
>

//////////////////////////////////////////////////
// Errors

export type ProviderRpcErrorType = ProviderRpcError & {
  name: 'ProviderRpcError'
}

export class ProviderRpcError extends Error {
  code: number
  details: string

  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.details = message
  }
}

//////////////////////////////////////////////////
// Provider Events

export type ProviderConnectInfo = {
  chainId: string
}

export type ProviderMessage = {
  type: string
  data: unknown
}

export type SNIP1193EventMap = {
  accountsChanged(accounts: Address[]): void
  chainChanged(chainId: string): void
  connect(connectInfo: ProviderConnectInfo): void
  disconnect(error: ProviderRpcError): void
  message(message: ProviderMessage): void
}

export type SNIP1193Events = {
  on<TEvent extends keyof SNIP1193EventMap>(
    event: TEvent,
    listener: SNIP1193EventMap[TEvent],
  ): void
  removeListener<TEvent extends keyof SNIP1193EventMap>(
    event: TEvent,
    listener: SNIP1193EventMap[TEvent],
  ): void
}


export type PublicRpcSchema = [

    // Getting Contract and Block Information

    /**
     * @description Returns the class hash associated with a contract address
     * @example
     * provider.request({ method: 'starknet_getClassHashAt' })
     * // => ''
     */
    {
        Method: 'starknet_getClassHashAt'
        Parameters: [
            address: Address,
            block: BlockNumber | BlockTag | BlockIdentifier
        ]
        ReturnType: Hash
    },

    /**
     * @description Returns the value from a storage position at an address
     * @example
     * provider.request({ method: 'starknet_getStorageAt', params: ['0x...', '0x...', 'latest'] })
     * // => '0x...'
     */
    {
        Method: 'starknet_getStorageAt'
        Parameters: [
            address: Felt,
            index: Felt,
            block: BlockNumber | BlockTag | BlockIdentifier
        ]
        ReturnType: Felt
    },

    /**
     * @description Returns the information about the state update of the requested block
     * @example
     * provider.request({ method: 'starknet_getStorageAt', params: ['0x...', '0x...', 'latest'] })
     * // => '0x...'
     */
    {
        Method: 'starknet_getStateUpdate'
        Parameters: [
            block: BlockNumber | BlockTag | BlockIdentifier
        ]
        ReturnType: StateUpdateType
    },




    /**
     * @description Returns the chain ID associated with the current network
     * @example
     * provider.request({ method: 'starknet_chainid' })
     * // => ''
     */
    {
        Method: 'starknet_chainId'
        Parameters?: undefined
        ReturnType: Quantity
    }
]

export type WalletRpcSchema = [

]

export type TestRpcSchema<TMode extends string> = [

]



///////////////////////////////////////////////////////////////////////////
// Utils

export type RpcSchema = readonly {
  Method: string
  Parameters?: unknown
  ReturnType: unknown
}[]

export type RpcSchemaOverride = Omit<RpcSchema[number], 'Method'>

export type SNIP1193Parameters<
  TRpcSchema extends RpcSchema | undefined = undefined,
> = TRpcSchema extends RpcSchema
  ? {
      [K in keyof TRpcSchema]: Prettify<
        {
          method: TRpcSchema[K] extends TRpcSchema[number]
            ? TRpcSchema[K]['Method']
            : never
        } & (TRpcSchema[K] extends TRpcSchema[number]
          ? TRpcSchema[K]['Parameters'] extends undefined
            ? { params?: never }
            : { params: TRpcSchema[K]['Parameters'] }
          : never)
      >
    }[number]
  : {
      method: string
      params?: unknown
    }


export type SNIP1193RequestOptions = {
  // The base delay (in ms) between retries.
  retryDelay?: number
  // The max number of times to retry.
  retryCount?: number
}

type DerivedRpcSchema<
  TRpcSchema extends RpcSchema | undefined,
  TRpcSchemaOverride extends RpcSchemaOverride | undefined,
> = TRpcSchemaOverride extends RpcSchemaOverride
  ? [TRpcSchemaOverride & { Method: string }]
  : TRpcSchema




export type SNIP1193RequestFn<
  TRpcSchema extends RpcSchema | undefined = undefined,
> = <
  TRpcSchemaOverride extends RpcSchemaOverride | undefined = undefined,
  TParameters extends SNIP1193Parameters<
    DerivedRpcSchema<TRpcSchema, TRpcSchemaOverride>
  > = SNIP1193Parameters<DerivedRpcSchema<TRpcSchema, TRpcSchemaOverride>>,
  _ReturnType = DerivedRpcSchema<
    TRpcSchema,
    TRpcSchemaOverride
  > extends RpcSchema
    ? Extract<
        DerivedRpcSchema<TRpcSchema, TRpcSchemaOverride>[number],
        { Method: TParameters['method'] }
      >['ReturnType']
    : unknown,
>(
  args: TParameters,
  options?: SNIP1193RequestOptions,
) => Promise<_ReturnType>
