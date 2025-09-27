import { getDigitalTouristId } from '../services/blockchain.service.js';

// PUBLIC_INTERFACE
export async function handleGetDigitalId(req, res, next) {
  /**
   summary: Get Digital Tourist ID (Simulated)
   description: Returns the simulated blockchain record for a tourist (if minted).
   params: { touristId }
   returns: { network, tokenId, txHash, issuedAt } | null
  */
  try {
    const { touristId } = req.params;
    const data = getDigitalTouristId({ touristId });
    res.json(data);
  } catch (err) {
    next(err);
  }
}
