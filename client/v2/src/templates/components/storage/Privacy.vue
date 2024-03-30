<style scoped>
.privacy {
  z-index: 99;
  padding: 1em;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: auto;
  max-height: 100vh;
  font-family: Roboto, sans-serif;
  width: 100%;
  background-color: var(--background-color-10);
}

.privacy-links {
  margin: 1em 0;
  text-transform: uppercase;
  list-style-type: none;
  font-size: 0.65em;
  font-weight: 600;
}

.privacy-link {
  color: var(--font-color-65);
  text-decoration: none;
  transition: all .15s;
}

.privacy-link:hover {
  color: var(--font-color-100);
}

.privacy-text {
  font-size: 0.74em;
}

.privacy-button {
  border: 0;
  padding: 0.55em;
  border-radius: 2.5px;
  color: var(--font-color-65);
  background: var(--background-color-5);
  font-weight: 600;
  font-family: Roboto, sans-serif;
  transition: all 0.25s ease;
}

.privacy-button:active {
  opacity: 0.60;
}

.privacy-button:hover {
  background: var(--background-color-15);
  color: var(--font-color-80);
  cursor: pointer;
}

/* Animation */
.privacy-anim-enter-active,
.privacy-anim-leave-active {
  transition: all .5s;
}

.privacy-anim-enter-from,
.privacy-anim-leave-to {
  margin-bottom: -150px;
  opacity: 0;
}
</style>

<script setup lang='ts'>
// Dependencies
import { computed, ComputedRef } from 'vue';
import { useStore, Store } from 'vuex';

// core store
const store: Store<{}> = useStore();

const showing: ComputedRef<boolean> = computed(() => store.getters['privacy/showing']);
const accept = async () => await store.dispatch('privacy/accept');
</script>

<template>
  <Transition name='privacy-anim' mode='out-in'>
    <div class='privacy' v-if='showing'>
      <div class='privacy-content'>
        <div class='privacy-text'>
          <span v-text='$t("PRIVACY_MESSAGE.CONTENT")'></span>
        </div>

        <ul class='privacy-links'>
          <li>
            <a href="#" class='privacy-link' v-text='$t("PRIVACY_MESSAGE.LINK_TEXT")'></a>
          </li>
        </ul>

        <button class='privacy-button' @click='accept'>
          <span v-text='$t("PRIVACY_MESSAGE.ACCEPT_BUTTON")'></span>
        </button>
      </div>
    </div>
  </Transition>
</template>