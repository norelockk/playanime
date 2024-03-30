import Player from 'video.js/dist/types/player';

import { logger } from '@/hydra';
import { createElement } from '@/hydra/utils/dom';

import { LogLevel } from '@/types/enums';

const className: string = 'player-context';

let layer: HTMLElement | null = null;
let parent: ParentNode | HTMLElement | null = null;
let created: boolean = false;

const onContextClick = (event: MouseEvent | Event): void => {
  event.preventDefault();

  if (created) {
    if (layer)
      removeContextLayer();
    else
      createContextLayer(event);
  }
};

const createContextLayer = (event: MouseEvent | Event): void => {
  if (created && parent && !layer) {
    let { offsetX: contextX, offsetY: contextY } = event as MouseEvent;

    layer = createElement('div', { className });
    layer.onclick = removeContextLayer;

    parent.appendChild(layer);

    const { offsetWidth: parentW, offsetHeight: parentH } = parent as HTMLElement;

    const logo = createElement('div', { className: `${className}-logo` }),
      text = createElement('div', { className: `${className}-text` }),
      inner = createElement('div', { className: `${className}-element-inner` }),
      redirect = createElement('a', {
        style: [
          ['top', `${contextY / parentH * 100}%`],
          ['left', `${contextX / parentW * 100}%`],
          ['position', 'absolute']
        ],
        className: `${className}-element`
      });

    text.innerText = 'player (1.0.0-alpha)';

    [logo, text].forEach(
      element => inner.appendChild(element)
    );

    redirect.appendChild(inner);
    layer.appendChild(redirect);

    const { offsetWidth: redirectW, offsetHeight: redirectH } = redirect;

    if (contextX + redirectW >= parentW) {
      contextX = parentW - redirectW;
      redirect.style.left = `${contextX / parentW * 100}%`;
    }

    if (contextY + redirectH >= parentH) {
      contextY = parentH - redirectH;
      redirect.style.top = `${contextY / parentH * 100}%`;
    }

    logger.log(LogLevel.Event, `Context menu has been ${layer ? 'created' : 'removed'}`);
  }
};

const removeContextLayer = (): void => {
  if (layer && parent) {
    parent!.removeChild(layer);
    layer = null;

    logger.log(LogLevel.Event, `Context menu has been ${layer ? 'created' : 'removed'}`);
  }
};

export const setupPlayerContext = (player: Player): void => {
  if (!created) {
    if (!player)
      throw new ReferenceError('Player is not available');

    const el = player.el().parentNode;
    if (!el)
      throw new ReferenceError('Wrapper (parent) is not available');
    else
      parent = el;

    parent.addEventListener('contextmenu', onContextClick);
    created = !created;

    logger.log(LogLevel.Debug, 'Player context menu setup success');
  }
};

export const destroyPlayerContext = (): void => {
  if (created) {
    if (!parent)
      throw new ReferenceError('Wrapper (parent) is not available');

    // remove if layer if present
    if (layer) removeContextLayer();

    parent.removeEventListener('contextmenu', onContextClick);
    created = !created;

    logger.log(LogLevel.Debug, 'Player context menu destroy success');
  }
};