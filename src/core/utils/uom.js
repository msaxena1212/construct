'use strict';

/**
 * Units of measure and the quantity policy that goes with them.
 *
 * - A transfer line must use the material's own UOM. There is no conversion between UOMs, so a mismatch is rejected.
 * - `fractional: false` UOMs accept whole numbers only. A fraction is rejected, never rounded or truncated.
 * - `fractional: true` UOMs are recognised, but stock counters are still whole-unit integers, so fractional
 *   movements are refused with PRECISION_UNSUPPORTED until the counters move to exact decimals (a separate,
 *   approved migration). This keeps stock conservation exact without silent truncation.
 */
const UOM = Object.freeze({
  units: { group: 'count', fractional: false },
  nos: { group: 'count', fractional: false },
  pcs: { group: 'count', fractional: false },
  bags: { group: 'count', fractional: false },
  kg: { group: 'mass', fractional: true },
  tonne: { group: 'mass', fractional: true },
  litre: { group: 'volume', fractional: true },
  m3: { group: 'volume', fractional: true },
  m2: { group: 'area', fractional: true },
  m: { group: 'length', fractional: true },
});

const DEFAULT_UOM = 'units';

/** Normalizes a stored or submitted UOM. Empty values mean the legacy default. */
function normalizeUom(value) {
  const s = value == null ? '' : String(value).trim().toLowerCase();
  return s || DEFAULT_UOM;
}

/** Returns the rule for a UOM, or null if it is not supported. */
function uomRule(value) {
  return UOM[normalizeUom(value)] || null;
}

module.exports = { UOM, DEFAULT_UOM, normalizeUom, uomRule };
