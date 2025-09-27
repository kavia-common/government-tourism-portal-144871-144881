export const chainIds = new Map();
/**
 * chainIds: Map<touristId, { network: string, txHash: string, tokenId: string, issuedAt: ISO }>
 */

export function saveChainId(touristId, record) {
  chainIds.set(touristId, record);
  return record;
}

export function getChainId(touristId) {
  return chainIds.get(touristId);
}
