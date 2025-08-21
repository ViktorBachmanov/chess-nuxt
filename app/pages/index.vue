<script setup>
// const { data: users } = useFetch('/api/users')

const { data } = await useAsyncData('users-games', async () => {
  const [users, games, days] = await Promise.all([
    $fetch('/api/users'),
    $fetch('/api/games'),
    $fetch('/api/days'),
  ])

  return { users, games, days }
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

  <div
    class="flex flex-col gap-10 items-center"
  >
    <SelectDay
      :days="data.days"
      class="mt-10"
    />

    <MainTable
      :users="data.users"
    />

    <GamesTable
      :games="data.games"
    />
  </div>
</template>