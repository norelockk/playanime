import { isFunction } from 'lodash';

import { LogLevel } from '@/types/enums';
import { LoggerOptions } from '@/types/interfaces';

import Environment from '@/env';

import { dts } from '../utils/string';
import { query } from '../utils/query';
import { createElement } from '../utils/dom';

export default class Logger {
  private levels!: { [key in LogLevel]: number };
  private options!: Required<LoggerOptions>;
  private logLevel!: number;
  private logWindow: boolean = !!Environment.DEVELOPMENT && !!query('debug');

  private static debugLogsContainer: HTMLDivElement | null = null;
  private static debugLogsOptScroll: boolean = true;

  private formatMessage(level: LogLevel, fileName: string, lineNumber: number, columnNumber: number): string {
    const styledLevel = `%c${level.toUpperCase()} @ ${fileName}:${lineNumber}:${columnNumber}`;
    return `${styledLevel}`;
  }

  private getColorStyles(level: LogLevel): string[] {
    const color = this.getColor(level);
    return [`color: #fff; font-weight: 900; padding: 2px 5px; border-radius: 2px; background-color: ${color};`];
  }

  private getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.Info: return 'blue';
      case LogLevel.Step: return 'black';
      case LogLevel.Error: return 'red';
      case LogLevel.Debug: return '#3f7de0';
      case LogLevel.Event: return 'purple';
      case LogLevel.Warning: return 'orange';
      case LogLevel.Success: return 'green';
      case LogLevel.Interval: return 'cyan';
      default: return 'grey';
    }
  }

  private createLogWindow(): void | undefined {
    if (!this.logWindow) return;

    if (!Logger.debugLogsContainer) {
      const buttonMargin = '10px', windowHeight = '20vh';

      const container = createElement('div', {
        style: [
          ['left', buttonMargin],
          ['width', 'calc(100vw - 40px)'],
          ['height', windowHeight],
          ['bottom', buttonMargin],
          ['overflow', 'auto'],
          ['position', 'fixed'],
          ['minHeight', '4em'],
          ['opacity', '0.90'],
          ['background', '#242424'],
          ['border', '1px dashed #CCCCCC'],
          ['padding', '4px'],
          ['zIndex', '1000001'],
          ['fontFamily', 'monospace']
        ]
      });

      const innerContainer = createElement('div', {
        style: [
          ['height', '100%'],
          ['display', 'flex'],
          ['flexDirection', 'column']
        ]
      });

      const controlsContainer = createElement('div', {
        style: [
          ['minHeight', '1.5em'],
          ['paddingBottom', '2px'],
          ['marginBottom', '2px'],
          ['borderBottom', '1px dashed #CCC'],
          ['display', 'flex']
        ]
      });

      const scrollButton = createElement('button', {
        style: [
          ['border', 'none'],
          ['background', 'transparent'],
          ['color', '#FFF'],
          ['marginRight', '5px']
        ]
      });

      const positionButton = createElement('button', {
        style: [
          ['border', 'none'],
          ['background', 'transparent'],
          ['color', '#FFF'],
          ['marginRight', '5px'],
          ['marginLeft', 'auto']
        ]
      });

      const scrollToggleButton = createElement('button', {
        style: [
          ['border', 'none'],
          ['background', 'transparent'],
          ['color', '#FFF'],
          ['marginRight', '5px']
        ]
      });

      Logger.debugLogsContainer = createElement('div', {
        style: [
          ['overflow', 'auto']
        ]
      }) as HTMLDivElement;

      [scrollButton, positionButton, scrollToggleButton].forEach((button => {
        button.style.border = 'none';
        button.style.background = 'transparent';
        button.style.color = '#FFF';
        button.style.marginRight = '5px';
      }));

      scrollToggleButton.onclick = () => {
        if (container.style.height === windowHeight) {
          container.style.height = 'calc(100vh - 20px)';
          scrollToggleButton.innerText = '□';
        } else {
          container.style.height = windowHeight;
          scrollToggleButton.innerText = '■';
        }
      };

      positionButton.onclick = () => {
        if (container.style.bottom === buttonMargin) {
          container.style.bottom = 'initial';
          container.style.top = buttonMargin;
          positionButton.innerText = '▼';
        } else {
          container.style.bottom = buttonMargin;
          container.style.top = 'initial';
          positionButton.innerText = '▲';
        }
      };

      scrollButton.onclick = () => {
        Logger.debugLogsOptScroll = !Logger.debugLogsOptScroll;

        if (Logger.debugLogsOptScroll) {
          scrollButton.innerText = '○';
        } else {
          scrollButton.innerText = '●';
          Logger.debugLogsContainer!.scrollTop = Logger.debugLogsContainer!.scrollHeight;
        }
      };

      scrollToggleButton.innerText = '■';
      positionButton.innerText = '▲';
      scrollButton.innerText = Logger.debugLogsOptScroll ? '●' : '○';

      [scrollButton, positionButton, scrollToggleButton].forEach((button => controlsContainer.appendChild(button)));

      innerContainer.appendChild(controlsContainer);
      innerContainer.appendChild(Logger.debugLogsContainer);

      container.appendChild(innerContainer);

      document.body.appendChild(container);
    }
  }

  private printLogInWindow(data: { level: LogLevel, fileName: string, methodName: string, lineNumber: number, columnNumber: number }, ...d: any): void | undefined {
    if (!this.logWindow) return;

    const logTime = createElement('span', {
      style: [
        ['padding', '0 6px'],
        ['fontSize', '11px']
      ]
    });
    logTime.textContent = new Date().toISOString();

    const logLevelDiv = createElement('span', {
      style: [
        ['padding', '0 5px'],
        ['fontWeight', '900'],
        ['borderRadius', '2px'],
        ['backgroundColor', this.getColor(data.level)!],
        ['color', '#fff'],
        ['flexShrink', '0'],
        ['wordBreak', 'break-word']
      ]
    });
    logLevelDiv.textContent = data.level.toUpperCase();

    const logDiv = createElement('div', {
      style: [
        ['color', 'grey'],
        ['padding', '2px 4px 6px'],
        ['fontSize', '12px'],
        ['display', 'flex'],
        ['width', '100%'],
        ['justifyContent', 'space-between']
      ]
    });

    const logMessage = createElement('div', {
      style: [
        ['padding', '0 6px'],
        ['flexGrow', '1'],
        ['minWidth', '0'],
        ['wordBreak', 'break-word'],
        ['textOverflow', 'ellipsis'],
        ['color', '#fff']
      ]
    });
    logMessage.textContent = `${data.methodName}() :: ${dts(d)}`;

    const logTrace = createElement('div', {
      style: [
        ['padding', '0 6px'],
        ['fontSize', '9.2px']
      ]
    });
    logTrace.textContent = `${data.fileName}:${data.lineNumber}:${data.columnNumber}`;

    [logTime, logLevelDiv, logMessage, logTrace].forEach(element => logDiv.appendChild(element));

    if (Logger.debugLogsContainer) {
      Logger.debugLogsContainer!.appendChild(logDiv);
      if (Logger.debugLogsOptScroll) Logger.debugLogsContainer!.scrollTop = Logger.debugLogsContainer.scrollHeight;
    }
  }

  constructor(options: LoggerOptions = {}) {
    // @ts-ignore
    this.levels = {};

    let counter: number = 0;
    for (const [_, __] of Object.entries(LogLevel)) Object.defineProperty(this.levels, _, { value: counter++, writable: false });

    if (import.meta.env.PROD) {
      const obj = window.console as any;

      for (const method of Object.keys(obj)) {
        if (isFunction(obj[method])) {
          obj[method] = () => { };
        }
      }

      window.console = obj;
    } else {
      const defaultOptions: Required<LoggerOptions> = {
        logLevel: LogLevel.Info
      };
      this.options = { ...defaultOptions, ...options };

      this.logLevel = this.levels[this.options.logLevel];

      if (this.logWindow) {
        this.createLogWindow();
      }
    }
  }

  log(level: LogLevel, ...args: any[]): void | undefined {
    if (this.levels[level] < this.logLevel) return;

    const callStack = new Error().stack;
    const stackLines = callStack ? callStack.split('\n') : [];

    let stackInfo = null;
    let methodName = 'Unknown';

    if (stackLines.length > 2) {
      stackInfo = stackLines[2].match(/\s+(.*\/(.*)):(\d+):(\d+)/);
      for (let i = 2; i < stackLines.length; i++) {
        const methodLine = stackLines[i];
        const match = methodLine.match(/at\s+([^(]+)\s+\(/);

        if (match) {
          methodName = match[1];
          break;
        }
      }
    }

    let fileName = 'Unknown';
    if (stackInfo) {
      fileName = stackInfo[2].replace(/\?.*$/, '');
    }

    const lineNumber = stackInfo ? parseInt(stackInfo[3], 10) : -1;
    const columnNumber = stackInfo ? parseInt(stackInfo[4], 10) : -1;

    const message = this.formatMessage(level, fileName, lineNumber, columnNumber);
    const colors = this.getColorStyles(level);

    console.log(message, ...colors!, ...args),
      this.printLogInWindow({ level, fileName, methodName, lineNumber, columnNumber }, ...args);
  }
}