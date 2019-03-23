<template>
    <div>
        <PageBanner title="Contact"/>

        <div class="footer-offset container">
            <div class="row">
                <div class="col-md-8">
                    <Card v-show="!submitted" class="dark plain">
                        <form v-async-submit="[sendEmail]">
                            <div class="form-group">
                                <Input v-model="name" required/>
                                <label>Name</label>
                            </div>
                            <div class="form-group">
                                <Input v-model="email" required/>
                                <label>Email</label>
                            </div>
                            <div class="form-group">
                                <textarea
                                    v-model="message"
                                    class="form-control"
                                    rows="8"
                                    placeholder="Message"
                                ></textarea>
                            </div>

                            <div class="align-right">
                                <button type="submit" class="btn btn-primary">Send Email</button>
                            </div>
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

export default {
    name: 'Contact',
    components: {
        PageBanner,
        Card,
        Input,
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
