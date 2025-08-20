<script setup>
const open = defineModel()
</script>

<template>
  <UModal
    title="Log in"
    v-model:open="open"
    :ui="{ footer: 'justify-end' }"
    description="Введите фамилию и.о. и пароль"
  >
    <template #body>
      <div class="h-48"></div>
    </template>

    <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
      <UButton label="Submit" color="neutral" />
    </template>
  </UModal>
</template>