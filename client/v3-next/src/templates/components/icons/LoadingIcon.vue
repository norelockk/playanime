<style scoped>
.loading .icon {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.loading .icon div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 4px;
  background: hsl(0, 0%, 65%);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loading .icon div:nth-child(1) {
  left: 8px;
  animation: icon1 0.5522s infinite;
}

.loading .icon div:nth-child(2) {
  left: 8px;
  animation: icon2 0.5522s infinite;
}

.loading .icon div:nth-child(3) {
  left: 32px;
  animation: icon2 0.5522s infinite;
}

.loading .icon div:nth-child(4) {
  left: 56px;
  animation: icon3 0.5522s infinite;
}

@keyframes icon1 {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes icon3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes icon2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>

<template>
  <div class='icon'>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>