# Contributing to DevWars

We would love for you to contribute to DevWars and help make it even better! As a contributor, here are the guidelines we would like you to follow.

## <a name="question"></a> Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [Discord](https://discord.gg/devwars) where the questions can be answered by the DevWars community.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository](https://github.com/devwars/devwars.tv). Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

-   For a **Major Feature**, first open an issue and outline your proposal so that it can be
    discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
    and help you to craft the change so that it is successfully accepted into the project.
-   **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we might ask you to provide a minimal reproduction. Having this will help us greatly without going back & forth to you with additional questions.

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/devwars/devwars.tv/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
   Discussing the design up front helps to ensure that we're ready to accept your work.
1. Fork the devwars/devwars.tv repo.
1. Make your changes in a new git branch:

    ```shell
    git checkout -b my-fix-branch master
    ```

1. Create your patch, **including appropriate test cases**.
1. Run the full test suite, as described in the [Readme](README.md),
   and ensure that all tests pass.
1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit).

    ```shell
    git commit -a
    ```

    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

1. In GitHub, send a pull request to `devwars.tv:master`.

-   If we suggest changes then:

    -   Make the required updates.
    -   Re-run the test suites to ensure tests are still passing.
    -   Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

        ```shell
        git rebase master -i
        git push -f
        ```

That's it! Thank you for your contribution!

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

-   All features or bug fixes **must be tested** by one or more specs (unit-tests).
-   All public API methods **must be documented**. (Details TBC).

## <a name="commit"></a> Commit Message Guidelines

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type** and a **subject**:

```
<type>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

```
docs(changelog): update changelog to beta
```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Type

Must be one of the following:

-   **build**: Changes that affect the build system or external dependencies
-   **ci**: Changes to our CI configuration files and scripts
-   **docs**: Documentation only changes
-   **feat**: A new feature
-   **fix**: A bug fix
-   **perf**: A code change that improves performance
-   **refactor**: A code change that neither fixes a bug nor adds a feature
-   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   **test**: Adding missing tests or correcting existing tests

### Subject

The subject contains a description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize the first letter
-   no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.
