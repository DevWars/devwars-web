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
            <a class="sitemap__link" href="/">Home</a>
          </li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="/schedule">Schedule</a>
          </li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="/games">Games</a>
          </li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="/leaderboards">Leaderboards</a>
          </li>
        </ul>
        <ul class="sitemap__list">
          <li class="sitemap__list-item">RESOURCES</li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="/docs">Documentation</a>
          </li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="https://www.discord.gg/devwars" target="_blank">Join Discord</a>
          </li>
        </ul>
        <ul class="sitemap__list">
          <li class="sitemap__list-item">COMPANY</li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="/blog">Blog</a>
          </li>
        </ul>
        <ul class="sitemap__list">
          <li class="sitemap__list-item">EXTRAS</li>
          <li class="sitemap__list-item">
            <a class="sitemap__link" href="https://www.twitchalerts.com/donate/devwars"
               target="_blank">Donate</a>
          </li>
        </ul>
      </div>

      <div class="footer-bottom">
        <ul class="footer-socials">
          <li class="footer-socials__item twitch">
            <a class="footer-socials__link" href="http://www.twitch.tv/devwars" target="_blank">
              <i class="fab fa-twitch"></i>
            </a>
          </li>
          <li class="footer-socials__item discord">
            <a class="footer-socials__link" href="https://www.discord.gg/devwars" target="_blank">
              <i class="fab fa-discord"></i>
            </a>
          </li>
          <li class="footer-socials__item youtube">
            <a class="footer-socials__link" href="https://www.youtube.com/c/DevWars" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
          </li>
          <li class="footer-socials__item reddit">
            <a class="footer-socials__link" href="http://www.reddit.com/r/devwars" target="_blank">
              <i class="fab fa-reddit"></i>
            </a>
          </li>
          <li class="footer-socials__item facebook">
            <a class="footer-socials__link" href="https://www.facebook.com/DevWars" target="_blank">
              <i class="fab fa-facebook"></i>
            </a>
          </li>
          <li class="footer-socials__item twitter">
            <a class="footer-socials__link" href="https://twitter.com/devwarstv" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="footer-socials__item google">
            <a class="footer-socials__link" href="https://plus.google.com/112749022510452176816" target="_blank">
              <i class="fab fa-google-plus"></i>
            </a>
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
