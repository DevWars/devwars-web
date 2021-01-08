<template>
    <Container class="docs">
        <Column :sm="3" class="sidebar">
            <div class="nav">
                <ButtonIcon href="#devwars" icon="home" class="link">DevWars</ButtonIcon>
                <ul>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#positions">Positions</a>
                    </li>
                    <li>
                        <a href="#game-modes">Game Modes</a>
                    </li>
                    <li>
                        <a href="#themes">Themes</a>
                    </li>
                    <li>
                        <a href="#objectives">Objectives</a>
                    </li>
                    <li>
                        <a href="#points">Points</a>
                    </li>
                    <li>
                        <a href="#rules">Rules</a>
                    </li>
                </ul>

                <ButtonIcon href="#watching" icon="eye" class="link">Watching</ButtonIcon>
                <ul>
                    <li>
                        <a href="#tools">Tools</a>
                    </li>
                    <li>
                        <a href="#voting">Voting</a>
                    </li>
                    <li>
                        <a href="#betting">Betting</a>
                    </li>
                    <li>
                        <a href="#bot-commands">Bot Commands</a>
                    </li>
                </ul>

                <ButtonIcon href="#competing" icon="gamepad" class="link">Competing</ButtonIcon>
                <ul>
                    <li>
                        <a href="#requirements">Requirements</a>
                    </li>
                    <li>
                        <a href="#editor">Editor</a>
                    </li>
                </ul>

                <ButtonIcon href="#earning" icon="trophy" class="link">Earning</ButtonIcon>
                <ul>
                    <li>
                        <a href="#xp" class="disabled">XP</a>
                    </li>
                    <li>
                        <a href="#ranks" class="disabled">Ranks</a>
                    </li>
                    <li>
                        <a href="#devcoins">Devcoins</a>
                    </li>
                    <li>
                        <a href="#badges" class="disabled">Badges</a>
                    </li>
                </ul>

                <div class="warning">
                    <h5>Under Development</h5>
                    <p>
                        This documentation is currently under development. More sections will be added over time, please check back frequently for updates.
                    </p>
                    <em>Last Modified: January 8, 2021</em>
                </div>
            </div>
        </Column>

        <Column :sm="9" class="main">
            <article id="devwars">
                <header>
                    <h1>DevWars</h1>
                    <p>A live game show for developers</p>
                </header>
                <section id="about">
                    <h2>About</h2>
                    <p>
                        People of all levels are invited to participate in an exhilarating battle to create the best website they can within 60 minutes. Teams are formed of 3 people, with the team's members each controlling a single language - HTML, CSS and JavaScript.
                    </p>
                </section>
                <section id="positions">
                    <h2>Positions</h2>
                    <p>
                        Each player can only code in the language they are assigned to. This requires teams to communicate in order to complete their website in unison. There are currently only 3 positions available to play in DevWars: HTML, CSS and JavaScript.
                    </p>
                    <Row class="positions section">
                        <Column :sm="4" class="html">
                            <div class="circle">
                                <div class="elements">
                                    <span class="bracket">&lt;</span>
                                    <span class="symbol">/</span>
                                    <span class="lang">html</span>
                                    <span class="bracket">&gt;</span>
                                </div>
                            </div>
                            <h5>HTML</h5>
                            <div class="role">Templating</div>
                        </Column>
                        <Column :sm="4" class="css">
                            <div class="circle">
                                <div class="elements">
                                    <span class="bracket">{</span>
                                    <span class="symbol">;</span>
                                    <span class="lang">css</span>
                                    <span class="bracket">}</span>
                                </div>
                            </div>
                            <h5>CSS</h5>
                            <div class="role">Styling</div>
                        </Column>
                        <Column :sm="4" class="js">
                            <div class="circle">
                                <div class="elements">
                                    <span class="bracket">(</span>
                                    <span class="symbol">$</span>
                                    <span class="lang">js</span>
                                    <span class="bracket">)</span>
                                </div>
                            </div>
                            <h5>JAVASCRIPT</h5>
                            <div class="role">Functionality</div>
                        </Column>
                    </Row>
                    <p>
                        Each position plays a critical role for the team. HTML is in charge of templating the DOM, CSS handles the design for the website, and JavaScript brings functionality into the website.
                    </p>
                </section>
                <section id="game-modes">
                    <h2>Game Modes</h2>
                    <p>
                        In DevWars, each game mode offers unique playing experience with its own set of rules and conditions.
                    </p>

                    <section>
                        <h3>Classic</h3>
                        <Tag class="outline sm">3 VS 3</Tag>
                        <Tag class="outline html sm">HTML</Tag>
                        <Tag class="outline css sm">CSS</Tag>
                        <Tag class="outline js sm">JAVASCRIPT</Tag>
                        <p>Time: 60:00</p>
                        <p>
                            This action-packed game mode is the only one that features all 3 supported languages. Two teams of three, face off against each other with a theme and a set of objectives.
                        </p>
                    </section>

                    <section>
                        <h3>Blitz</h3>
                        <Tag class="outline sm">1 VS 1</Tag>
                        <Tag class="outline html sm">HTML</Tag>
                        <Tag class="outline css sm">CSS</Tag>
                        <Tag class="outline js sm">JAVASCRIPT</Tag>
                        <p>Time: 30:00</p>
                        <p>
                            A fast-paced of Classic where both competing players have access to all 3 languages.
                        </p>
                    </section>

                    <section>
                        <h3>Zen Garden</h3>
                        <Tag class="outline sm">1 VS 1</Tag>
                        <Tag class="outline css sm">CSS</Tag>
                        <p>Time: 30:00 - 60:00</p>
                        <p>
                            This 1 vs 1 game mode provides both teams the same pre-made HTML document. Both teams can only use CSS to style their website.
                        </p>
                    </section>
                </section>

                <section id="themes">
                    <h2>Themes</h2>
                    <p>
                        Every game has a theme that all teams must follow.
                    </p>
                </section>

                <section id="objectives">
                    <h2>Objectives</h2>
                    <p>
                        Primary focus during the game is to complete objectives in order to gain the points needed to overtake the opposing team.
                    </p>

                    <section>
                        <h3>Completing Objectives</h3>
                        <p>
                            During the game, if the host finds an objective was completed, the team will earn a point. At the end of the game, if the objective no longer works, the point will be retracted.
                        </p>
                    </section>

                    <section>
                        <h3>Bonus Objectives</h3>
                        <p>
                            Unlike standard objectives, bonus objectives are
                            worth 2 points instead of 1 and are denoted by a
                            <span class="color-bonus">gold color</span>. Bonus
                            objectives are much harder to complete, teams must be
                            mindful of the time remaining when working on them.
                        </p>
                    </section>
                </section>

                <section id="points">
                    <h3>Points</h3>
                    <p>
                        The team with the most points wins the game. Below is a chart displaying a list of points you can earn in each phase:
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Phase</th>
                                <th>Possible Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Standard Objectives</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Bonus Objectives</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Voting (Design)</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Voting (Function)</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <strong>10</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </section>

                <section id="rules">
                    <h2>Rules</h2>
                    <ol>
                        <li>No Frameworks of any kind are to be used.</li>
                        <li>
                            No copying and pasting of code, however copying code and URLs from teammates is acceptable.
                        </li>
                        <li>
                            After the timer has run out, your code can no longer be modified.
                        </li>
                        <li>
                            Player must code in the <a href="#editor">DevWars Editor</a>, coding in any other editor/IDE is strictly prohibitted.
                        </li>
                        <li>
                            Players must code in the language they are assigned to. For example, if you are assigned HTML, you cannot open a &lt;style&gt; tag to code CSS properties. Javascript may add HTML so long as it was copied from their HTML player and is used for dynamic purposes (i.e. templates).
                        </li>
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
                    <p>
                        Below are products and resources that will help improve your viewing experience during a live game.
                    </p>
                    <div class="section tools">
                        <ul>
                            <li>
                                <a
                                    href="https://live.devwars.tv"
                                    target="_blank"
                                >
                                    <div class="tools__circle">
                                        <Icon name="code" />
                                    </div>
                                    <div class="tools__main">
                                        <h3>Live Code</h3>
                                        <p>
                                            Watch players code in real-time and preview their websites.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.discord.gg/devwars"
                                    target="_blank"
                                >
                                    <div class="tools__circle">
                                        <Icon name="headphones" />
                                    </div>
                                    <div class="tools__main">
                                        <h3>Eavesdrop</h3>
                                        <p>
                                            Listen in on what the teams are saying during a live game.
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                <section id="voting">
                    <h2>Voting</h2>
                    <p>
                        In addition to the objectives, our audience awards additional points in the categories <a href="#vote-design">Design</a> and <a href="#vote-function">Function</a>.
                    </p>
                    <p>
                        To participate in voting, type <code>!blue</code> or <code>!red</code> in the chat to express your personal favorite in each category when prompted.
                    </p>

                    <section>
                        <h3>Point Distribution</h3>
                        <p>
                            Depending on how many votes a team gets in each category up to two (2) points can be earned if certain thresholds are exceeded. Thresholds are determined by the percentage of  votes per team.
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Thresholds</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&lt;= 50%</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>&gt; 50%</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>&gt;= 80%</td>
                                    <td>2</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="vote-design" class="vote-phase">
                        <h3>Design</h3>
                        <Tag class="outline sm info">Classic</Tag>
                        <Tag class="outline sm warning">Blitz</Tag>
                        <p>
                            Base your vote on the overall look and feel of the website.
                        </p>
                        <ul>
                            <li><strong>Look for:</strong> Design, Animations, Responsiveness</li>
                            <li><strong>Ignore:</strong> Functionality, Features, Bugs</li>
                        </ul>

                        <section>
                            <Tag class="outline sm success">Zen Garden</Tag>
                            <p>
                                Base your vote on the overall look and feel of the website.
                            </p>
                            <ul>
                                <li><strong>Look for:</strong> Functionality, Features, Bugs</li>
                                <li><strong>Ignore:</strong> Design, Animations, Responsiveness</li>
                            </ul>
                        </section>
                    </section>

                    <section id="vote-function" class="vote-phase">
                        <h3>Function</h3>
                        <Tag class="outline sm info">Classic</Tag>
                        <Tag class="outline sm warning">Blitz</Tag>
                        <p>
                            Base your vote on the websites features and functionality.
                        </p>
                        <ul>
                            <li><strong>Look for:</strong> Functionality, Features, Bugs</li>
                            <li><strong>Ignore:</strong> Design, Animations, Responsiveness</li>
                        </ul>
                    </section>

                    <section id="vote-responsive" class="vote-phase">
                        <h3>Responsive</h3>
                        <Tag class="outline sm success">Zen Garden</Tag>
                        <p>
                            Base your vote on the overall look and feel of the website.
                        </p>
                        <ul>
                            <li><strong>Look for:</strong> Responsiveness, Mobile Friendliness</li>
                            <li><strong>Ignore:</strong> Design, Animations</li>
                        </ul>
                    </section>
                </section>

                <section id="betting">
                    <h2>Betting</h2>
                    <p>
                        During the beginning of each game, you will have the opportunity to place a bet with <a href="#devcoins">Devcoins</a> on the outcome of the game. When you place a bet, you are betting on which team will complete the most amount of objectives, not which team you think will win. This is to prevent bias voting in the <a href="#voting">voting phases</a>.
                    </p>
                    <p>
                        You can bet with the following command in the Twitch chat:
                        <br />
                        <code>!bet [amount] [option]</code>
                    </p>

                    <section>
                        <p>
                            <code>[amount]</code>
                            <br />
                            Enter the amount of Devcoins you want to bet.
                        </p>
                    </section>

                    <section>
                        <p>
                            <code>[option]</code>
                            <br />Enter the option you are betting on.
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Value</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>blue</td>
                                    <td>Bet on blue team</td>
                                </tr>
                                <tr>
                                    <td>red</td>
                                    <td>Bet on red team</td>
                                </tr>
                                <tr>
                                    <td>tie</td>
                                    <td>Bet on both teams tying</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <p>
                            <code>!clearbet</code>
                            <br />Clears your last placed bet.
                        </p>
                    </section>

                    <section>
                        <h3>Payouts</h3>
                        <p>
                            Your payout is influenced by the bet sizes placed on other options. If you bet on a team where 80% of the bets were placed, then you will have higher odds of winning, thus you will earn a smaller reward.
                        </p>
                    </section>
                </section>

                <section id="bot-commands">
                    <h2>Bot Commands</h2>
                    <p>
                        A list of commands you can use on the <a href="https://twitch.tv/devwars" target="_blank">DevWars Twitch channel</a>
                    </p>

                    <section>
                        <p>
                            <code>!watch</code>
                            <br />Outputs links for red and blue team's code editors and websites for live games.
                        </p>
                    </section>

                    <section>
                        <p>
                            <code>!discord</code>
                            <br />Get link for <a href="https://discord.gg/devwars" target="_blank">DevWars Discord</a>
                        </p>
                    </section>

                    <section>
                        <p>
                            <code>!coins</code>
                            <br />See how many Devcoins you have.
                        </p>
                    </section>

                    <section>
                        <p>
                            <code>!hype</code>
                            <br />Aboard the Hypetrain when it comes around to earn more coins.
                        </p>
                    </section>
                </section>
            </article>

            <article id="competing">
                <header>
                    <h1>Competing</h1>
                    <p>
                        Compete in live DevWars games for a unique team-building experience.
                    </p>
                </header>

                <section id="requirements">
                    <h2>Requirements</h2>

                    <section>
                        <h3>Browsers</h3>
                        <Row class="browsers normalize section">
                            <Column :sm="3">
                                <img
                                    src="/img/browsers/chrome_48x48.png"
                                    title="Chrome"
                                />
                                <p>v.61 +</p>
                            </Column>
                            <Column :sm="3">
                                <img
                                    src="/img/browsers/firefox_48x48.png"
                                    title="Firefox"
                                />
                                <p>v.56 +</p>
                            </Column>
                            <Column :sm="3">
                                <img
                                    src="/img/browsers/edge_48x48.png"
                                    title="Edge"
                                />
                                <p>v.16 +</p>
                            </Column>
                            <Column :sm="3">
                                <img
                                    src="/img/browsers/safari_48x48.png"
                                    title="Safari"
                                />
                                <p>v.11 +</p>
                            </Column>
                        </Row>
                    </section>

                    <section>
                        <h3>Communication</h3>
                        <Row class="communications normalize section">
                            <Column :sm="3">
                                <Icon name="microphone" />
                                <p>Microphone</p>
                            </Column>
                            <Column :sm="3">
                                <Icon name="brands/discord" />
                                <p>Discord</p>
                            </Column>
                            <Column :sm="3">
                                <img src="/img/docs/en-lang.png" title="Speak English" />
                                <p>English</p>
                            </Column>
                        </Row>

                        <p>
                            It is required that you have a microphone so that you can speak with your teammates during a live game. Contestants must be able to read, write and speak English.
                        </p>
                        <div class="disclaimer">Communication is not required on Zen Garden games.</div>

                        <p>
                            All voice communications are hosted on our
                            <a
                                href="https://www.discord.gg/devwars"
                                target="_blank"
                            >Discord</a>.
                        </p>
                    </section>
                </section>

                <section id="editor">
                    <h2>Editor</h2>

                    <section>
                        <h3>Game View</h3>
                        <p>
                            Each player has their own view with a full-height editor, a window to display the rendered website and documents to preview other team members.
                        </p>
                        <p>
                            During the game, players can see the game timer, points, and objectives.
                        </p>
                    </section>

                    <section>
                        <h3>Supported Keys</h3>
                        <p>
                            You can use the following keyboard shortcuts in the DevWars editor (currently only displaying Windows keyboard layout):
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span class="keybinding">Ctrl+S</span>
                                    </td>
                                    <td>Save document</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="keybinding">Ctrl+D</span>
                                    </td>
                                    <td>Find next matching selection</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="keybinding">Ctrl+F</span>
                                    </td>
                                    <td>Find</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="keybinding">Ctrl+H</span>
                                    </td>
                                    <td>Replace</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="keybinding">Ctrl+G</span>
                                    </td>
                                    <td>Go to line number</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span
                                            class="keybinding"
                                        >Ctrl+Space</span>
                                    </td>
                                    <td>Trigger auto complete</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h3>Saving Changes</h3>
                        <p>
                            It is important for you to save your document frequently using <span class="keybinding">Ctrl+S</span>. Make sure to only save when your code is complete. The viewers and game host will not be able to render your website until you have saved your changes.
                        </p>
                    </section>
                </section>
            </article>

            <article id="earning">
                <header>
                    <h1>Earning</h1>
                    <p>Earn XP to level up and collect Devcoins to spend!</p>
                </header>

                <section id="devcoins">
                    <h2>Devcoins</h2>
                    <p>Earn Devcoins to spend on cool elements in the Shop.</p>

                    <section>
                        <h3>How to earn</h3>
                        <p>
                            Below are all the different ways you can earn more
                            precious Devcoins:
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Method</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Twitch Chat (offline)</strong>
                                    </td>
                                    <td>Awarded every 15 minutes</td>
                                    <td>
                                        <Devcoins :amount="10" class="xs" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Twitch Chat (live)</strong>
                                    </td>
                                    <td>Awarded every 15 minutes</td>
                                    <td>
                                        <Devcoins :amount="20" class="xs" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Twitch Chat Bonus</strong>
                                    </td>
                                    <td>10% chance of randomly receiving bonus coins</td>
                                    <td>
                                        <span class="keybinding">0 - 999</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Hypetrain</strong>
                                    </td>
                                    <td>Earn coins with <code>!hype</code> when Hypetrain is active</td>
                                    <td>
                                        <span class="keybinding">Variable</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Betting</strong>
                                    </td>
                                    <td>
                                        Place
                                        <a href="#betting">Bets</a> during a
                                        game
                                    </td>
                                    <td>
                                        <span class="keybinding">Variable</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Badges</strong>
                                    </td>
                                    <td>
                                        Earn
                                        <a href="/badges">Badges</a>
                                    </td>
                                    <td>
                                        <span class="keybinding">Variable</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Competing</strong>
                                    </td>
                                    <td>
                                        <a href="#competing">Compete</a> in a DevWars game
                                    </td>
                                    <td>
                                        <span class="keybinding">Variable</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
            </article>
        </Column>
    </Container>
