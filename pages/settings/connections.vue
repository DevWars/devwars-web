<template>
    <form>
        <ConnectToDiscord/>
    </form>
</template>


<script>
import ConnectToDiscord from '../../components/user/ConnectToDiscord';

export default {
    name: 'Connections',
    components: { ConnectToDiscord },
};
</script>
