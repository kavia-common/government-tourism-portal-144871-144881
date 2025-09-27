import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { saveChainId, getChainId } from '../models/blockchain.store.js';
dotenv.config();

// PUBLIC_INTERFACE
export function mintDigitalTouristId({ tourist }) {
  /**
   Simulates a blockchain mint action for a Digital Tourist ID.
   Returns a tokenId and txHash along with network metadata.
  */
  const network = process.env.BLOCKCHAIN_NETWORK || 'polygon-mumbai';
  const tokenId = uuidv4().replace(/-/g, '').slice(0, 16);
  const txHash = '0x' + uuidv4().replace(/-/g, '');
  const issuedAt = new Date().toISOString();

  const record = { network, tokenId, txHash, issuedAt };
  saveChainId(tourist.id, record);
  return record;
}

// PUBLIC_INTERFACE
export function getDigitalTouristId({ touristId }) {
  /** Returns the simulated on-chain record for a tourist, if any. */
  return getChainId(touristId) || null;
}
