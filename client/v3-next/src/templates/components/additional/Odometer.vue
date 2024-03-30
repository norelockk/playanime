<style>
.odometer.odometer-auto-theme,
.odometer.odometer-theme-default {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.odometer.odometer-auto-theme .odometer-digit,
.odometer.odometer-theme-default .odometer-digit {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer,
.odometer.odometer-theme-default .odometer-digit .odometer-digit-spacer {
  display: inline-block;
  vertical-align: middle;
  visibility: hidden;
}

.odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner,
.odometer.odometer-theme-default .odometer-digit .odometer-digit-inner {
  text-align: left;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.odometer.odometer-auto-theme .odometer-digit .odometer-ribbon,
.odometer.odometer-theme-default .odometer-digit .odometer-ribbon {
  display: block;
}

.odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner,
.odometer.odometer-theme-default .odometer-digit .odometer-ribbon-inner {
  display: block;
  -webkit-backface-visibility: hidden;
}

.odometer.odometer-auto-theme .odometer-digit .odometer-value,
.odometer.odometer-theme-default .odometer-digit .odometer-value {
  display: block;
  -webkit-transform: translateZ(0);
}

.odometer.odometer-auto-theme .odometer-digit .odometer-value.odometer-last-value,
.odometer.odometer-theme-default .odometer-digit .odometer-value.odometer-last-value {
  position: absolute;
}

.odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner,
.odometer.odometer-theme-default.odometer-animating-up .odometer-ribbon-inner {
  -webkit-transition: -webkit-transform 0.67s;
  -moz-transition: -moz-transform 0.67s;
  -ms-transition: -ms-transform 0.67s;
  -o-transition: -o-transform 0.67s;
  transition: transform 0.67s;
}

.odometer.odometer-auto-theme.odometer-animating-up.odometer-animating .odometer-ribbon-inner,
.odometer.odometer-theme-default.odometer-animating-up.odometer-animating .odometer-ribbon-inner {
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
}

.odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner,
.odometer.odometer-theme-default.odometer-animating-down .odometer-ribbon-inner {
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
}

.odometer.odometer-auto-theme.odometer-animating-down.odometer-animating .odometer-ribbon-inner,
.odometer.odometer-theme-default.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
  -webkit-transition: -webkit-transform 0.67s;
  -moz-transition: -moz-transform 0.67s;
  -ms-transition: -ms-transform 0.67s;
  -o-transition: -o-transform 0.67s;
  transition: transform 0.67s;
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
}

.odometer.odometer-auto-theme .odometer-value,
.odometer.odometer-theme-default .odometer-value {
  text-align: center;
}
</style>

<script setup lang='ts'>
// Dependencies
import { isFunction } from 'lodash';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Odometer from 'odometer';

// Props to recognize what to do
const props = defineProps({
  value: {
    type: [String, Number],
    required: false,
    default: 0
  },
  format: {
    type: String,
    required: false
  },
  theme: {
    type: String,
    required: false,
    default: 'default'
  },
  duration: {
    type: Number,
    required: false
  },
  animation: {
    type: String,
    required: false
  },
  formatFunction: {
    type: Function,
    required: false
  }
})

// Emits to recognize what to do
const emit = defineEmits(['ready'])

// Refs
const instance = ref<Odometer | null>(null);
const numRef = ref(null);

// Watcher
watch(() => props.value, (value) => {
  if (instance.value && isFunction(instance.value.update)) {
    instance.value.update(value as any)
  }
}, { deep: false })

// Odometer options
const auto = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if ((window as any).odometerOptions) {
    (window as any).odometerOptions['auto'] = false;
  } else {
    (window as any).odometerOptions = {
      auto: false
    };
  }
};

// Initialize Odometer
const init = () => {
  if (instance.value) return;

  auto();

  const current = new Odometer({
    el: numRef.value!,
    value: props.value as any,
    format: props.format,
    theme: props.theme,
    duration: props.duration,
    animation: props.animation,
    formatFunction: props.formatFunction
  });

  current.render();
  emit('ready', current, Odometer);
  instance.value = current;
};

// Uninitialize Odometer (TODO: literally destroy instance)
const uninit = () => {
  if (instance.value !== null)
    instance.value = null;
};

// Odometer expose ref functions
const renderInside = () => {
  if (instance.value && isFunction(instance.value.renderInside)) {
    instance.value.renderInside();
  }
};

const watchForMutations = () => {
  if (instance.value && isFunction(instance.value.watchForMutations)) {
    instance.value.watchForMutations();
  }
};

const startWatchingMutations = () => {
  if (instance.value && isFunction(instance.value.startWatchingMutations)) {
    instance.value.startWatchingMutations();
  }
};

const stopWatchingMutations = () => {
  if (instance.value && isFunction(instance.value.stopWatchingMutations)) {
    instance.value.stopWatchingMutations();
  }
};

const cleanValue = (val: any) => {
  if (instance.value && isFunction(instance.value.cleanValue)) {
    instance.value.cleanValue(val);
  }
};

const bindTransitionEnd = () => {
  if (instance.value && isFunction(instance.value.bindTransitionEnd)) {
    instance.value.bindTransitionEnd();
  }
};

const resetFormat = () => {
  if (instance.value && isFunction(instance.value.resetFormat)) {
    instance.value.resetFormat();
  }
};

const renderDigit = () => {
  if (instance.value && isFunction(instance.value.renderDigit)) {
    instance.value.renderDigit();
  }
};

const formatDigits = (value: any) => {
  if (instance.value && isFunction(instance.value.formatDigits)) {
    instance.value.formatDigits(value);
  }
};

const insertDigit = (digit: any, before: any) => {
  if (instance.value && isFunction(instance.value.insertDigit)) {
    instance.value.insertDigit(digit, before);
  }
};

const addDigit = (value: any, repeating: boolean) => {
  if (instance.value && isFunction(instance.value.addDigit)) {
    instance.value.addDigit(value, repeating);
  }
};

const addSpacer = (chr: any, before: any, extraClasses: any) => {
  if (instance.value && isFunction(instance.value.addSpacer)) {
    instance.value.addSpacer(chr, before, extraClasses);
  }
};

const animate = (newValue: any) => {
  if (instance.value && isFunction(instance.value.animate)) {
    instance.value.animate(newValue);
  }
};

const animateCount = (newValue: any) => {
  if (instance.value && isFunction(instance.value.animateCount)) {
    instance.value.animateCount(newValue);
  }
};

const getDigitCount = () => {
  if (instance.value && isFunction(instance.value.getDigitCount)) {
    instance.value.getDigitCount();
  }
};

const getFractionalDigitCount = () => {
  if (instance.value && isFunction(instance.value.getFractionalDigitCount)) {
    instance.value.getFractionalDigitCount();
  }
};

const resetDigits = () => {
  if (instance.value && isFunction(instance.value.resetDigits)) {
    instance.value.resetDigits();
  }
};

const animateSlide = (value: any) => {
  if (instance.value && isFunction(instance.value.animateSlide)) {
    instance.value.animateSlide(value);
  }
};

const render = (value: any) => {
  if (instance.value && isFunction(instance.value.render)) {
    instance.value.render(value);
  }
};

const update = (newVal: any) => {
  if (instance.value && isFunction(instance.value.update)) {
    instance.value.update(newVal);
  }
};

onMounted(() => init());
onUnmounted(() => uninit());

defineExpose({
  instance,
  init,
  uninit,
  renderInside,
  watchForMutations,
  startWatchingMutations,
  stopWatchingMutations,
  cleanValue,
  bindTransitionEnd,
  resetFormat,
  renderDigit,
  formatDigits,
  insertDigit,
  addDigit,
  addSpacer,
  animate,
  animateCount,
  getDigitCount,
  getFractionalDigitCount,
  resetDigits,
  animateSlide,
  render,
  update
});
</script>

<template>
  <div ref='numRef'></div>
</template>