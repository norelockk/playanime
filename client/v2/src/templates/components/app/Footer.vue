<style scoped>
footer {
  margin-top: 60px;
  padding: 30px 0px;
  background: var(--background-color-10);
}

.footer-top,
.footer-bottom,
.footer-line {
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1550px;
}

.footer-top {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.footer-bottom {
  display: flex;
  align-items: center;
}

.footer-line {
  margin: 30px auto;
  height: 1px;
  width: 100%;
  max-width: 1490px;
  background: var(--background-color-40);
}

.footer-top-content-box:nth-of-type(-n+2) {
  border-right: 1px solid var(--background-color-40);
}

.footer-heading {
  font-size: .7rem;
  margin-bottom: 10px;
}

.footer-list {
  list-style-type: none;
}

.footer-list-link {
  font-size: .65rem;
  text-decoration: none;
  color: var(--font-color-80);
  transition: color var(--transition-primary);
  -webkit-transition: color var(--transition-primary);
  -moz-transition: color var(--transition-primary);
  -ms-transition: color var(--transition-primary);
  -o-transition: color var(--transition-primary);
}

.footer-list-link:hover {
  color: var(--theme-primary-color);
  text-decoration: underline;
}

.footer-logo-link {
  display: flex;
  font-size: .95rem;
  text-decoration: none;
}

.footer-list-link-icon {
  margin-left: 10px;
  font-size: .65rem;
  font-weight: 500;
}

.footer-logo {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-image: url(../../../assets/img/logo.svg);
  background-repeat: no-repeat;
  background-position: bottom;
}

.footer-logo-text {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.footer-logo-brand {
  color: var(--font-color-100);
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: .9rem;
}

.footer-logo-brand span {
  font-weight: 700;
}

.footer-copy {
  font-size: .6rem;
  color: var(--font-color-80);
}

.footer-notice {
  font-size: .4rem;
  color: var(--font-color-65);
}

.footer-notice-text {
  margin-top: 6px;
}

@media (max-width:615px) {
  .footer-top {
    grid-template-columns: 1fr;
  }

  .footer-top-content-box:nth-of-type(-n+2) {
    border-right: 0px;
    border-bottom: 1px solid var(--background-color-40);
    padding-bottom: 30px;
  }
}

@media only screen and (hover: none) and (pointer: coarse) and (max-width: 500px) {
  .footer {
    margin-bottom: 53px;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';

const now = ref(new Date());
</script>

<template>
  <footer>
    <div class="footer-bottom">
      <router-link to="/" class="footer-logo-link">
        <div class="footer-logo"></div>
        <div class="footer-logo-text">
          <p class="footer-logo-brand">
            <b>play</b>anime
          </p>
          <p class="footer-copy" v-text="$t('FOOTER.COPYRIGHT', { found: 2022, now: now.getFullYear() })"></p>
        </div>
      </router-link>
    </div>

    <div class="footer-bottom">
      <div class="footer-notice-text">
        <p class="footer-notice" v-text="$t('FOOTER.NOTICE.TOP')"></p>
        <p class="footer-notice" v-text="$t('FOOTER.NOTICE.BOTTOM')"></p>
      </div>
    </div>
  </footer>
</template>