</template>

<script>
import Devcoins from '@/components/Devcoins';
import Tag from '@/components/Tag';

export default {
    name: 'Docs',

    components: { Devcoins, Tag },

    layout: 'header',

    mounted() {
        if (!this.$route.hash) {
            return;
        }

        const anchored = document.querySelector(this.$route.hash);

        if (anchored) {
            anchored.scrollIntoView();
        }

        const scrollable = document.querySelector('.main');

        scrollable.addEventListener('scroll', () => {
            const sections = Array.prototype.slice.apply(
                document.querySelectorAll('section'),
            );
            const links = Array.prototype.slice.apply(
                document.querySelectorAll('.nav__link'),
            );

            links.forEach((it) => it.classList.remove('active'));

            const active = sections
                .filter((it) => it.getBoundingClientRect().y > 0)
                .sort((a, b) => {
                    const keyA = a.getBoundingClientRect().y;
                    const keyB = b.getBoundingClientRect().y;

                    if (keyA < keyB) {
                        return -1;
                    }
                    if (keyA > keyB) {
                        return 1;
                    }
                    return 0;
                })[0];

            const link = document.querySelector(
                `.nav__link[href='#${active.id}']`,
            );

            if (link) {
                link.classList.add('active');
            }
        });
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';
$ol-bullet-size: 20px;

/*  ========================================================================
01. Doc Layout
========================================================================= */
.docs {
    position: relative;
    height: calc(100vh - #{$header-height});
}

.sidebar,
.main {
    height: calc(100vh - #{$header-height});
    overflow: auto;
}

.sidebar {
    padding-top: $m-space;
    padding-bottom: $m-space;
}

.main {
    padding: $grid-gutter-width 0 $m-space;
    background-color: rgba($bg-color-3, 0.6);
    float: right;
}

.section {
    padding: $m-space 0;
}

.nav {
    line-height: 1;

    & > a {
        display: block;
        padding: $xs-space 0 $xxs-space;
        color: $text-color-primary;
    }

    ul {
        @extend %list-unstyled;
        padding-left: 25px;
        padding-bottom: $xs-space;
    }

    li > a {
        display: block;
        padding: $xxs-space 0;
        color: $text-color-secondary;

        &:hover,
        &.active {
            font-weight: $font-weight-semibold;
        }

        &.active {
            color: $brand-primary;
        }

        &.disabled {
            opacity: 0.3;
            pointer-events: none;
        }
    }

    .ButtonIcon /deep/ .inner {
        line-height: 1;
    }
}

article {
    border-top: $border-size solid $brand-primary;
    padding: 30px;
    background-color: $bg-color-2;
    margin-top: 30px;

    header {
        padding-top: $xs-space;
        padding-bottom: $m-space;
    }

    & > header,
    & > section {
        border-bottom: $border-size solid $divider-color;
        padding-bottom: 40px;
    }

    section {
        padding-top: 30px;

        &:last-of-type {
            border-bottom: 0;
        }

        section:last-of-type {
            padding-bottom: 0;
        }

        ul {
            padding-left: $grid-gutter-width;
        }

        &.coming-soon {
            opacity: 0.25;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        text-transform: initial;
    }

    h1 {
        color: $text-color-primary;
    }

    h2 {
        font-size: 24px;
        color: $text-color-primary;
    }

    h3 {
        font-weight: $font-weight-regular;
        font-size: $font-size-lg;
        color: $text-color-primary;
    }

    p,
    ul,
    ol {
        padding: $grid-gutter-width 0 0;
        color: rgba(#fff, 0.85);
    }

    ol {
        counter-reset: a;
        list-style: none;

        li {
            padding-top: $xxs-space;
            padding-bottom: $xxs-space;
            padding-left: $ol-bullet-size + $xs-space;
            position: relative;
        }
    }

    ol > li:before {
        @include aspect-ratio(1, 1);
        width: $ol-bullet-size;
        counter-increment: a;
        content: counter(a);
        background: $bg-color-4;
        color: $text-color-primary;
        font-size: 13px;
        font-weight: $font-weight-semibold;
        line-height: 1;
        text-align: center;
        padding: 4px 0;
        border-radius: 10px;
        position: absolute;
        left: 0;
    }

    table {
        margin-top: $grid-gutter-width;

        thead tr {
            text-align: left;
        }

        th,
        td {
            padding: $xxs-space 0;
        }
    }
}

/*  ========================================================================
01.1 Doc Components
========================================================================= */
code,
.keybinding {
    padding: 2px 4px;
    border-radius: $border-radius;
    font-family: $code-font-face;
}

code {
    background-color: rgba($brand-secondary, 0.1);
    color: $brand-secondary;
}

.keybinding {
    background-color: rgba($brand-primary, 0.1);
    color: $brand-primary;
}

.disclaimer {
    padding: $xxs-space 0;
    font-size: $font-size-sm;
    font-style: italic;

    &:before {
        content: '* ';
    }
}

// Not currently using -- delete this comment when you do
.callout {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid $text-color-muted;
    border-left-width: $border-size-lg;
    border-radius: $border-radius;

    &.warning {
        border-left-color: $warning-color;
    }
}

/*  ========================================================================
01.2 Doc Components
========================================================================= */
.positions {
    @extend %list-unstyled;
    text-align: center;

    .circle {
        @include aspect-ratio(1, 1);
        max-width: 85px;
        border-width: $border-size;
        border-style: solid;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        cursor: default;
    }

    .elements {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-weight: $font-weight-bold;

        .lang {
            display: none;
        }
    }

    h5 {
        padding-top: 20px;
        font-weight: $font-weight-bold;
    }

    .role {
        color: $text-color-secondary;
    }

    .circle:hover {
        .lang {
            display: inline-block;
        }
        .symbol {
            display: none;
        }
    }

    @each $lang, $color in (html: $html-color, css: $css-color, js: $js-color) {
        .#{$lang} {
            .circle {
                border-color: $color;
                color: $color;
            }

            h5 {
                color: $color;
            }
        }
    }
}

.browsers {
    text-align: center;
}

.communications {
    text-align: center;

    img,
    .Icon {
        display: block;
        height: 48px;
        margin: 0 auto;
        opacity: 0.88;
    }
}

.tools {
    padding-bottom: $xs-space !important;

    ul {
        @extend %list-unstyled;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 0 !important;
    }

    li {
        flex-shrink: 0;
        width: 48%;
        margin: 0 0 30px;
    }

    a {
        display: flex;
        align-items: center;
        height: 100px;
        padding: 0 $xs-space;
        background-color: lighten($bg-color-2, 3%);
        box-shadow: 0 1px 5px 0 rgba($bg-color-4, 0.47),
            0 7px 17px 0 rgba($bg-color-4, 0.41);
        transition: box-shadow 0.2s ease-in-out;

        &:hover {
            box-shadow: 0 1px 5px 0 rgba($bg-color-4, 0.57),
                0 7px 17px 0 rgba($bg-color-4, 0.71);
        }
    }

    &__circle {
        width: 50px;
        height: 50px;
        margin-right: $grid-gutter-width;
        background-color: $bg-color-3;
        border-radius: 50%;
        overflow: hidden;
        position: relative;

        .Icon {
            @extend %absolute-center;
            font-size: 50px * 0.4;
            color: $text-color-secondary;
        }
    }

    &__main {
        flex: 1;
        line-height: 1.4;
    }

    h3 {
        font-family: $alt-font-face;
        margin-bottom: $xxxs-space;
        font-weight: $font-weight-bold !important;
        font-size: $font-size-base !important;
        color: $brand-primary !important;
    }

    p {
        padding-top: 0 !important;
        font-size: $font-size-base;
        color: $text-color-secondary;
    }
}

.warning {
    border-top: 1px solid $warning-color;
    margin-top: $grid-gutter-width;
    background-color: rgba($warning-color, 0.025);
    padding: $s-space;

    h5 {
        margin-bottom: $xs-space;
        font-weight: $font-weight-bold;
    }

    p {
        margin-bottom: 30px;
        font-size: $font-size-sm;
        line-height: 1.3;
    }
}

.vote-phase {
    .Tag {
        margin-top: 10px;
    }
    li:first-child strong {
        color: $success-color;
    }

    li:last-child strong {
        color: $danger-color;
    }
}

.color-bonus {
    color: $bonus-color;
}
</style>
