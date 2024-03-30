declare module 'odometer' {
  interface OdometerOptions {
    el: HTMLElement;
    value?: number;
    format?: string;
    theme?: string;
    duration?: number;
    animation?: string;
    formatFunction?: Function;
    // Add other properties as needed
  }

  interface Odometer {
    update(value: number): void;
    render(value?: any): void;
    cleanValue(val: any): void;
    renderInside(): void;
    watchForMutations(): void;
    stopWatchingMutations(): void;
    startWatchingMutations(): void;
    bindTransitionEnd(): void;
    resetFormat(): void;
    renderDigit(): void;
    formatDigits(value: any): void;
    insertDigit(digit: any, before: any): void;
    addDigit(value: any, repeating: boolean): void;
    addSpacer(chr: any, before: any, extraClasses: any): void;
    animate(newValue: any): void;
    animateCount(newValue: any): void;
    getDigitCount(): void;
    getFractionalDigitCount(): void;
    resetDigits(): void;
    animateSlide(value: any): void;
    // Add other methods as needed
  }

  class Odometer {
    constructor(options: OdometerOptions);
  }

  export default Odometer;
}