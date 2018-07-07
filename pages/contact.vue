<template>
    <div>
        <div class="ribbon"></div>

        <div class="footer-offset container">
            <div class="row-lift">
                <div class="heading">
                    <h1>Contact</h1>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="card card-dark card-plain">
                            <div class="card__inner">
                                <form async-submit="contact.contact()">
                                    <div class="form-group">
                                        <Input v-model="name" required />
                                        <label>Name</label>
                                    </div>
                                    <div class="form-group">
                                        <Input v-model="email" required />
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
                            </div>
                        </div>
                        <div class="card card-dark card-plain">
                            <div class="card__inner align-center">
                                <h1>Thank you!</h1>
                                <div class="mt-xs mb-md">
                                    <h4>We received your email, you will hear back from us soon.</h4>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card card-dark card-plain">
                            <div class="card__inner">
                                <div class="contact-sidebar">
                                    <div class="contact-sidebar__address">
                                        contact@devwars.tv
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Input from '~/components/form/Input';

    @Component({
        components: { Input }
    })

    export default class Contact extends Vue {
        name = '';
        email = '';
        message = '';
    }
</script>
