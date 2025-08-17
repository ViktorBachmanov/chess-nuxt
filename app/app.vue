<script setup>
async function handleLogin() {
  await $fetch('/api/login', {
    method: "POST",
    body: {
      username: 'ustas',
      password: 'pass123'
    }
  })
}
</script>

<template>
  <UApp>
    Chess-Nuxt <ColorModeButton /><br>
    <UButton
      @click="handleLogin"
    >
      Log in
    </UButton>
  </UApp>
</template>
