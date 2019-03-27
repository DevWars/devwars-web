<template>
                        <!-- <h3 class="modpanel__title">Skill Assessment</h3> -->
                        <div class="row">
                            <div
                                v-for="language in languages"
                                :key="language.name"
                                class="col-sm-4">
                                <div class="lang-rating" :class="['lang-rating--' +language.name]">
                                    <ul class="lang-rating__meter">
                                        <li
                                            v-for="(skill, index) in skillNames"
                                            :key="skill"
                                            :class="{active: index <= language.skill - 1}"
                                        ></li>
                                    </ul>
                                    <div class="lang-rating__main">
                                        <div
                                            class="lang-rating__position"
                                        >{{ language.name | uppercase }}</div>
                                        <div class="lang-rating__reel">
                                            <button
                                                type="button"
                                                class="lang-rating__arrow fa fa-chevron-left"
                                                :class="{disabled: language.skill <= 1}"
                                                @click="language.skill--"
                                            ></button>
                                            <div class="lang-rating__score">{{ language.skill }}</div>
                                            <button
                                                type="button"
                                                class="lang-rating__arrow fa fa-chevron-right"
                                                :class="{disabled: language.skill > 4}"
                                                @click="language.skill++"
                                            ></button>
                                        </div>
                                        <div
                                            class="lang-rating__name"
                                        >{{ skillNames[language.skill] }}</div>
                                    </div>
                                    <p class="lang-rating__desc">{{ tooltip(language) }}</p>
                                </div>
                            </div>
                        </div>
</template>


<script>
export default {
    name: 'CompetitorRegistration',
    props: {
        profile: {
            type: Object,
            required: true,
        },
    },
    data: (vm) => {
        return {
            languages: [
                { name: 'html', skill: vm.profile.skills.html },
                { name: 'css', skill:  vm.profile.skills.css },
                { name: 'js', skill:  vm.profile.skills.js  },
            ],
            skillNames: [
                'Novice',
                'Beginner',
                'Intermediate',
                'Advanced',
                'Expert',
            ],
            htmlTooltips: [
                'You have a basic understanding of HTML, and can use essential tags.',
                'You have a working knowledge of HTML. You understand the basic syntax and ' +
                    'methodology of ordering and adding elements to the DOM (Document Object Model).',
                'You have a strong understanding of HTML, and ability to structure a webpage. You have ' +
                    'a knowledge of a variety of attributes, and know how to use them correctly. You have a ' +
                    'strong understanding of semantics and structural meaning (parameter usage) .',
                'You have worked on larger scale projects, and collaborated with other people. You have ' +
                    'strong experience working on various development projects. You have worked with SEO tools.',
                'You use HTML at a production level. You can create websites from scratch with no use of ' +
                    'frameworks, and have worked as a front-end developer. You have used Shadow DOM in the past.',
            ],
            cssTooltips: [
                'You have basic knowledge of CSS. You understand the basic syntax and methodology ' +
                    'of cascading stylesheets',
                'You have a working knowledge of CSS. You have style elements, and know about different ' +
                    'frameworks. You have used Bootstrap. You have heard of pre-processors. ',
                'You have extensive CSS knowledge. You have experience working with responsive design, ' +
                    'and understand the mobile-first ideology. You understand the issues that can occur with ' +
                    'different browsers. You have used a CMS in the past, and can style elements on them ',
                'You have worked on larger scale projects, and collaborated with other people. You have' +
                    ' strong experience working on various development projects. You understand BEM ' +
                    'practices, and implement them ',
                'You use CSS at a production level. You can style websites from scratch with no ' +
                    'use of frameworks, and have worked as a front-end developer',
            ],
            jsTooltips: [
                'You have a basic knowledge of JavaScript.',
                'You have working knowledge of JavaScript. You understand the basic syntax ' +
                    'and methodology of OOP',
                'You have used Javascript with a popular library or framework, and used it for ' +
                    'DOM manipulation.',
                'You have worked on larger scale projects, and collaborated with other people. ' +
                    'You have strong experience working on various development projects. You have knowledge ' +
                    "of MVC and it's use in creating web application",
                'You use JavaScript at a production level. You make full use of MVC and MV Frameworks, ' +
                    'have and incredible understaning of OOP, and have worked as a professional front-end developer',
            ],
        };
    },
    updated() {
        const values = {};
        this.languages.forEach(skill => {
            values[skill.name] = skill.skill
        });
        this.$emit("change", {
            key: 'skills',
            values,
        });
    },
    methods: {
        tooltip(language) {
            return this[`${language.name}Tooltips`][language.skill - 1];
        },
    },
};
</script>
