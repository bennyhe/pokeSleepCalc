<template>
  <div class="page-footer">
    <p>同好Sleep交流QQ群：894464120（非本人创建）</p>
    <p>
      <a href="https://github.com/bennyhe/pokeSleepCalc" target="_blank"
        >Github
      </a>
    </p>
    <p>
      <a href="javascript:;" @click="handleClickShowUpdateLog()">更新日志</a>
    </p>
    <CptDialogUpdateLog v-bind:key="dialogId" :isShow="isShowDialog" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CptDialogUpdateLog from '../DialogUpdateLog/index.vue'

export default defineComponent({
  name: 'PageFooter',
  props: [],
  components: {
    CptDialogUpdateLog
  },
  setup(props, context) {
    const isShowDialog = ref(false)
    const dialogId = ref(false)
    function handleClickShowUpdateLog() {
      dialogId.value = `updateLogDialog${Math.random()}`
      isShowDialog.value = true
    }
    return {
      handleClickShowUpdateLog,
      isShowDialog,
      dialogId
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>