<template>
    <div class="page">
        <div class="container">
            <div class="row">
                <div v-if="error.statusCode === 404">
                    <div class="col-sm-4">
                        <img src="~assets/img/error-sad.png" alt="Error">
                    </div>
                    <div class="col-sm-8">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                        <p>The page you are looking for does not exist. Sorry!</p>
                        <nuxt-link to="/" class="btn btn-outline-primary btn-lg">Go to home</nuxt-link>
                    </div>
                </div>

                <div v-else-if="error.statusCode === 500">
                    <div class="col-sm-4">
                        <img src="~assets/img/error-sad.png" alt="Error">
                    </div>
                    <div class="col-sm-8">
                        <h1>500</h1>
                        <h2>It's not you, It's us.</h2>
                        <p>
                            This page is experiencing internal server issues <span class="font-size-sm">(blame Terence)</span>
                        </p>
                        <nuxt-link to="/" class="btn btn-outline-primary btn-lg">Go to home</nuxt-link>
                    </div>
                </div>

                <div v-else>
                    <div class="col-sm-4">
                        <img src="~assets/img/error-sad.png" alt="Error">
                    </div>
                    <div class="col-sm-8">
                        <h2>Oops!</h2>
                        <p>Looks like something went wrong.</p>
                        <nuxt-link to="/" class="btn btn-outline-primary btn-lg">Go to home</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['error'],
        layout: 'header',

        mounted() {
            console.log(this.error);
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

.page {
    padding: $l-space 0 $xl-space;
}

h1 {
    font-size: $display1-size;
}

h2 {
    margin-bottom: $xxs-space;
}

p {
    margin-bottom: $ms-space;
    font-size: $p-lead-font-size;
    color: $text-color-secondary;
}

img {
    max-width: 250px;
    margin: 0 auto;
}
</style>
