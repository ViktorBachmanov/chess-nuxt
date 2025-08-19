<script setup lang="ts">
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

console.log('status: ', status.value)
console.log('token: ', token.value)
console.log('data: ', data.value)

// const session = await getSession()

// console.log('session: ', session)

async function handleLogin() {
  await signIn({ username: 'ustas', password: 'pass123' }, { callbackUrl: '/' })

  // console.log('session: ', await getSession())
}

// const isAuth = computed(() => status.value == 'authenticated')

const items = computed(() => [
  [
    {
      label: 'Войти',
      disabled: status.value == 'authenticated',
      onSelect: handleLogin
    },
     {
      label: 'Выйти',
      disabled: status.value != 'authenticated',
      onSelect: () => signOut({ callbackUrl: '/' })
    },
  ]
])
</script>

<template>
   <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-48 dark:bg-slate-700'
    }"
  >
    <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>