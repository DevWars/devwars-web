<template>
    <div>
        <div class="ribbon"></div>
        <div class="container">
            <div class="row-lift">
                <div class="heading">
                    <h1>Compete in DevWars</h1>
                </div>
            </div>
        </div>

        <div class="footer-offset">
            <div class="container">
                <div class="mod-card">
                    <form v-async-submit="[submit]">
                        <h3 class="modpanel__subtitle">About you</h3>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <input v-model="competitor.first_name" type="text" class="form-control" required>
                                <label>First name</label>
                            </div>
                            <div class="col-sm-6 form-group">
                                <input v-model="competitor.last_name" type="text" class="form-control" required>
                                <label>Last name</label>
                            </div>
                        </div>


                        <div class="form-group">
                            <input v-model="competitor.address" type="text" class="form-control" required>
                            <label>Address</label>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 form-group">
                                <input v-model="competitor.city" type="text" class="form-control" required>
                                <label>City</label>
                            </div>
                            <div class="col-sm-3 form-group">
                                <input v-model="competitor.state" type="text" class="form-control" required>
                                <label>State/Province/Region</label>
                            </div>
                            <div class="col-sm-2 form-group">
                                <input v-model="competitor.zip" type="text" class="form-control" required>
                                <label>Zip/Postal Code</label>
                            </div>
                            <div class="col-sm-3 form-group">
                                <div class="select-container">
                                    <select v-model="competitor.country" class="form-control" required>
                                        <option value="">Select country</option>
                                        <option :key="country" v-for="country in countries">{{ country }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4 form-group">
                                <input v-model="day" type="text" class="form-control" placeholder="DD"
                                       required>
                                <label>Date of birth</label>
                            </div>
                            <div class="col-sm-4 form-group">
                                <input v-model="month" type="text" class="form-control" placeholder="MM"
                                       required>
                            </div>
                            <div class="col-sm-4 form-group">
                                <input v-model="year" type="text" class="form-control" placeholder="YYYY"
                                       required>
                            </div>
                        </div>
                        <div class="form-group">
                            <input v-model="competitor.company" type="text" class="form-control" required>
                            <label>Company</label>
                        </div>


                        <h3 class="modpanel__subtitle">Skill Assessment</h3>
                        <div class="row">
                            <div class="col-sm-4" v-for="language in languages" :key="language.name">
                                <div class="lang-rating" :class="['lang-rating--' +language.name]">
                                    <ul class="lang-rating__meter">
                                        <li :class="{active: index <= language.skill}"
                                            v-for="(skill, index) in skillNames" :key="skill"></li>
                                    </ul>
                                    <div class="lang-rating__main">
                                        <div class="lang-rating__position">{{ language.name | uppercase }}</div>
                                        <div class="lang-rating__reel">
                                            <button type="button" class="lang-rating__arrow fa fa-chevron-left"
                                                    :class="{disabled: language.skill < 1}"
                                                    @click="language.skill--"></button>
                                            <div class="lang-rating__score">{{ language.skill + 1}}</div>
                                            <button type="button" class="lang-rating__arrow fa fa-chevron-right"
                                                    :class="{disabled: language.skill > 3}"
                                                    @click="language.skill++"></button>
                                        </div>
                                        <div class="lang-rating__name">{{ skillNames[language.skill] }}</div>
                                    </div>
                                    <p class="lang-rating__desc">
                                        {{ tooltip(language) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h3 class="modpanel__subtitle">Requirements</h3>

                        <!--<div class="form-group">-->
                        <!--<button class="btn btn-discord btn-icon">-->
                        <!--<img src="/assets/img/discord-logo.svg">-->
                        <!--<span>Connect Discord</span>-->
                        <!--</button>-->
                        <!--<button class="btn btn-outline-success btn-icon disabled" style="opacity: 1;">-->
                        <!--<i class="fa fa-check"></i>-->
                        <!--<span>Discord Connected</span>-->
                        <!--</button>-->
                        <!--</div>-->

                        <p>A microphone is required to play in DevWars to communicate with your team during a game.</p>
                        <div class="form-group">
                            <input type="checkbox" class="form-control" required>
                            <label>I have a microphone</label>
                        </div>

                        <button class="btn btn-primary btn-lg">Register to Compete</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import moment from 'moment';

    import * as countryList from 'country-list';
    import Http from "../../services/Http";

    @Component({
        components: {},
        middleware: 'auth'
    })
    export default class CompetitorRegistration extends Vue {
        month = '';
        day = '';
        year = '';

        languages = [{name: 'html', skill: 0}, {name: 'css', skill: 0}, {name: 'js', skill: 0}];
        competitor = {};

        countries = Object.keys(countryList().getNameList()).map(it => it[0].toUpperCase() + it.slice(1));

        skillNames = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];

        htmlTooltips = ["You have a basic understanding of HTML, and can use essential tags.", "You have a working knowledge of HTML. You understand the basic syntax and methodology of ordering and adding elements to the DOM (Document Object Model).", "You have a strong understanding of HTML, and ability to structure a webpage. You have a knowledge of a variety of attributes, and know how to use them correctly. You have a strong understanding of semantics and structural meaning (parameter usage) .", "You have worked on larger scale projects, and collaborated with other people. You have strong experience working on various development projects. You have worked with SEO tools.", "You use HTML at a production level. You can create websites from scratch with no use of frameworks, and have worked as a front-end developer. You have used Shadow DOM in the past."];
        cssTooltips = ["You have basic knowledge of CSS. You understand the basic syntax and methodology of cascading stylesheets", "You have a working knowledge of CSS. You have style elements, and know about different frameworks. You have used Bootstrap. You have heard of pre-processors. ", "You have extensive CSS knowledge. You have experience working with responsive design, and understand the mobile-first ideology. You understand the issues that can occur with different browsers. You have used a CMS in the past, and can style elements on them ", "You have worked on larger scale projects, and collaborated with other people. You have strong experience working on various development projects. You understand BEM practices, and implement them ", "You use CSS at a production level. You can style websites from scratch with no use of frameworks, and have worked as a front-end developer"];
        jsTooltips = ["You have a basic knowledge of JavaScript.", "You have working knowledge of JavaScript. You understand the basic syntax and methodology of OOP", "You have used Javascript with a popular library or framework, and used it for DOM manipulation.", "You have worked on larger scale projects, and collaborated with other people. You have strong experience working on various development projects. You have knowledge of MVC and it's use in creating web application.", "You use JavaScript at a production level. You make full use of MVC and MV Frameworks, have and incredible understaning of OOP, and have worked as a professional front-end developer"];

        tooltip(language) {
            return this[language.name + 'Tooltips'][language.skill];
        }

        async submit() {
            let date = moment.utc(`${this.month} ${this.day} ${this.year}`, 'MM DD YYYY').startOf('day');

            this.languages.forEach(language => {
                this.competitor[language + 'Rate'] = language.skill;
            });

            this.competitor.dob = date.unix() * 1000;

            try {
                await Http.for('user/competitor').save(this.competitor);

                if(this.game){
                    await this.$store.dispatch('game/apply', this.game);
                }

                this.$store.dispatch('toast/success', `Congratulations! You are now a competitor!`);
            } catch(e) {
                this.$store.dispatch('toast/errors', e);
            }
        }

        async asyncData({query}) {
            if(!query.game) return {};

           return {game: await Http.for('game').byID(query.game)}
        }
    }
</script>
