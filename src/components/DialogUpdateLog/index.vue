<template>
  <CptDialog :isShow="isShowDialog" v-bind:key="dialogId">
    <div class="dialog-update" v-html="updateLogDom"></div>
  </CptDialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import mdJS from 'md-js'
import CptDialog from '../Dialog/index.vue'
import updateLogInfo from './data.js'

export default defineComponent({
  name: 'DialogUpdateLog',
  props: ['isShowDialog', 'dialogId'],
  components: {
    CptDialog
  },
  setup(props, context) {
    const updateLogDom = ref('')
    function initMdUpdateLog() {
      updateLogDom.value = window.Mdjs.md2html(updateLogInfo)
    }
    initMdUpdateLog()
    return {
      updateLogDom
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>