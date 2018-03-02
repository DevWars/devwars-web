<template>
    <div class="docs container">
        <div class="docs__sidebar">
            <div class="docs-nav">
                <a href="#devwars" class="docs-nav__heading">
                    <i class="fa fa-home"></i>
                    <span>DevWars</span>
                </a>
                <ul class="docs-nav__list">
                    <li class="docs-nav__item">
                        <a href="#about" class="docs-nav__link">About</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#positions" class="docs-nav__link">Positions</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#game-modes" class="docs-nav__link">Game Modes</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#themes" class="docs-nav__link">Themes</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#" class="docs-nav__link disabled">Points</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#rules" class="docs-nav__link">Rules</a>
                    </li>
                </ul>

                <a href="#" class="docs-nav__heading">
                    <i class="fa fa-eye"></i>
                    <span>Watching</span>
                </a>
                <ul class="docs-nav__list">
                    <li class="docs-nav__item">
                        <a href="#tools" class="docs-nav__link">Tools</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#voting" class="docs-nav__link">Voting</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#betting" class="docs-nav__link">Betting</a>
                    </li>
                </ul>

                <a href="#" class="docs-nav__heading">
                    <i class="fa fa-gamepad"></i>
                    <span>Playing</span>
                </a>
                <ul class="docs-nav__list">
                    <li class="docs-nav__item">
                        <a href="#requirements" class="docs-nav__link">Requirements</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#" class="docs-nav__link disabled">Editor</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#objectives" class="docs-nav__link">Objectives</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#how-to-win" class="docs-nav__link">How To Win</a>
                    </li>
                </ul>

                <a href="#" class="docs-nav__heading">
                    <i class="fa fa-trophy"></i>
                    <span>Leveling</span>
                </a>
                <ul class="docs-nav__list">
                    <li class="docs-nav__item">
                        <a href="#" class="docs-nav__link disabled">XP</a>
                    </li>
                    <li class="docs-nav__item">
                        <a href="#" class="docs-nav__link disabled">Ranks</a>
                    </li>
                </ul>

                <div class="doc-warning">
                    <div class="doc-warning__title">Under Development</div>
                    <p>This documentation is currently under development. More sections will be added over time, please check back frequently for updates.</p>
                    <em>Last Modified: Feb 24, 2018</em>
                </div>
            </div>
        </div>
        <div class="docs__main">
            <article id="devwars">
                <header>
                    <h1>DevWars</h1>
                    <p>A live game show for developers</p>
                </header>
                <section id="about">
                    <h2>About</h2>
                    <p>People of all levels are invited to participate in an exhilarating battle to create the best website they can within 60 minutes. Teams are formed of 3 people, with the team's members each controlling a single language - HTML, CSS and JavaScript.</p>
                </section>
                <section id="positions">
                    <h2>Positions</h2>
                    <p>Each player can only code in the language they are assigned to. This requires teams to communicate in order to complete their website in unison. There are currently only 3 positions available to play in DevWars: HTML, CSS and JavaScript.</p>
                    <ul class="dw-positions doc-section">
                        <li class="dw-positions__item">
                            <div class="dw-positions__circle dw-positions__circle--html">
                                <div class="dw-positions__items">
                                    <span class="bracket">&lt;</span>
                                    <span class="symbol">/</span>
                                    <span class="lang">html</span>
                                    <span class="bracket">&gt;</span>
                                </div>
                            </div>
                            <div class="dw-positions__title color-html">HTML</div>
                            <div class="dw-positions__role">Templating</div>
                        </li>
                        <li class="dw-positions__item">
                            <div class="dw-positions__circle dw-positions__circle--css">
                            <div class="dw-positions__items">
                                <span class="bracket">{</span>
                                <span class="symbol">;</span>
                                <span class="lang">css</span>
                                <span class="bracket">}</span>
                            </div>
                            </div>
                            <div class="dw-positions__title color-css">CSS</div>
                            <div class="dw-positions__role">Styling</div>
                        </li>
                        <li class="dw-positions__item">
                            <div class="dw-positions__circle dw-positions__circle--js">
                                <div class="dw-positions__items">
                                    <span class="bracket">(</span>
                                    <span class="symbol">$</span>
                                    <span class="lang">js</span>
                                    <span class="bracket">)</span>
                                </div>
                            </div>
                            <div class="dw-positions__title color-js">JAVASCRIPT</div>
                            <div class="dw-positions__role">Functionality</div>
                        </li>
                    </ul>
                    <p>
                        Each position plays a critical role for the team. HTML is in charge of templating the DOM, CSS handles the design for the website and JavaScript brings functionality into the website.
                    </p>
                </section>
                <section id="game-modes">
                    <h2>Game Modes</h2>
                    <p>In DevWars, each game mode offers unique playing experience with its own set of rules and conditions.</p>

                    <section>
                        <h3>Classic</h3>
                        <span class="label label-outline-white label-sm">3 VS 3</span>
                        <span class="label label-outline-html label-sm">HTML</span>
                        <span class="label label-outline-css label-sm">CSS</span>
                        <span class="label label-outline-js label-sm">JAVASCRIPT</span>
                        <p>
                            Time: 60:00
                        </p>
                        <p>
                            This action-packed game mode is the only one that features all 3 supported languages. Two teams of three, face off against each other with a theme and a set of objectives.
                        </p>
                    </section>

                    <section>
                        <h3>Zen Garden</h3>
                        <span class="label label-outline-white label-sm">1 VS 1</span>
                        <span class="label label-outline-css label-sm">CSS</span>
                        <p>
                            Time: 60:00
                        </p>
                        <p>
                            This 1 vs 1 game mode provides both teams the same pre-made HTML document. Both teams can only use CSS to style their website. Objectives are not available in Zen Garden games.
                        </p>
                    </section>

                    <section class="coming-soon">
                        <h3>Coffee Run</h3>
                        <span class="label label-outline-white label-sm">1 VS 1</span>
                        <span class="label label-outline-js label-sm">JAVASCRIPT</span>
                        <p>
                            Coming soon!
                        </p>
                    </section>
                </section>

                <section id="themes">
                    <h2>Themes</h2>
                    <p>Every game mode is paired with a theme to keep the websites comparable between both teams.</p>
                </section>

                <section id="rules">
                    <h2>Rules</h2>
                    <ol>
                        <li>No Frameworks of any kind are to be used.</li>
                        <li>The DevWars Twitch channel must not be open whilst competing.</li>
                        <li>No copying and pasting of code, however copying code and URLs from teammates is acceptable.</li>
                        <li>After the 60 minute timer has run out, your code can no longer be modified.</li>
                        <li>Inline styling is not allowed. All styling must be performed using CSS.</li>
                    </ol>
                </section>
            </article>

            <article id="watching">
                <header>
                    <h1>Watching</h1>
                    <p>Take your viewing experience to a whole new level.</p>
                </header>

                <section id="tools">
                    <h2>Tools</h2>
                    <p>Below are products and resources that will help improve your viewing experience during a live game.</p>
                    <div class="doc-section doc-tools__section">
                        <ul class="doc-tools">
                            <li class="doc-tools__item">
                                <a href="https://watch.devwars.tv" class="doc-tools__link" target="_blank">
                                    <div class="doc-tools__circle">
                                        <i class="fa fa-code"></i>
                                    </div>
                                    <div class="doc-tools__main">
                                        <h3 class="doc-tools__title">Live Code</h3>
                                        <p class="doc-tools__desc">Watch players code in real-time and preview their websites.</p>
                                    </div>
                                </a>
                            </li>
                            <li class="doc-tools__item">
                                <a href="https://www.discord.gg/devwars" class="doc-tools__link" target="_blank">
                                    <div class="doc-tools__circle">
                                        <i class="fa fa-headphones"></i>
                                    </div>
                                    <div class="doc-tools__main">
                                        <h3 class="doc-tools__title">Eavesdrop</h3>
                                        <p class="doc-tools__desc">Listen in on what the teams are saying during a live game.</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                <section id="voting">
                    <h2>Voting</h2>
                    <p>In addition to the objectives teams aim to fulfil, our audience awards bonus points in the categories UI and UX. Depending on how many votes a team gets in each category up to two points can be earned if certain thresholds are exceeded. To participate in voting, use either !blue or !red in the chat to express your personal favorite in each category when prompted.</p>

                    <section>
                        <h3>UI / User Interface</h3>
                        <p>
                            Base your vote on the overall design of the website. The interface should feel coherent with consistent use of elements. The website should be responsive, look good on mobile and follow the game's theme.
                        </p>
                    </section>

                    <section>
                        <h3>UX / User Experience</h3>
                        <p>
                            Base your vote on how you feel when interacting with the website. It should be simple to use and easy to navigate. Look for things such as bugs or poor execution of functionality by way of design.
                        </p>
                    </section>
                </section>

                <section id="betting">
                    <h2>Betting</h2>
                    <p>Putting your hard earned Devcoins on the line you will be able to bet on the outcome of a match by typing !vote amount team in the chat. However, make your decision quickly as betting is only open for ten minutes after the first five minutes of the match are over.</p>
                </section>
            </article>

            <article id="playing">
                <header>
                    <h1>Playing</h1>
                    <p>Compete in live DevWars games for a unique team-building experience.</p>
                </header>

                <section id="requirements">
                    <h2>Requirements</h2>

                    <section>
                        <h3>Browsers</h3>
                        <div class="row row-normaled align-center doc-section">
                            <div class="col-sm-3">
                                <img src="~/assets/img/browsers/chrome_48x48.png" title="Chrome">
                                <p>v.61 +</p>
                            </div>
                            <div class="col-sm-3">
                                <img src="~/assets/img/browsers/firefox_48x48.png" title="Firefox">
                                <p>v.56 +</p>
                            </div>
                            <div class="col-sm-3">
                                <img src="~/assets/img/browsers/edge_48x48.png" title="Edge">
                                <p>v.16 +</p>
                            </div>
                            <div class="col-sm-3">
                                <img src="~/assets/img/browsers/safari_48x48.png" title="Safari">
                                <p>v.11 +</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3>Communication</h3>
                        <div class="doc-communications row row-normaled align-center doc-section">
                            <div class="col-sm-3">
                                <i class="fa fa-microphone"></i>
                                <p>Microphone</p>
                            </div>
                            <div class="col-sm-3">
                                <img src="~/assets/img/discord-logo.svg" title="Discord">
                                <p>Discord</p>
                            </div>
                            <div class="col-sm-3">
                                <img src="~/assets/img/docs/en-lang.png" title="Speak English">
                                <p>English</p>
                            </div>
                        </div>
                        <p>It is required that you have a microphone so that you can speak with your teammates during a live game. Contestants must be able to read, write and speak English.</p>
                        <div class="doc-disclaimer">Communication is not required on Zen Garden games.</div>

                        <p>All voice communications are hosting on our <a href="https://www.discord.gg/devwars" target="_blank">Official Discord</a>.</p>
                    </section>
                </section>

                <section id="objectives">
                    <h2>Objectives</h2>
                    <p>Primary focus in 3v3 matches is to fulfil certain objectives in order to gain the points needed to overtake the opposing team. These do not have to be completed in order and as soon as a team declares an objective fulfilled, the host checks if the requirements have been met. Only if that is the case the team gets a point.</p>

                    <section>
                        <h3>Completing Objectives</h3>
                        <p>When an objective is complete, players must request the objective to be removed by the game show host in order to secure the point(s).</p>
                    </section>

                    <section>
                        <h3>Bonus Objectives</h3>
                        <p>Unlike standard objectives, bonus objectives are worth 2 points instead of 1 and are denoted by a <span class="color-bonus">gold color</span>. By default, bonus objectives are locked and cannot be achieved until all 4 standard objectives have been completed.</p>
                    </section>

                    <section>
                        <h3>Strikes</h3>
                        <p>If the game show host finds a submitted objective to be incomplete, the team will earn a strike. Once a team reaches 3 strikes, the bonus objective will be eliminated from that team.</p>
                    </section>

                    <section>
                        <h3>Dropped Objectives</h3>
                        <p>After the clock runs out, the game show host will do a final review of all the objectives completed for both teams. Points earned from a completed objective will be lost if found to be incomplete during the final review.</p>
                    </section>
                </section>

                <section id="how-to-win">
                    <h2>How to win</h2>
                    <p>In order to achieve victory a team has to earn the most points out of the points gained from each objective and the bonus objective as well as the additional points our audience awards as soon as the match is over.</p>
                </section>
            </article>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        layout: 'header',
        middleware: 'guest'
    })

    export default class Docs extends Vue {

        mounted() {
            let scrollable = document.querySelector('.docs__main');

            scrollable.addEventListener('scroll', event => {
                let sections = Array.prototype.slice.apply(document.querySelectorAll('section'));
                let links = Array.prototype.slice.apply(document.querySelectorAll('.docs-nav__link'));

                links.forEach(it => it.classList.remove('active'));

                let active = sections.filter(it => it.getBoundingClientRect().y > 0).sort((a, b) => {
                    let keyA = a.getBoundingClientRect().y;
                    let keyB = b.getBoundingClientRect().y;

                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                })[0];

                let link = document.querySelector(`.docs-nav__link[href='#${active.id}']`)

                if (link)
                    link.classList.add('active');
            });
        }
    }
</script>
