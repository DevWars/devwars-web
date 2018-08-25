<template>
    <form>
        <div class="form-group">
            <ConnectToDiscord />
        </div>
    </form>
</template>

<script>
    import Vue from 'vue';

    import ConnectToDiscord from '../../components/user/ConnectToDiscord';

    export default {
        components: { ConnectToDiscord }
    }
</script>
