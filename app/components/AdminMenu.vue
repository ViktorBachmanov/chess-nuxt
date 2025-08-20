<script setup lang="ts">

const { loggedIn, session, user, clear, fetch: refreshSession } = useUserSession()

const toast = useToast()

async function login() {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: 'ustas',
        password: 'password123'
      }
    })
    refreshSession()
  } catch (e: any) {
    console.log('e:', e)
    toast.add({
      description: e.statusMessage
    })
  }
}

const items = computed(() => [
  [
    {
      label: 'Войти',
      disabled: loggedIn.value,
      onSelect: login
    },
     {
      label: 'Выйти',
      disabled: !loggedIn.value,
      onSelect: clear
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