<template>
    <div class="card card--home">
        <div class="card__inner">
            <h2 class="card__title">Last Game Recap</h2>
            <div class="card--home__contents home-recap">
                <div class="home-recap__team team-blue"></div>
                <div class="home-recap__score">
                    <span class="home-recap__gamemode"> {{ game.name }}</span>
                    <span class="home-recap__points">{{ game.teams.blue.points }}&nbsp;&hyphen;&nbsp;{{ game.teams.red.points }}</span>
                </div>
                <div class="home-recap__team team-red"></div>

                <div class="home-recap__matchup">
                    <ul class="home-recap__players home-recap__players--blue">
                        <li>{{ player('blue', 'html').user.username }}</li>
                        <li>{{ player('blue', 'css').user.username }}</li>
                        <li>{{ player('blue', 'js').user.username }}</li>
                    </ul>
                    <ul class="home-recap__pos">
                        <li class="color-html">HTML</li>
                        <li class="color-css">CSS</li>
                        <li class="color-js">JS</li>
                    </ul>
                    <ul class="home-recap__players home-recap__players--red">
                        <li>{{ player('red', 'html').user.username }}</li>
                        <li>{{ player('red', 'css').user.username }}</li>
                        <li>{{ player('red', 'js').user.username }}</li>
                    </ul>
                </div>
                <a href="/games" class="btn btn-primary home-recap__btn">View Full Game</a>
            </div>
        </div>
    </div>

</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component
    export default class Recap extends Vue {
        @Prop() game;

        player(team, language) {
            return this.game.teams[team].players.find(player => player.language.toLowerCase() === language) || {user: {}};
        }

    }
</script>
