<script setup>
const { data: users } = useFetch('/api/users')
</script>

<template>
  <div
    class="flex justify-between p-4 shadow-lg dark:bg-slate-800"
  >
    <AdminMenu />

    <h1 class="font-medium text-2xl">
      Шахматный клуб
    </h1>

    <ColorModeButton />
  </div>

  <MainTable
    :users="users"
  />
</template>