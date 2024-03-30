<style scoped>
.error-page {
  gap: 30px;
  display: flex;
  margin-top: 90px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.error-page .text {
  color: var(--font-color-90);
  max-width: 350px;
  font-size: 0.7rem;
  text-align: center;
}

.error-page .heading {
  font-size: 3rem;
  font-weight: 900;
}
</style>

<template>
  <div class='error-page'>
    <h1 class='heading' v-text='$t("PAGES.ERROR_404.HEADING")'></h1>
    <p class='text' v-text='$t("PAGES.ERROR_404.CONTENT")'></p>
    <img src='../../../assets/img/404.gif' />
  </div>
</template>