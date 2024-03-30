import Player from 'video.js/dist/types/player';

import { logger } from '../../../../hydra/base';
import { createElement } from '../../../../hydra/base/utils/dom';
import { getExceptionMessage } from '../../../../hydra/base/utils/exceptions';

import { LogLevel } from '../../../../typings/enums';

let layer: HTMLElement | null = null;
let created: boolean = false;
let playerElement: HTMLElement | null = null;

const className: string = 'player-context';

function handlePlayerContextClick(event: MouseEvent) {
  event.preventDefault();
  createContextLayer(event);
}

function createContextLayer(event: MouseEvent) {
  if (layer) {
    destroyContextLayer();
    return false;
  }

  if (!playerElement) {
    logger.log(LogLevel.Error, 'player element not found');
    return false;
  }

  let { offsetX, offsetY } = event;
  const { offsetWidth: offW, offsetHeight: offH } = playerElement as HTMLElement;

  layer = createElement('div', { className });
  layer.addEventListener('click', destroyContextLayer);

  playerElement.appendChild(layer);

  const logo = createElement('div', { className: `${className}-logo` });
  const inner = createElement('div', { className: `${className}-element-inner` });

  const redirect = createElement('a', {
    style: [
      ['top', `${offsetY / offH * 100}%`],
      ['left', `${offsetX / offW * 100}%`],
      ['position', 'absolute']
    ],
    attrs: {
      href: 'https://playani.me',
      target: '_blank'
    },
    className: `${className}-element`,
  });

  inner.appendChild(logo);
  redirect.appendChild(inner);

  const { offsetWidth, offsetHeight } = redirect;

  if (offsetY + offsetHeight > offH) {
    offsetY = offH - offsetHeight;
    redirect.style.top = `${offsetY / offH * 100}%`;
  }

  if (offsetX + offsetWidth > offW) {
    offsetX = offW - offsetWidth;
    redirect.style.left = `${offsetX / offW * 100}%`;
  }

  layer.appendChild(redirect);

  logger.log(LogLevel.Debug, 'player context layer created', { offsetX, offsetY }); ///
}

function destroyContextLayer() {
  if (!layer) {
    logger.log(LogLevel.Error, 'layer element not found');
    return false;
  }

  if (!playerElement) {
    logger.log(LogLevel.Error, 'player element not found');
    return false;
  }

  playerElement.removeChild(layer);
  layer = null;

  logger.log(LogLevel.Debug, 'player context layer destroyed');
}

export function createPlayerContext(player: Player) {
  if (created) {
    logger.log(LogLevel.Warning, 'player context already exists');
    return false;
  }

  if (!playerElement) {
    try {
      playerElement = player.el() as HTMLElement;
    } catch (error) {
      logger.log(LogLevel.Error, 'failed to find player element:', getExceptionMessage(error as Error));
      throw error;
    }
  }

  playerElement.addEventListener('contextmenu', handlePlayerContextClick);

  created = !created;

  logger.log(LogLevel.Info, 'created player context');
}

export function destroyPlayerContext() {
  if (!created) {
    logger.log(LogLevel.Warning, 'player context does not exist yet');
    return false;
  }

  if (!playerElement) {
    logger.log(LogLevel.Error, 'player element not found');
    return false;
  }

  if (layer) destroyContextLayer();

  playerElement.removeEventListener('contextmenu', handlePlayerContextClick);
  playerElement = null;

  created = !created;

  logger.log(LogLevel.Info, 'destroyed player context');
}