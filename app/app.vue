<script setup>
const {
  status,
  data,
  lastRefreshedAt,
  token,
  refreshToken,
  getSession,
  signUp,
  signIn,
  signOut,
  refresh
} = useAuth()

console.log('token: ', token.value)
console.log('status: ', status.value)

async function handleLogin() {
  // await $fetch('/api/login', {
  //   method: "POST",
  //   body: {
  //     username: 'ustas',
  //     password: 'pass123'
  //   }
  // })
  await signIn({ username: 'ustas', password: 'pass123' }, { callbackUrl: '/' })
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
