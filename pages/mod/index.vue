<template>
    <h1>mod dashboard home</h1>
</template>

<script>
import { roles } from '../../utils/auth';

export default {
    meta: {
        auth: [roles.moderator, roles.admin],
    },
};
</script>
