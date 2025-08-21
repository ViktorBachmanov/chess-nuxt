<script setup>
// const { data: users } = useFetch('/api/users')

const day = ref('all')

const { data: days } = useFetch('/api/days')

const { data, refresh } = await useAsyncData('users-games', async () => {
  const [users, games ] = await Promise.all([
    $fetch(`/api/users?day=${day.value}`),
    $fetch(`/api/games?day=${day.value}`),
  ])

  return { users, games }
})

watch(day, newVal => {
  // console.log('day:', day.value)
  refresh()
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
      :days="days"
      v-model="day"
      class="mt-10"
    />

    <MainTable
      :users="data.users"
    />

    <GamesTable
      :games="data.games"
      :users="data.users"
    />
  </div>
</template>