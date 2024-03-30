import type { Address } from 'abitype'
import type { Hex, Hash, Felt } from './misc.js'

export type StateMapping = Array<{
  slot: Hex
  value: Hex
}>

export type StateUpdateType = {
    block_hash: Hash
    new_root: Hash
    old_root: Hash
    state_diff: StateDifference
} | {
  old_root: Hash 
  state_diff: StateDifference
}

export type StateDifference = {
  declared_classes: Array<Address>
  deployed_contracts: Array<{
    address: Address
    class_hash: Hash
  }>
  deprecate_declared_classes: Array<Address>
  nonces: Array<{
    contract_address: Address
    nonce: Felt
  }>
  storage_diffs: Array<{
    address: Address
    storage_entries: Array<{
      key: Hex
      value: Hex
    }>
  }>
  replaced_classes: Array<{
    contract_address: Address
    class_hash: Hash
  }>
}