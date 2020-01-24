<template>
    <div class="ConnectionsPage">
        <h3>Connections</h3>

        <div class="connect">
            <ConnectToDiscord/>
        </div>

        <div class="connect">
            <ConnectToTwitch/>
        </div>
    </div>
</template>

<script>
import ConnectToDiscord from '../../components/user/ConnectToDiscord';
import ConnectToTwitch from '../../components/user/ConnectToTwitch';

export default {
    name: 'ConnectionsPage',
    components: { ConnectToDiscord, ConnectToTwitch },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.ConnectionsPage {
    .connect + .connect {
        margin-top: $grid-gutter-width;
    }
}
</style>
