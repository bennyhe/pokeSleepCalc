<template>
  <CptDialog :isShow="isShowDialog" :key="dialogId">
    <div class="dialog-update" v-html="updateLogDom"></div>
  </CptDialog>
</template>

<script setup>
import { ref } from 'vue'
import CptDialog from '../Dialog/index.vue'
import updateLogInfo from './data.js'

defineProps(['isShowDialog', 'dialogId'])

const updateLogDom = ref('')
function initMdUpdateLog() {
  updateLogDom.value = window.Mdjs.md2html(updateLogInfo)
}
initMdUpdateLog()
</script>

<style lang="scss">
@import "./index.scss";
</style>
