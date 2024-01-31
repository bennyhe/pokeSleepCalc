<script setup>
import { ref } from 'vue'
import CptDialogUpdateLog from '../DialogUpdateLog/index.vue'

const isShowDialog = ref(false)
const dialogId = ref(false)
function handleClickShowUpdateLog() {
  dialogId.value = `updateLogDialog${Math.random()}`
  isShowDialog.value = true
}
</script>
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

<style lang="scss">
@import "./index.scss";
</style>