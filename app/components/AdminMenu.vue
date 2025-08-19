<script setup lang="ts">

async function handleLogin() {

}

const items = computed(() => [
  [
    {
      label: 'Войти',
      disabled: false,
      onSelect: handleLogin
    },
     {
      label: 'Выйти',
      disabled: true,
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