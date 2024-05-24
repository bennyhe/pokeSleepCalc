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
      <i class="i i-close m-dialog__close" @click="handleClickClose()"></i>
      <div class="m-dialog__inner">
        <div class="m-dialog__bd">
          <div class="m-dialog__info">
            <slot />
          </div>
          <div class="btn-wrap">
            <span class="btn btn-m" @click="handleClickClose()">关闭</span>
          </div>
        </div>
      </div>
      <i class="m-dialog__mask" @click="handleClickClose('mask')"></i>
    </div>
  </teleport>
</template>
<script>
import { defineComponent, ref } from 'vue'
// import {} from "../../utils/index.js"

export default defineComponent({
  name: 'CptDialog',
  props: {
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
  },
  setup(props, context) {
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
    return {
      handleClickClose,
      showDialog
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>