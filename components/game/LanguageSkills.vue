<template>
    <Row class="LanguageSkills">
        <Column v-for="language in languages" :key="language.name" :md="4">
            <div class="language" :class="language.name">
                <ul class="meter">
                    <li
                        v-for="(skill, index) in skillNames"
                        :key="skill"
                        :class="{ active: index <= language.skill - 1 }"
                    />
                </ul>

                <div class="main">
                    <div class="position">
                        {{ language.name | uppercase }}
                    </div>
                    <div class="reel">
                        <div
                            class="arrow fa fa-chevron-left"
                            :class="{ disabled: language.skill <= 1 }"
                            @click="language.skill--"
                        />
                        <div class="score">
                            {{ language.skill }}
                        </div>
                        <div
                            class="arrow fa fa-chevron-right"
                            :class="{ disabled: language.skill > 4 }"
                            @click="language.skill++"
                        />
                    </div>
                    <div class="name">
                        {{ skillNames[language.skill - 1] }}
                    </div>
                </div>

                <p class="desc">
                    {{ tooltip(language) }}
                </p>
            </div>
        </Column>
    </Row>
</template>

<script>
export default {
    name: 'LanguageSkills',

    props: {
        profile: {
            type: Object,
            required: true,
        },
    },

    data: (vm) => {
        return {
            languages: [
                {
                    name: 'html',
                    skill: vm.profile.skills ? vm.profile.skills.html : 1,
                },
                {
                    name: 'css',
                    skill: vm.profile.skills ? vm.profile.skills.css : 1,
                },
                {
                    name: 'js',
                    skill: vm.profile.skills ? vm.profile.skills.js : 1,
                },
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
                'You have a working knowledge of HTML. You understand the basic syntax and methodology of ordering and adding elements to the DOM (Document Object Model).',
                'You have a strong understanding of HTML, and ability to structure a webpage. You have a knowledge of a variety of attributes, and know how to use them correctly. You have a strong understanding of semantics and structural meaning (parameter usage.',
                'You have worked on larger scale projects, and collaborated with other people. You have strong experience working on various development projects. You have worked with SEO tools.',
                'You use HTML at a production level. You can create websites from scratch with no use of frameworks, and have worked as a front-end developer. You have used Shadow DOM in the past.',
            ],
            cssTooltips: [
                'You have basic knowledge of CSS. You understand the basic syntax and methodology of cascading stylesheets',
                'You have a working knowledge of CSS. You have style elements, and know about different frameworks. You have used Bootstrap. You have heard of pre-processors. ',
                'You have extensive CSS knowledge. You have experience working with responsive design, and understand the mobile-first ideology. You understand the issues that can occur with different browsers.',
                'You have worked on larger scale projects, and collaborated with other people. You have strong experience working on various development projects. You understand BEM practices, and implement them ',
                'You use CSS at a production level. You can style websites from scratch with no use of frameworks, and have worked as a front-end developer',
            ],
            jsTooltips: [
                'You have a basic knowledge of JavaScript.',
                'You have working knowledge of JavaScript. You understand the basic syntax and methodology of OOP',
                'You have used Javascript with a popular library or framework, and used it for DOM manipulation.',
                "You have worked on larger scale projects, and collaborated with other people. You have strong experience working on various development projects. You have knowledge of MVC and it's use in creating web application",
                'You use JavaScript at a production level. You make full use of MVC and MV Frameworks, have and incredible understaning of OOP, and have worked as a professional front-end developer',
            ],
        };
    },

    updated() {
        const values = {};

        this.languages.forEach((skill) => {
            values[skill.name] = skill.skill;
        });

        this.$emit('change', {
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

<style lang="scss" scoped>
@import 'utils.scss';

.LanguageSkills {
    .language {
        background-color: lighten($bg-color-2, 5%);

        @include breakpoint(md) {
            margin-bottom: 30px;
        }

        .meter {
            @extend %list-unstyled;
            @extend %flex-justify;

            li {
                height: 6px;
                background-color: $bg-color-4;
                flex: 1;
            }

            li:not(:last-of-type) {
                border-right: $border-size solid lighten($bg-color-2, 5%);
            }
        }

        .main {
            padding: $s-space 0;
            text-align: center;
        }

        .reel {
            @extend %flex-justify;
        }

        .position,
        .name {
            font-weight: $font-weight-bold;
        }

        .score {
            font-size: $display4-size;
            font-weight: $font-weight-heavy;
        }

        .arrow {
            padding: 30px;
            font-size: $h3-font-size;
            cursor: pointer;

            &.disabled {
                pointer-events: none;
                color: $text-color-muted;
            }
        }

        .desc {
            min-height: 130px;
            padding: $s-space 30px;
            background-color: $bg-color-3;
            line-height: 1.3;
            font-size: $font-size-base;
        }

        @each $name,
            $color in (html: $html-color, css: $css-color, js: $js-color)
        {
            &.#{$name} {
                .meter li.active {
                    background-color: $color;
                }

                .position {
                    color: $color;
                }
            }
        }
    }
}
</style>
