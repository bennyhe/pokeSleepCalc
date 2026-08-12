<template>
  <teleport to="body">
    <div
      class="m-dialog m-dialog--show"
      v-if="isShow && showDialog"
      :class="{
        'm-dialog--fullscreen': isFullScreen,
        'm-dialog--alert': isAlert,
      }"
    >
      <i class="i i-close m-dialog__close" @click="handleClickClose()" :title="$t('BTN.close')"></i>
      <div class="m-dialog__inner">
        <div class="m-dialog__bd">
          <div class="m-dialog__info">
            <slot />
          </div>
          <div class="btn-wrap">
            <span class="btn btn-m" @click="handleClickClose()">{{
              $t("BTN.close")
            }}</span>
          </div>
        </div>
      </div>
      <i class="m-dialog__mask" @click="handleClickClose('mask')"></i>
    </div>
  </teleport>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  isAlert: {
    type: Boolean,
    default: false
  },
  isFullScreen: {
    type: Boolean,
    default: false
  },
  isHandleClickMaskClose: {
    type: Boolean,
    default: true
  },
  closeCallBack: {
    type: Function
  }
})

const showDialog = ref(true)
// console.log(showDialog, props.isShow)
const handleClickClose = closeType => {
  if (props.closeCallBack) {
    props.closeCallBack()
  }
  if (closeType === 'mask' && props.isHandleClickMaskClose) {
    showDialog.value = false
  } else {
    showDialog.value = false
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>