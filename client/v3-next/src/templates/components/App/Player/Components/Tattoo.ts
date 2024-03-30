import Player from 'video.js/dist/types/player';

import Environment from '@/env';

import { Timeout } from '@/types/interfaces';
import { LogLevel, PlayerTattooDestroyReason } from '@/types/enums';

import { logger } from '@/hydra';
import { createElement } from '@/hydra/utils/dom';
import { getRandomInt } from '@/hydra/utils/number';

const tData: { [key: string]: any } = {};
const className: string = 'player-tattoo';
const workerInterval = 15 * 1000;
const timeoutInterval = 5 * 1000;

let text: HTMLElement | null = null;
let layer: HTMLElement | null = null;
let parent: ParentNode | HTMLElement | null = null;
let created: boolean = false;
let timeout: Timeout | undefined = undefined;
let interval: Timeout | undefined = undefined;

// MutationObserver instance
let observer: MutationObserver | null = null;

const createTattooLayer = (): void => {
  if (created && parent && !layer) {
    layer = createElement('div', { className });
    parent.appendChild(layer);

    timeout = setTimeout(destroyTattooLayer, timeoutInterval);
    if (!text) createTattooText();
  }
};

const destroyTattooLayer = (): void => {
  if (layer && parent) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    if (text) destroyTattooText();

    parent.removeChild(layer);
    layer = null;
  }
};

const createTattooText = (): void => {
  if (layer && !text) {
    const { offsetWidth: layerW, offsetHeight: layerH } = layer;

    let textX = getRandomInt(0, layerW),
      textY = getRandomInt(0, layerH);

    text = createElement('span', {
      style: [
        ['top', `${textY}px`],
        ['left', `${textX}px`],
        ['position', 'absolute'],
      ],
      // innerText: 'player tattoo test'
    });

    text.innerHTML = 'player tattoo test';
    layer.appendChild(text);

    const { offsetWidth: textW, offsetHeight: textH } = text;
    if (textX + textW >= layerW) {
      textX = layerW - textW;
      text.style.left = `${textX}px`;
    }

    if (textY + textH >= layerH) {
      textY = layerH - textH;
      text.style.top = `${textY}px`;
    }

    Environment.DEVELOPMENT && logger.log(LogLevel.Debug, 'Created tattoo text', { textX, textY });
  }
};

const destroyTattooText = (): void => {
  if (layer && text) {
    layer.removeChild(text);
    text = null;

    Environment.DEVELOPMENT && logger.log(LogLevel.Debug, 'Destroyed tattoo text');
  }
};

const tattooWorker = (): void => {
  if (created && parent && !text) {
    createTattooLayer();
  }
};

const mutationCallback = (mutationsList: MutationRecord[]) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'characterData' && (mutation.target === text || mutation.target === layer)) {
      // If innerText of text or layer is changed, prevent the changes
      mutation.target.nodeValue = mutation.oldValue || '';
    }
  }
};

export const setupPlayerTattoo = (
  data: {
    user: object,
    player: Player,
    episode: object
  }
): void => {
  if (!created) {
    if (!data.episode && !data.user)
      throw new ReferenceError('User/Episode data is not available');

    const props: { [key: string]: any } = { u: data.user, e: data.episode };
    for (const k of Object.keys(props))
      tData[k] = props[k];

    if (!data.player)
      throw new ReferenceError('Player is not available');

    const el = data.player.el().parentNode;
    if (el) parent = el;

    // Initialize MutationObserver
    observer = new MutationObserver(mutationCallback);
    observer.observe(parent!, { childList: true }); // Start observing child node changes

    created = !created;
    interval = setInterval(tattooWorker, workerInterval);

    Environment.DEVELOPMENT && logger.log(LogLevel.Debug, 'Player tattoo setup success');
  }
};

export const destroyPlayerTattoo = (reason: PlayerTattooDestroyReason): void => {
  if (created && reason === PlayerTattooDestroyReason.PlayerDisposed) {
    if (layer) destroyTattooLayer();
    if (parent) parent = null;

    created = !created;

    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    Environment.DEVELOPMENT && logger.log(LogLevel.Debug, 'Player tattoo destroy success');
  }
};
