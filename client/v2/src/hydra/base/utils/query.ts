// types
import { Queries } from '../../../typings/types';

// functions
export const addQuery = (query: string, value: string | number | boolean) => {
  let queries: Queries = {};

  // @ts-ignore
  let searchParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : null;

  if (queries[query] === value) return queries[query];

  removeQuery(query);
  window.history.replaceState({}, document.title, `${location.pathname}${addParam(location.search, query, value)}`);
  searchParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : null;
  queries[query] = value;
  return queries[query];
};

export const removeQuery = (query: string) => {
  const queries: Queries = {};

  // @ts-ignore
  let searchParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : null;

  window.history.replaceState({}, document.title, `${location.pathname}${removeParam(location.search, query)}`);
  searchParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : null;
  delete queries[query];
};

export const addParam = (url: string, param: string, value: string | number | boolean) => {
  let u = url.split('?');
  let addedParam = encodeURIComponent(param) + '=' + value;
  let pars = u[1] ? u[1].split(/[&;]/g) : [];
  pars.push(addedParam);
  url = u[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  return url;
};

export const removeParam = (url: string, param: string) => {
  let u = url.split('?');
  if (u.length >= 2) {
    let prefix = encodeURIComponent(param) + '=';
    let pars = u[1].split(/[&;]/g);
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }
    url = u[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
};

export const query = (key: string, value?: string | number | boolean): string | number | boolean => {
  let queries: Queries = {};
  let searchParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : null;

  if (value !== undefined) {
    return addQuery(key, value);
  }

  if (queries[key] !== undefined) return queries[key];

  let result: string | number | boolean | null = null;

  if (searchParams) {
    result = searchParams.get(key);

    if (result === '0') result = 0;
    else if (result === 'false' || result === null) result = false;
    else if (result === '') result = true;
  } else {
    const escapedKey = encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&');
    const regex = new RegExp(`^(?:.*?[&?]${escapedKey}(?:=([^&]*)|[&$]))?.*$`, 'i');

    result = decodeURIComponent(window.location.search.replace(regex, '$1'));

    if (result === '0') result = 0;
    else if (result === 'false') result = false;
    else if (!result.length) result = new RegExp(`[&?]${escapedKey}(?:[&=]|$)`, 'i').test(window.location.search);
  }

  queries[key] = result as string | number | boolean;
  return result;
};