<template>
    <form>
        <div class="form-group">
            <ConnectToDiscord/>
        </div>
    </form>
</template>


<script>
import ConnectToDiscord from '../../components/user/ConnectToDiscord';

export default {
    name: 'Connections',
    components: { ConnectToDiscord },
};
</script>
