<template>
  <master-apply-control v-if="roomStore.isMaster"></master-apply-control>
  <member-apply-control v-else-if="!roomStore.isMaster"></member-apply-control>
</template>

<script setup lang="ts">
import MasterApplyControl from './MasterApplyControl.vue';
import MemberApplyControl from './MemberApplyControl.vue';
import { useRoomStore } from '../../../stores/room';

const roomStore = useRoomStore();

</script>
