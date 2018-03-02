<template>
    <div class="error-pg">
        <div class="container">
            <div class="row">
                <div v-if="error.statusCode === 404">
                    <div class="col-sm-4">
                        <img src="~/assets/img/error-sad.png" alt="Error" class="error-pg__img">
                    </div>
                    <div class="col-sm-8">
                        <h1 class="error-pg__code">404</h1>
                        <h2 class="error-pg__title">Page not found</h2>
                        <p class="error-pg__desc">The page you are looking for does not exist. Sorry!</p>
                        <nuxt-link to="/" class="btn btn-outline-primary btn-lg">Go to home</nuxt-link>
                    </div>
                </div>

                <div v-else-if="error.statusCode === 500">
                    <div class="col-sm-4">
                        <img src="~/assets/img/error-sad.png" alt="Error" class="error-pg__img">
                    </div>
                    <div class="col-sm-8">
                        <h1 class="error-pg__code">500</h1>
                        <h2 class="error-pg__title">It's not you, It's us.</h2>
                        <p class="error-pg__desc">This page is experiencing internal server issues <span class="font-size-sm">(blame Terence)</span></p>
                        <nuxt-link to="/" class="btn btn-outline-primary btn-lg">Go to home</nuxt-link>
                    </div>
                </div>

                <div v-else>
                    <div class="col-sm-4">
                        <img src="~/assets/img/error-sad.png" alt="Error" class="error-pg__img">
                    </div>
                    <div class="col-sm-8">
                        <h2 class="error-pg__title">Oops!</h2>
                        <p class="error-pg__desc">Looks like something went wrong.</p>
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
  layout: 'header'
}
</script>
