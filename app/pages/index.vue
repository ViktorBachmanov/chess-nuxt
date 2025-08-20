<script setup>
// const { data: users } = useFetch('/api/users')

const { data } = await useAsyncData('users-games', async () => {
  const [users, games] = await Promise.all([
    $fetch('/api/users'),
    $fetch('/api/games'),
  ])

  return { users, games }
})
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
    :users="data.users"
  />

  <GamesTable
    :games="data.games"
  />
</template>