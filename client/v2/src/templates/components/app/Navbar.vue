<style scoped>
nav {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 25;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
  background: var(--background-color-10-08);
}

.nav-wrapper {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 1550px;
  display: flex;
  align-items: center;
}

.nav-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  border: none;
  background: none;
  color: var(--font-color-100);
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-hamburger:hover {
  background: var(--background-color-55-05);
}

.nav-logo-link {
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  color: var(--font-color-100);
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-logo-link:hover {
  background: var(--background-color-55-05);
}

.nav-logo-text {
  margin-left: 10px;
  font-size: .9rem;
  font-weight: 300;
  text-transform: uppercase;
}

.nav-logo {
  width: 35px;
  height: 35px;
}

.nav-menu {
  display: flex;
  list-style-type: none;
  height: 100%;
}

.nav-menu-link {
  font-size: .7rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--font-color-100);
  padding: 0px 20px;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-menu-link:hover,
.nav-search-box-button:hover {
  background: var(--background-color-55-05)
}

.nav-toolbar {
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;
  margin-left: auto;
  align-items: center;
  height: 100%;
}

.nav-search-box {
  position: relative;
  height: calc(100% - 20px);
}

.nav-search-box.active+.nav-search-box-button {
  background: var(--background-color-55-05);
}

.nav-search-bar {
  position: relative;
  display: grid;
  grid-template-columns: auto 20ch;
  gap: 15px;
  height: 100%;
  border-radius: var(--border-radius-secondary);
  -webkit-border-radius: var(--border-radius-secondary);
  -moz-border-radius: var(--border-radius-secondary);
  -ms-border-radius: var(--border-radius-secondary);
  -o-border-radius: var(--border-radius-secondary);
  align-items: center;
  background: var(--background-color-25);
  padding: 0px 20px;
}

.nav-search-bar-icon {
  font-size: .7rem;
}

.nav-search-bar-input {
  background: var(--background-color-25);
  border: none;
  width: 140px;
  height: 100%;
  font-size: .7rem;
  font-family: 'Poppins', 'Roboto', sans-serif;
  color: var(--font-color-95);
}

.nav-search-bar-input::placeholder {
  font-size: .7rem;
  font-family: 'Poppins', 'Roboto', sans-serif;
  opacity: 1;
  color: var(--font-color-85);
}

.nav-search-bar-filters {
  width: 110px;
  position: absolute;
  right: 9px;
  padding: 5px 10px;
  border: none;
  color: var(--font-color-95);
  font-size: .6rem;
  background: var(--background-color-35);
  font-family: 'Poppins', 'Roboto', sans-serif;
  font-weight: 500;
  border-radius: var(--border-radius-secondary);
  -webkit-border-radius: var(--border-radius-secondary);
  -moz-border-radius: var(--border-radius-secondary);
  -ms-border-radius: var(--border-radius-secondary);
  -o-border-radius: var(--border-radius-secondary);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.nav-search-bar-filter-icon {
  position: absolute;
  right: 15px;
  font-size: .6rem;
}

.nav-search-bar-results {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  max-height: 385px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
  border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -webkit-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -moz-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -ms-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -o-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  box-shadow: var(--box-shadow-primary);
}

.nav-search-bar-results.focus {
  display: block;
  top: 50px;
  opacity: 1;
  visibility: visible;
}

.nav-search-bar-result-wrapper {
  background: var(--background-color-20);
  display: grid;
  padding: 7.5px 0px;
  border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -webkit-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -moz-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -ms-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -o-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
}

.nav-search-bar-results-heading {
  font-size: .65rem;
  font-weight: 600;
  color: var(--font-color-100);
}

.nav-search-bar-result--anime {
  display: grid;
  grid-template-columns: 55px auto;
  gap: 10px;
}

.nav-search-bar-result--anime:hover,
.nav-search-bar-result--studio:hover,
.nav-search-bar-result--user:hover {
  background: var(--background-color-35);
}

.nav-search-bar-result--anime-img {
  width: 100%;
  border-radius: var(--border-radius-primary);
  -webkit-border-radius: var(--border-radius-primary);
  -moz-border-radius: var(--border-radius-primary);
  -ms-border-radius: var(--border-radius-primary);
  -o-border-radius: var(--border-radius-primary);
}

.nav-search-bar-result--anime-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: .7rem;
  font-weight: 500;
  height: fit-content;
  color: var(--font-color-100);
}

.nav-search-bar-result--anime,
.nav-search-bar-result--studio,
.nav-search-bar-result--user,
.nav-search-bar-result-none {
  padding: 7.5px 15px;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-search-bar-result-none {
  text-align: center;
}

.nav-search-bar-result--studio,
.nav-search-bar-result--username,
.nav-search-bar-result-none-text {
  font-size: .7rem;
  font-weight: 400;
  color: var(--font-color-100);
  text-decoration: none;
}

.nav-search-bar-result--user {
  display: grid;
  grid-template-columns: 40px auto;
  gap: 15px;
}

.nav-search-bar-result--user-avatar {
  width: 100%;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.nav-search-bar-result--user-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-search-bar-result--user-role,
.nav-search-bar-result--anime-info {
  font-size: .6rem;
  font-weight: 400;
  color: var(--font-color-95);
}

.nav-search-box-button {
  display: none;
  width: 60px;
  height: 100%;
  border: none;
  outline: none;
  font-size: .8rem;
  background: none;
  color: var(--font-color-100);
  cursor: pointer;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-login-button {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0px 20px;
  padding: 10px 20px;
  font-size: .7rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--font-color-15);
  border: none;
  background: var(--theme-primary-color);
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  border-radius: var(--border-radius-primary);
  -webkit-border-radius: var(--border-radius-primary);
  -moz-border-radius: var(--border-radius-primary);
  -ms-border-radius: var(--border-radius-primary);
  -o-border-radius: var(--border-radius-primary);
}

@media (max-width:955px) {
  .nav-hamburger {
    display: flex;
  }

  .nav-logo-link {
    padding: 0 10px;
  }

  .nav-logo-text,
  .nav-menu,
  .nav-search-button,
  .nav-socials {
    display: none;
  }
}

@media (max-width:755px) {
  .nav-toolbar {
    grid-gap: 0px;
  }

  .nav-search-box {
    z-index: -1;
    padding: 0px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: -60px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    -ms-border-radius: 0px;
    -o-border-radius: 0px;
    transition: all var(--transition-primary);
    -webkit-transition: all var(--transition-primary);
    -moz-transition: all var(--transition-primary);
    -ms-transition: all var(--transition-primary);
    -o-transition: all var(--transition-primary);
  }

  .nav-search-box-button {
    display: block;
  }

  .nav-search-box.active {
    opacity: 1;
    visibility: visible;
    top: 60px;
    background: var(--background-color-10);
  }

  .nav-search-box.active .nav-search-bar-results {
    display: block;
    top: 60px;
    opacity: 1;
    visibility: visible;
  }

  .nav-search-bar {
    grid-template-columns: 20px auto;
    border-radius: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    -ms-border-radius: 0px;
    -o-border-radius: 0px;
  }

  .nav-search-bar-input {
    width: calc(100% - 110px);
  }
}

@media (max-width:670px) {
  .nav-logo-link p {
    display: none;
  }
}

.nav-user {
  padding: 0px 20px;
  gap: 15px;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-user:hover,
.nav-user.active {
  background: var(--background-color-55-05);
}

.nav-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.nav-user-dropdown {
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  right: 0px;
  bottom: 0px;
  width: 365px;
  position: absolute;
  background: var(--background-color-10);
  transform: translateY(100%) translate3d(0, -30px, 0);
  -webkit-transform: translateY(100%) translate3d(0, -30px, 0);
  -moz-transform: translateY(100%) translate3d(0, -30px, 0);
  -ms-transform: translateY(100%) translate3d(0, -30px, 0);
  -o-transform: translateY(100%) translate3d(0, -30px, 0);
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
  border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -webkit-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -moz-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -ms-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  -o-border-radius: 0px 0px var(--border-radius-primary) var(--border-radius-primary);
  box-shadow: var(--box-shadow-primary);
}

.nav-user.active .nav-user-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(100%) translate3d(0, 0px, 0);
  -webkit-transform: translateY(100%) translate3d(0, 0px, 0);
  -moz-transform: translateY(100%) translate3d(0, 0px, 0);
  -ms-transform: translateY(100%) translate3d(0, 0px, 0);
  -o-transform: translateY(100%) translate3d(0, 0px, 0);
}

.nav-user-menu {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 7.5px 0px;
}

.nav-user-menu:nth-of-type(2) {
  border-top: 1px solid var(--background-color-60);
  border-bottom: 1px solid var(--background-color-60);
}

.nav-user-menu-item {
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
}

.nav-user-menu-item:hover {
  background: var(--background-color-55-05);
}

.nav-user-menu-link {
  padding: 15px 30px;
  display: flex;
  gap: 30px;
  align-items: baseline;
  font-size: .7rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: capitalize;
  color: var(--font-color-95);
  transition: color var(--transition-primary);
  -webkit-transition: color var(--transition-primary);
  -moz-transition: color var(--transition-primary);
  -ms-transition: color var(--transition-primary);
  -o-transition: color var(--transition-primary);
}

.nav-user-menu-link-sign {
  text-transform: uppercase;
  font-size: .55rem;
  color: #E1E1E1;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  letter-spacing: .5px;
  text-align: right;
  padding: 5px 10px;
  background: var(--background-color-20);
  width: fit-content;
  border-radius: var(--border-radius-primary);
  -webkit-border-radius: var(--border-radius-primary);
  -moz-border-radius: var(--border-radius-primary);
  -ms-border-radius: var(--border-radius-primary);
  -o-border-radius: var(--border-radius-primary);
}

.nav-user-menu-link-name {
  display: block;
}

.nav-user-menu-link-description {
  font-size: .65rem;
  color: var(--font-color-90);
  font-weight: 300;
  text-transform: none;
}

@media (max-width:555px) {
  .nav-user {
    position: initial;
  }

  .nav-user-dropdown {
    width: 100%;
    left: 0px;
  }
}

.rwd-nav-wrapper {
  position: fixed;
  top: 0px;
}

.rwd-nav-menu-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: -360px;
  height: 100vh;
  width: 300px;
  background: var(--background-color-10);
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
  transform: translate3d(0px, 0, 0);
  -webkit-transform: translate3d(0px, 0, 0);
  -moz-transform: translate3d(0px, 0, 0);
  -ms-transform: translate3d(0px, 0, 0);
  -o-transform: translate3d(0px, 0, 0);
  z-index: 1;
}

.rwd-nav-open .rwd-nav-menu-wrapper {
  transform: translate3d(360px, 0, 0);
  -webkit-transform: translate3d(360px, 0, 0);
  -moz-transform: translate3d(360px, 0, 0);
  -ms-transform: translate3d(360px, 0, 0);
  -o-transform: translate3d(360px, 0, 0);
}

.rwd-nav-close {
  position: absolute;
  top: 0px;
  right: -60px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color-95);
  background: var(--background-color-10);
  cursor: pointer;
  transition: all .25s ease-in-out;
  -webkit-transition: all .25s ease-in-out;
  -moz-transition: all .25s ease-in-out;
  -ms-transition: all .25s ease-in-out;
  -o-transition: all .25s ease-in-out;
}

.rwd-nav-close:hover {
  color: var(--theme-primary-color)
}

.rwd-nav-menu {
  width: 100%;
  list-style-type: none;
}

.rwd-nav-menu-item {
  transition: background var(--transition-primary);
  -webkit-transition: background var(--transition-primary);
  -moz-transition: background var(--transition-primary);
  -ms-transition: background var(--transition-primary);
  -o-transition: background var(--transition-primary);
}

.rwd-nav-menu-item:hover {
  background: var(--background-color-55-05);
}

.rwd-nav-menu-item:hover .rwd-nav-menu-link {
  color: var(--font-color-100);
}

.rwd-nav-menu-link {
  padding: 20px 30px;
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: 30px;
  align-items: center;
  text-decoration: none;
  font-size: .75rem;
  font-weight: 500;
  color: var(--font-color-95);
  transition: color var(--transition-primary);
  -webkit-transition: color var(--transition-primary);
  -moz-transition: color var(--transition-primary);
  -ms-transition: color var(--transition-primary);
  -o-transition: color var(--transition-primary);
}

.rwd-nav-menu-link i {
  margin-right: 15px;
  font-size: .8rem;
}

.mobile-nav-wrapper {
  display: none;
}

@media only screen and (hover: none) and (pointer: coarse) and (max-width: 540px) {
  .nav-logo-link {
    padding: 0px 20px;
  }

  .nav-search-button,
  .nav-socials {
    display: none;
  }

  .nav-hamburger {
    display: none;
  }

  .rwd-nav-wrapper {
    display: none;
  }

  .mobile-nav-wrapper {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0px;
    left: 0px;
    background: var(--background-color-15);
    transition: bottom var(--transition-primary);
    -webkit-transition: bottom var(--transition-primary);
    -moz-transition: bottom var(--transition-primary);
    -ms-transition: bottom var(--transition-primary);
    -o-transition: bottom var(--transition-primary);
    border-top: 1px solid var(--background-color-35);
  }

  .mobile-nav-menu {
    display: flex;
    list-style-type: none;
    justify-content: space-between;
    padding: 0px 20px;
  }

  .mobile-nav-menu-link {
    padding: 15px;
    color: var(--font-color-85);
    font-size: .5rem;
    text-decoration: none;
    text-transform: capitalize;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .mobile-nav-menu-link i {
    font-size: .75rem;
  }

  .mobile-nav-menu-link:hover {
    color: var(--theme-primary-color);
  }
}
</style>

<script setup lang='ts'>

</script>

<template>
  <nav>
    <div class='nav-wrapper'>

      <ul class='nav-menu'>

      </ul>
    </div>
  </nav>
</template>