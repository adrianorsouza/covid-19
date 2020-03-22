// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}
/**
 * Format number with decimals.
 *
 * @param {Number} num
 * */
export function formatNumber(num) {
  if (!num) return num;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
