<template>
  <CptDialog :isShow="isShowDialog" @close="$emit('close')">
    <div class="dialog-support">
      <div v-html="updateLogDom"></div>
      <div class="support-qrcode"></div>
    </div>
  </CptDialog>
</template>

<script setup>
import { ref } from 'vue'
import CptDialog from '../Dialog/DialogIndex.vue'
import updateLogInfo from './supportDetail.js'

defineProps(['isShowDialog'])
defineEmits(['close'])

const updateLogDom = ref('')
function initMdUpdateLog() {
  updateLogDom.value = window.Mdjs.md2html(updateLogInfo)
}
initMdUpdateLog()
</script>

<style lang="scss">
@import "./index.scss";
</style>
