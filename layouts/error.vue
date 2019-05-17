<template>
    <div class="page">
        <Container>
            <Row>
                <div v-if="error.statusCode === 404">
                    <Column :sm="4">
                        <img src="~assets/img/error-sad.png" alt="Error">
                    </Column>
                    <Column :sm="8">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                        <p>The page you are looking for does not exist. Sorry!</p>
                        <Button to="/" class="outline primary lg">Go to home</Button>
                    </Column>
                </div>

                <div v-else-if="error.statusCode === 500">
                    <Column :sm="4">
                        <img src="~assets/img/error-sad.png" alt="Error">
                    </Column>
                    <Column :sm="8">
                        <h1>500</h1>
                        <h2>It's not you, It's us.</h2>
                        <p>This page is experiencing internal server issues.</p>
                        <Button to="/" class="outline primary lg">Go to home</Button>
                    </Column>
                </div>

                <div v-else>
                    <Column :sm="4">
                        <img src="~assets/img/error-sad.png" alt="Error">
                    </Column>
                    <Column :sm="8">
                        <h2>Oops!</h2>
                        <p>Looks like something went wrong.</p>
                        <Button to="/" class="outline primary lg">Go to home</Button>
                    </Column>
                </div>
            </Row>
        </Container>
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
    layout: 'header',
    mounted() {
        console.log(this.error);
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

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
