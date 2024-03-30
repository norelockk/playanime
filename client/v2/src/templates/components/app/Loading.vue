<style scoped>
.loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000000;
  background: var(--background-color-10-08);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang='ts'>
// Dependencies
import { useStore, Store } from 'vuex';
import { computed, ComputedRef } from 'vue';

// Components
import LoadingIcon from '../icons/LoadingIcon.vue';

// Get data from core store
const store: Store<{}> = useStore();

// Is loading screen showing?
const showing: ComputedRef<boolean> = computed(() => store.getters['loading/showing']);
</script>

<template>
  <!-- Transition changes on state from core store -->
  <Transition name='fade' mode='out-in'>
    <!-- loading: start -->
    <div class='loading' v-if='showing'>
      <!-- loading: container start -->
      <LoadingIcon />
      <!-- loading: container end -->
    </div>
    <!-- loading: end -->
  </Transition>
</template>