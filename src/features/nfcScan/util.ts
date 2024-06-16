export function numberArrayToHexString(numberArray:number[]) {
  return numberArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export function hexStringToNumberArray(hexString:string) {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2);
  }

  if (hexString.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }

  const numberArray = [];
  for (let i = 0; i < hexString.length; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    numberArray.push(byte);
  }
  return numberArray;
}
