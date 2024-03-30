import { global } from "..";

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

export const readGlobalData = (key: string): any | undefined => key in global ? global[key] : undefined;