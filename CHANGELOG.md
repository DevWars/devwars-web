# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/devwars/devwars.tv/compare/v0.2.0...v0.2.1) (2020-07-22)


### Features

* games and schedules now use paging implementation ([d61ba48](https://github.com/devwars/devwars.tv/commit/d61ba48c358a5b8a6fcc4fc980848e44d355cd04))
* logs are now viewable from the mods panel ([1b617c8](https://github.com/devwars/devwars.tv/commit/1b617c8612fe641c157e815d42fe2cb041c6c4c2))
* moderation now supports user promotion and demoting ([fc0b389](https://github.com/devwars/devwars.tv/commit/fc0b3898b576d47f36ae1713aa599aac8fbc3a80))
* support for banning and unbanning a user in the moderation panel ([5d5638a](https://github.com/devwars/devwars.tv/commit/5d5638ac68c3c5582892e5d29f9dd17285715ee3))
* support for updating and changing usernames ([f452231](https://github.com/devwars/devwars.tv/commit/f452231fd94c68bd70210bda070df0a6ca312b2b))


### Bug Fixes

* Font-sizes now use rem. Add font-sizes to headings ([577d96a](https://github.com/devwars/devwars.tv/commit/577d96ad8215eba738286df1c54f7bc955a36248))
* reverted the version bump of moment ([15ff417](https://github.com/devwars/devwars.tv/commit/15ff41724c9e3cb187c2b8c13b3d4bc05ccefca0))
* twitch iframe now contains parent (hostname) as required ([fc61840](https://github.com/devwars/devwars.tv/commit/fc618408e694f71970cc78760886dd86800efb78))
* use assigned languages not language ([477deb7](https://github.com/devwars/devwars.tv/commit/477deb74cef3d7c483af5f9a17780769ccc8117a))

# 0.2.0 (2020-04-16)

### Bug Fixes

-   last game recap does not stack ([e12f881](https://github.com/devwars/devwars.tv/commit/e12f881377bb5dc0c797f11ad6913bd409a35344))
-   ability to remove competitor users from a game registration ([ce2c88b](https://github.com/devwars/devwars.tv/commit/ce2c88b697a1c3c0c31d80d41cdecb77c16b8905))
-   add player modal now displays api errors to the user ([ef333d1](https://github.com/devwars/devwars.tv/commit/ef333d11f2edcaa0ba47cbe3060fb0737b399067))
-   add registration user now correctly closes and triggers reload ([6bd320a](https://github.com/devwars/devwars.tv/commit/6bd320a6956f984f6a52c0db3317301b4ad124fc))
-   applying and resigning from games no longer requires refresh ([fd7883b](https://github.com/devwars/devwars.tv/commit/fd7883b1c10924ffa58a31aa436dbf19a3fdf7f5))
-   change font-family for font awesome from pro to free ([eecb42a](https://github.com/devwars/devwars.tv/commit/eecb42a126ea9ca20d76f4cb24d660a1f86886b6)), closes [#57](https://github.com/devwars/devwars.tv/issues/57) [#63](https://github.com/devwars/devwars.tv/issues/63)
-   competitor users are no longer clickable (deleted users) ([5c07cb6](https://github.com/devwars/devwars.tv/commit/5c07cb64d4df4e199cfd17f65d81bd9a87df3098))
-   date of birth is now rendered correctly on the profile page ([32548e8](https://github.com/devwars/devwars.tv/commit/32548e8df108e7b561ea907a0259755732080cd0))
-   game recap now shows scores inline without stacking ([76dc61c](https://github.com/devwars/devwars.tv/commit/76dc61c720e1a93ff31c4e2e75fe9d31316636a4))
-   input fields with placeholders now don't over lay ([0b0bc27](https://github.com/devwars/devwars.tv/commit/0b0bc27d25737432aa3c09ada000c8f071ae7fcd))
-   registration page correctly loads countries to allow for use ([d192c5a](https://github.com/devwars/devwars.tv/commit/d192c5ad0f43b267bd231613a3135df6316a6ef1))
-   tables no longer block mobile scaling ([8369995](https://github.com/devwars/devwars.tv/commit/83699959f6bf290eee37c62396c6c19136d03cf5))
-   toast remove button now removes the toast ([2eb4604](https://github.com/devwars/devwars.tv/commit/2eb4604434d0697f65fcca0327f6a4377bebe49c))
-   updating isBonus is now possible on the moderation panel ([0238295](https://github.com/devwars/devwars.tv/commit/0238295243a80a257301ab16ffcbbafd566295c4))
-   user team colors swapped around ([d513df6](https://github.com/devwars/devwars.tv/commit/d513df6b7cad05d35813a7209560d4b7d854a865))
-   users related accounts are now determined by the user id ([27355b4](https://github.com/devwars/devwars.tv/commit/27355b440559289f90bc16464a7a6542ebc70e91))
-   **audit:** npm audit fixes to improve security. ([54b1e5d](https://github.com/devwars/devwars.tv/commit/54b1e5d0661c062d5a1b2ff03fa9852f7800671a))
-   styles can now be found to the input component input directly ([7fdd928](https://github.com/devwars/devwars.tv/commit/7fdd928b7e5e2b5bfee57dbad90c9df3bbfe6297))

### Features

-   client version is being displayed on the moderation panel ([8e74cfe](https://github.com/devwars/devwars.tv/commit/8e74cfe1677d2344b7cdbe0d1387eb92b1b7d68c))
-   default template values ([1d2d6dd](https://github.com/devwars/devwars.tv/commit/1d2d6dd41c02e9be215b29ae971d6f94e64b3524))
-   Display connection icons next to the user ([5b9ff27](https://github.com/devwars/devwars.tv/commit/5b9ff27353fa6bc268e993096fda79c57b9ccc67))
-   game edit page now supports updating voting and winning results ([663fcd1](https://github.com/devwars/devwars.tv/commit/663fcd1b87c648ecdc3a1bbd28f207816207e2df))
-   game edit page used to update game scores ([52d5e79](https://github.com/devwars/devwars.tv/commit/52d5e79450d8786e105e03123caaf868c1d8fb85))
-   implemented paging for games by seasons ([006be64](https://github.com/devwars/devwars.tv/commit/006be6417a58c7175c06a057b8a612a9ff0a396a))
-   introduction of leaderboards ([ed74126](https://github.com/devwars/devwars.tv/commit/ed74126db1b5ff75e15216e891ea998ca5d0d4e3))
-   results page exists when moderating a finished game ([563e3ef](https://github.com/devwars/devwars.tv/commit/563e3ef0c12c81dead4d54ce680a858729c05ae9))
-   simple moderation panel with support of deletion ([f2f8cae](https://github.com/devwars/devwars.tv/commit/f2f8caec72fed33621c0f5b8b48788739924a561))
-   support for basic auto assignment ([c4d2724](https://github.com/devwars/devwars.tv/commit/c4d27246713b025da70d08b2e4d27129d49abd3a))
-   tabs now exist for components for improved vue functionality. ([de63484](https://github.com/devwars/devwars.tv/commit/de63484ce0a4f0d01f006445457ad7472163a00f))
-   user moderation panel now supports paging, searching and links ([c355931](https://github.com/devwars/devwars.tv/commit/c355931bd0830b6460caf4913647109916184044))
-   users list colors now change on assignment ([b30971b](https://github.com/devwars/devwars.tv/commit/b30971bb13cffc1ea50927b1e8d635a6fc845bb3))
-   Users moderation Panel ([14ff21b](https://github.com/devwars/devwars.tv/commit/14ff21b948de36e0f93ef5fb24869d26310f9a2e))

# 0.1.0 (2020-01-24)

### Bug Fixes

-   .eslintrc upgrade change ([ce5afe5](https://github.com/devwars/devwars.tv/commit/ce5afe58ce410d6b047ae2668d31bb4dc4a40a41))
-   fixed cropping to allow uploading profile images ([ed55968](https://github.com/devwars/devwars.tv/commit/ed55968ca1b5eab169bfdbd4a1493918f3ec5e05))
-   mod panel game default to details as expected ([5770d6f](https://github.com/devwars/devwars.tv/commit/5770d6f3afd4af89cc8807ea595a972c07738e8a))
-   Sex is sent in the supported format: ints ([bd601f6](https://github.com/devwars/devwars.tv/commit/bd601f656069d682d99985d7bb60754ba57ae93e))
-   users related accounts are now determined by the user id ([27355b4](https://github.com/devwars/devwars.tv/commit/27355b440559289f90bc16464a7a6542ebc70e91))
-   **error-messages:** error messages on the toast checks for error and message properties before logging the message directly ([f893967](https://github.com/devwars/devwars.tv/commit/f893967cc7f818b7f2c3e6fa7f33839353f83785))
-   **profile:** When saving, update the profile and not the user, ensuring that its the data object. ([c6d1d5f](https://github.com/devwars/devwars.tv/commit/c6d1d5fd9d3f2f0fd28e4a986b2d7ecee27f0e05))
-   **skills profile:** change the logic for skills according to the back for being 1-5 and not 0-4 ([a218ef2](https://github.com/devwars/devwars.tv/commit/a218ef2bf3a947049085dbd60dca086078602644))
-   **user:** user request errors are now being handled correctly ([2809744](https://github.com/devwars/devwars.tv/commit/28097443bccdeec2a8f2ba6e22614dd72efc3597))
-   **userMenu:** the user menu should click when click on a link ([a1df2a2](https://github.com/devwars/devwars.tv/commit/a1df2a2ab85d03996f704ba2df3f45edecc3bf25))

### Features

-   twitch support ([2205190](https://github.com/devwars/devwars.tv/commit/2205190b003fe76554fbbcb2c278a05cef75ff68))
-   **auth:** add middleware auth ([4e7c82c](https://github.com/devwars/devwars.tv/commit/4e7c82c61190f652cef7edf84e2abeef6fbbf4b0))
-   **email-permissions:** users can now update there email permissions from the settings page ([5313379](https://github.com/devwars/devwars.tv/commit/5313379811e8972f75672c582b9eb32e180e7970))
-   **performance ttfb:** put footer in async loading for improving ttfb ([6e1a2d8](https://github.com/devwars/devwars.tv/commit/6e1a2d84fe1654314bd68a8a995ef475560193a9))
-   **skills:** adding skills sections in a component ([5b22f1a](https://github.com/devwars/devwars.tv/commit/5b22f1af5ecc52e9fa98e188de3513f52ad23100))
