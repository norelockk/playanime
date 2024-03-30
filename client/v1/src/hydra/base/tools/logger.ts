// Importing dependencies
import { isFunction } from 'lodash';

// Importing utility function
import { dts } from '../utils/string';
import { query } from '../utils/query';

// Importing environment settings
import { HydraEnvironment } from '../../environment';

// Importing types
import { LogLevel } from '@/types/hydra.enums';
import { LoggerOptions } from '@/types/hydra.interfaces';

class Logger {
  // Mapping of log levels to their respective numerical values
  private levels: { [key in LogLevel]?: number } = {};

  // Configuration options for the logger
  private options!: Required<LoggerOptions>;

  // Numerical value representing the current log level threshold
  private logLevel?: number;

  // Flag indicating whether the log window is enabled
  private logWindow: boolean = !!query('debug');

  // Static properties for managing debug logs container and options
  private static debugLogsContainer: HTMLDivElement | null = null;
  private static debugLogsOptScroll: boolean = true;

  // Formats log message
  private formatMessage(level: LogLevel, fileName: string, lineNumber: number, columnNumber: number): string | null {
    const styledLevel = `%c${level.toUpperCase()} @ ${fileName}:${lineNumber}:${columnNumber}`;
    return `${styledLevel}`;
  }

  // Retrieves CSS styles based on log level for console log styling
  private getColorStyles(level: LogLevel): string[] {
    const color = this.getColor(level);
    return [`color: #fff; font-weight: 900; padding: 2px 5px; border-radius: 2px; background-color: ${color};`];
  }

  // Retrieves color based on log level for styling
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
      default: return 'grey'; // Default color for unknown log levels
    }
  }

  // Creates log window element and adds it to the DOM if development environment and log window are enabled
  private createLogWindow(): void {
    if (!HydraEnvironment.development) return;
    if (!this.logWindow) return;

    if (!Logger.debugLogsContainer) {
      const buttonMargin = '10px';
      const windowHeight = '20vh';

      // Creating log window elements
      const container = document.createElement('div');
      const innerContainer = document.createElement('div');
      const controlsContainer = document.createElement('div');
      const scrollButton = document.createElement('button');
      const positionButton = document.createElement('button');
      const scrollToggleButton = document.createElement('button');

      Logger.debugLogsContainer = document.createElement('div');

      Logger.debugLogsContainer.style.overflow = 'auto';

      container.style.width = 'calc(100vw - 40px)';
      container.style.minHeight = '4em';
      container.style.height = windowHeight;
      container.style.overflow = 'auto';
      container.style.position = 'fixed';
      container.style.bottom = buttonMargin;
      container.style.left = buttonMargin;
      container.style.opacity = '0.90';
      container.style.background = '#242424';
      container.style.border = '1px dashed #CCCCCC';
      container.style.padding = '4px';
      container.style.zIndex = '1000001';
      container.style.fontFamily = 'monospace';

      innerContainer.style.height = '100%';
      innerContainer.style.display = 'flex';
      innerContainer.style.flexDirection = 'column';

      controlsContainer.style.minHeight = '1.5em';
      controlsContainer.style.paddingBottom = '2px';
      controlsContainer.style.marginBottom = '2px';
      controlsContainer.style.borderBottom = '1px dashed #CCC';
      controlsContainer.style.display = 'flex';

      [scrollButton, positionButton, scrollToggleButton].forEach(button => {
        button.style.border = 'none';
        button.style.background = 'transparent';
        button.style.color = '#FFF';
        button.style.marginRight = '5px';
      });

      positionButton.style.marginLeft = 'auto';

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

      [scrollButton, positionButton, scrollToggleButton].forEach(button => controlsContainer.appendChild(button));

      innerContainer.appendChild(controlsContainer);
      innerContainer.appendChild(Logger.debugLogsContainer);

      container.appendChild(innerContainer);

      document.body.appendChild(container);
    }
  }

  // Prints log in the log window if development environment and log window are enabled
  private printLogInWindow(data: { level: LogLevel, fileName: string, methodName: string, lineNumber: number, columnNumber: number }, ...args: any[]): void {
    if (!HydraEnvironment.development) return;
    if (!this.logWindow) return;

    const logTime = document.createElement('span');
    logTime.style.padding = '0 6px';
    logTime.style.fontSize = '11px';
    logTime.textContent = new Date().toISOString();

    const logLevelDiv = document.createElement('span');
    logLevelDiv.style.padding = '0 5px';
    logLevelDiv.style.fontWeight = '900';
    logLevelDiv.style.borderRadius = '2px';
    logLevelDiv.style.backgroundColor = this.getColor(data.level)!;
    logLevelDiv.style.color = '#fff';
    logLevelDiv.style.flexShrink = '0';
    logLevelDiv.style.wordBreak = 'break-word';
    logLevelDiv.textContent = `${data.level.toUpperCase()}`;

    const logDiv = document.createElement('div');
    logDiv.style.color = 'grey';
    logDiv.style.padding = '2px 4px 6px';
    logDiv.style.fontSize = '12px';
    logDiv.style.display = 'flex';
    logDiv.style.width = '100%';
    logDiv.style.justifyContent = 'space-between';

    const logMessage = document.createElement('div');
    logMessage.style.padding = '0 6px';
    logMessage.style.flexGrow = '1';
    logMessage.style.minWidth = '0';
    logMessage.style.wordBreak = 'break-word';
    logMessage.style.textOverflow = 'ellipsis';
    logMessage.style.color = '#fff';
    logMessage.textContent = `${data.methodName}() :: ${dts(args)}`;

    const logTrace = document.createElement('div');
    logTrace.style.padding = '0 6px';
    logTrace.style.fontSize = '9.2px';
    logTrace.textContent = `${data.fileName}:${data.lineNumber}:${data.columnNumber}`;

    [logTime, logLevelDiv, logMessage, logTrace].forEach(element => logDiv.appendChild(element));

    if (Logger.debugLogsContainer) {
      Logger.debugLogsContainer!.appendChild(logDiv);
      if (Logger.debugLogsOptScroll) Logger.debugLogsContainer!.scrollTop = Logger.debugLogsContainer.scrollHeight;
    }
  }

  /**
   * Constructs a new Logger instance with specified options.
   * @param options - Configuration options for the logger
   */
  constructor(options: LoggerOptions = {}) {
    // Initialization of levels and log options    
    let counter: number = 0;
    for (const [_, __] of Object.entries(LogLevel)) Object.defineProperty(this.levels, _, { value: counter++, writable: false });

    // Configuration setup based on environment
    if (HydraEnvironment.production) {
      // Disabling console logging in production environment
      const obj = window.console as any;
      for (const method of Object.keys(obj)) {
        if (isFunction(obj[method])) {
          obj[method] = () => { };
        }
      }
      window.console = obj;
    } else {
      // Setting default options and configuring log window
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

  /**
   * Logs message to console and log window if level is above the current log level threshold.
   * @param level - Log level
   * @param args - Log arguments
   */
  public log(level: LogLevel, ...args: any[]): void {
    // Skips logging if log level is below the current threshold
    if (this.levels[level]! < this.logLevel!) return;

    // Retrieves call stack information
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

    // Formats log message and retrieves color styles
    const message = this.formatMessage(level, fileName, lineNumber, columnNumber);
    const colors = this.getColorStyles(level);

    // Logs message to console with styled output
    console.log(message, ...colors!, ...args);

    // Prints log in the log window
    this.printLogInWindow({ level, fileName, methodName, lineNumber, columnNumber }, ...args);
  }
}

const logger: Logger = new Logger({ logLevel: LogLevel.Debug });

export default logger;