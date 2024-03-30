import { isArray, isObject, isString } from "lodash";

export const createElement = (tag: string, payload: any) => {
  if (typeof tag !== "string")
    throw null;

  if (typeof payload !== "object")
    throw null;

  const el = document.createElement(tag);

  if (payload.id && isString(payload.id)) el.id = payload.id;
  if (payload.className && isString(payload.className)) el.className = payload.className; 

  if (payload.attrs && isObject(payload.attrs))
    for (const [prop, value] of Object.entries(payload.attrs))
      (el as any)[prop] = value;

  if (payload.style && isArray(payload.style)) {
    for (const style of payload.style) {
      const [prop, value] = style;

      el.style[prop] = value;
    }
  }

  return el;
}