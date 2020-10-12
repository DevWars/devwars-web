<template>
    <div class="ViewObjectivesModal">
        <ObjectivesList :game="game" :players="players" />

        <ButtonGroup class="modal__actions">
            <Button class="outline muted" @click="close">Close</Button>
        </ButtonGroup>
    </div>
</template>

<script>
import ObjectivesList from '@/components/game/ObjectivesList';

export default {
    name: 'ViewObjectivesModal',

    components: { ObjectivesList },

    props: {
        game: { type: Object, required: true },
        players: { type: Array, required: true },
    },
};
</script>
