<template>
  <div class="footer" ng-hide="hide">
    <div class="newsletter-box">
      <div class="container">
        <h2 class="newsletter-box__title">Receive our weekly challenge, and other DevWars updates!</h2>
        <a href="http://eepurl.com/bffR51" target="_blank" class="newsletter-box__btn btn btn-primary">Subscribe</a>
      </div>
    </div>

    <div class="container">
      <div class="sitemap">
        <ul class="sitemap__list">
          <li class="sitemap__list-item">DEVWARS</li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/">Home</nuxt-link>
          </li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/schedule">Schedule</nuxt-link>
          </li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/games">Games</nuxt-link>
          </li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/leaderboards">Leaderboards</nuxt-link>
          </li>
        </ul>
        <ul class="sitemap__list">
          <li class="sitemap__list-item">RESOURCES</li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/docs">Documentation</nuxt-link>
          </li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="https://www.discord.gg/devwars" target="_blank">Join Discord</nuxt-link>
          </li>
        </ul>
        <ul class="sitemap__list">
          <li class="sitemap__list-item">COMPANY</li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/blog">Blog</nuxt-link>
          </li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="/contact">Contact</nuxt-link>
          </li>
        </ul>
        <ul class="sitemap__list">
          <li class="sitemap__list-item">EXTRAS</li>
          <li class="sitemap__list-item">
            <nuxt-link class="sitemap__link" to="https://www.twitchalerts.com/donate/devwars"
               target="_blank">Donate</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="footer-bottom">
        <ul class="footer-socials">
          <li class="footer-socials__item twitch">
            <nuxt-link class="footer-socials__link" to="http://www.twitch.tv/devwars" target="_blank">
              <i class="fab fa-twitch"></i>
            </nuxt-link>
          </li>
          <li class="footer-socials__item discord">
            <nuxt-link class="footer-socials__link" to="https://www.discord.gg/devwars" target="_blank">
              <i class="fab fa-discord"></i>
            </nuxt-link>
          </li>
          <li class="footer-socials__item youtube">
            <nuxt-link class="footer-socials__link" to="https://www.youtube.com/c/DevWars" target="_blank">
              <i class="fab fa-youtube"></i>
            </nuxt-link>
          </li>
          <li class="footer-socials__item reddit">
            <nuxt-link class="footer-socials__link" to="http://www.reddit.com/r/devwars" target="_blank">
              <i class="fab fa-reddit"></i>
            </nuxt-link>
          </li>
          <li class="footer-socials__item facebook">
            <nuxt-link class="footer-socials__link" to="https://www.facebook.com/DevWars" target="_blank">
              <i class="fab fa-facebook"></i>
            </nuxt-link>
          </li>
          <li class="footer-socials__item twitter">
            <nuxt-link class="footer-socials__link" to="https://twitter.com/devwarstv" target="_blank">
              <i class="fab fa-twitter"></i>
            </nuxt-link>
          </li>
          <li class="footer-socials__item google">
            <nuxt-link class="footer-socials__link" to="https://plus.google.com/112749022510452176816" target="_blank">
              <i class="fab fa-google-plus"></i>
            </nuxt-link>
          </li>

        </ul>
        <div class="footer-legal">
          <span class="footer-legal__copy">Copyright &copy; 2018 DevWars, LLC</span>
          <span class="footer-legal__copy">All rights reserved</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component
    export default class Footer extends Vue {
    }
</script>
