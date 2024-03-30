// functions
export const dts = (data: any): string | null => {
  let parsedData;

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      parsedData = data.map(element => {
        if (typeof element === 'object') {
          return JSON.stringify(element);
        } else {
          return element.toString();
        }
      }).join(' ');
    } else {
      parsedData = JSON.stringify(data);
    }
  } else {
    parsedData = data.toString();
  }

  return parsedData;
};

export const rmdts = (value: string): string => value.replace(/(\.\/|\.ts)/g, '');

export const readGlobalData = (key: string): any | undefined => key in window ? window[key as any] : undefined;

export function normalize(type: 'path', value: any): string {
  switch (type) {
    default:
      throw 'Unknown normalization type';

    case 'path':
      // Removes directory path and file extension from the given value.
      return value.replace(/^.*[\\/]|(\..+)$/g, '');
  }
}