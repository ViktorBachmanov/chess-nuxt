<script setup lang="ts">

const { loggedIn, session, user, clear, fetch: refreshSession } = useUserSession()

const open = ref(false)

const items = computed(() => [
  [
    {
      label: 'Войти',
      disabled: loggedIn.value,
      onSelect: () => open.value = true
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
  <div>
    <UDropdownMenu
      :items="items"
      :ui="{
        content: 'w-48 dark:bg-slate-700'
      }"
    >
      <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>

    <LoginDialog
      v-model="open"
      @logged="refreshSession"
    />
  </div>
</template>