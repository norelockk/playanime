// constants n' one-time use functions
const base64Chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const base64ToBytes = (value: string): Uint8Array => {
  const len = value.length;

  let bufferLength = value.indexOf('=') === -1 ? len : value.indexOf('=');
  const bytes = new Uint8Array((bufferLength * 3) / 4);

  let buffer = 0;
  let bufferLengthCounter = 0;
  for (let i = 0; i < len; i++) {
    const char = value[i];
    const charCode = value.indexOf(char);

    if (charCode === -1 || char === '=') continue;

    buffer = (buffer << 6) | charCode;
    bufferLengthCounter += 6;

    if (bufferLengthCounter >= 8) {
      bufferLengthCounter -= 8;
      bytes[bytes.length - bufferLength++] = (buffer >> bufferLengthCounter) & 255;
    }
  }

  return bytes.slice(0, bufferLength);
};
const stringToUtf8Bytes = (value: string): number[] => [...encodeURIComponent(value)].map(c => c.charCodeAt(0));

// functions
export const encode = (value: string): string => {
  const bytes = stringToUtf8Bytes(value);
  let output = '';

  for (let i = 0; i < bytes.length; i += 3) {
    const triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    output +=
      base64Chars.charAt((triplet >>> 18) & 63) +
      base64Chars.charAt((triplet >>> 12) & 63) +
      base64Chars.charAt((triplet >>> 6) & 63) +
      base64Chars.charAt(triplet & 63);
  }

  return output;
};

export const decode = (value: string): string => {
  const bytes = base64ToBytes(value);
  let output = '';

  for (let i = 0; i < bytes.length; i += 3) {
    const triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    output += String.fromCharCode((triplet >>> 16) & 255, (triplet >>> 8) & 255, triplet & 255);
  }

  return output;
};