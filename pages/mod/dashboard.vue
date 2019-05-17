<template>
    <h1>Welcome to the Dashboard</h1>
</template>

<script>
import { names } from '../../utils/auth';

export default {
    name: 'ModDashboard',
    meta: {
        auth: names.MODERATOR,
    },
};
</script>


<style lang="scss" scoped>
h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
