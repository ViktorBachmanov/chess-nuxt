<script setup>
const tgScriptContainer = ref(null)

onMounted(() => {
  console.log('onMounted')
  let tgScript = document.createElement('script')
  // tgScript.src="https://telegram.org/js/telegram-widget.js?22"
  tgScript.src="/js/tg_script.js"
  tgScript.onload = function() {
    console.log('onload')
    tgScriptContainer.value.append(tgScript)
  }
  // tgScript.async = true
  // tgScript['data-telegram-login'] = "ChessNuxtBot"
  // tgScript['data-size'] = "medium"
  // tgScript['data-onauth'] = "onTelegramAuth(user)"
  // tgScript['data-request-access'] = "write"
  tgScript.onerror = function() {
    console.log('onload error')
  }
})
</script>

<template>
  <div
    ref="tgScriptContainer"
  >

  </div>
</template>