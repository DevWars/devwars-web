<template>
    <div>
        <PageBanner title="Contact"/>

        <div class="footer-offset container">
            <div class="row">
                <div class="col-md-8">
                    <Card v-show="!submitted" class="dark plain">
                        <form v-async-submit="[sendEmail]">
                            <Input v-model="name" label="Name" class="group" required/>

                            <Input v-model="email" label="Email" class="group" required/>

                            <Textarea v-model="message" label="Message" class="group" required/>

                            <ButtonGroup class="align-right">
                                <Button type="submit" class="primary">Send Email</Button>
                            </ButtonGroup>
                        </form>
                    </Card>
                    <Card v-show="submitted" class="dark plain">
                        <div class="align-center">
                            <h1>Thank you!</h1>
                            <div class="mt-xs mb-md">
                                <h4>We received your email, you will hear back from us soon.</h4>
                            </div>
                        </div>
                    </Card>
                </div>

                <div class="col-md-4">
                    <Card class="dark plain">contact@devwars.tv</Card>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex';
import PageBanner from '~/components/layout/PageBanner';
import Card from '~/components/Card';
import Input from '~/components/form/Input';
import Textarea from '~/components/form/Textarea';

export default {
    name: 'Contact',
    components: {
        PageBanner,
        Card,
        Input,
        Textarea,
    },
    data: () => {
        return {
            name: '',
            email: '',
            message: '',
            submitted: false,
        };
    },
    methods: {
        async sendEmail() {
            try {
                const { name, email, message } = this;

                const response = await this.$axios.$post('/contact', {
                    name,
                    email,
                    message,
                });

                this.toastSuccess(response);

                this.submitted = true;
            } catch (e) {
                this.toastErrors(e);
            }
        },
        ...mapActions({
            toastErrors: 'toast/errors',
            toastSuccess: 'toast/success',
        }),
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

form {
    margin-top: $grid-gutter-width;
}
</style>
