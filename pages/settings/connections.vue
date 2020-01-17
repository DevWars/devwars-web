<template>
    <div class="group">
        <Row>
            <Column :md="8">
                <h3>Connections</h3>
            </Column>
        </Row>

        <Row>
            <Column :md="8">
                <ConnectToDiscord />
            </Column>

            <Column :md="8">
                <ConnectToTwitch />
            </Column>
        </Row>
    </div>
</template>

<script>
import ConnectToDiscord from '../../components/user/ConnectToDiscord';
import ConnectToTwitch from '../../components/user/ConnectToTwitch';

export default {
    name: 'Connections',
    components: { ConnectToDiscord, ConnectToTwitch },
};
</script>
