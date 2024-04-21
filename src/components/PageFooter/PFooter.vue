<script setup>
import { ref } from 'vue'
import CptDialogUpdateLog from '../DialogUpdateLog/index.vue'
import CptDialogSupport from '../DialogSupport/index.vue'

const isShowDialog = ref(false)
const dialogId = ref(false)
const handleClickShowUpdateLog = () => {
  dialogId.value = `updateLogDialog${Math.random()}`
  isShowDialog.value = true
}

const isShowDialog2 = ref(false)
const dialogId2 = ref(false)
const handleClickShowSupport = () => {
  dialogId2.value = `SupportDialog${Math.random()}`
  isShowDialog2.value = true
}
</script>
<template>
  <div class="page-footer">
    <p>工具建议&反馈以及交流(Pokemon sleep計算器研究交流室)QQ群：953956094</p>
    <p>
      <a href="https://github.com/bennyhe/pokeSleepCalc" target="_blank"
        >Github
      </a>
    </p>
    <p>
      <a href="javascript:;" @click="handleClickShowSupport()">捐赠支持须知</a>
    </p>
    <p>
      <a href="https://afdian.net/a/pokesleepcalc" target="_blank">按月订阅支持(爱发电)(WX Pay/Ali Pay/Paypal/Stripe)</a>
    </p>
    <p>
      <a href="javascript:;" @click="handleClickShowUpdateLog()">更新日志</a>
    </p>
    <CptDialogUpdateLog v-bind:key="dialogId" :isShow="isShowDialog" />
    <CptDialogSupport v-bind:key="dialogId2" :isShow="isShowDialog2" />
  </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>