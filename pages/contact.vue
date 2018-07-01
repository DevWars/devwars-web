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
                        <div class="card card-plain">
                            <div class="card__inner">
                                <form async-submit="contact.contact()">
                                    <div class="form-group">
                                        <Input ng-model="contact.info.name" required />
                                        <label>Name</label>
                                    </div>
                                    <div class="form-group">
                                        <Input ng-model="contact.info.email" required />
                                        <label>Email</label>
                                    </div>
                                    <div class="form-group">
                                        <textarea ng-model="contact.info.text" class="form-control" rows="8" placeholder="Message"></textarea>
                                    </div>

                                    <div class="align-right">
                                        <button type="submit" class="btn btn-primary">Send Email</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card card-plain">
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
    import Input from '../components/form/Input';

    @Component({
        components: { Input }
    })

    export default class Contact extends Vue {

    }
</script>
