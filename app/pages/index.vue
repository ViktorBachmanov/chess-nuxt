<script setup>
// const { data: users } = useFetch('/api/users')

const day = ref('all')

const { data: days, refresh: refreshDays } = useFetch('/api/days')

const { data, refresh, status } = await useAsyncData('users-games', async () => {
  // await new Promise(res => setTimeout(res, 2000))

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

function handleGamesUpdated() {
  refreshDays()
  refresh()
}
</script>

<template>
  <div
    class="flex items-center justify-between p-4 shadow-lg dark:bg-slate-800"
  >
    <AdminMenu
      @game-added="handleGamesUpdated"
      @game-deleted="handleGamesUpdated"
    />

    <h1 class="font-medium text-xl sm:text-2xl">
      Шахматный клуб
    </h1>

    <div class="flex gap-4 items-center">
      <ColorModeButton />

      <NuxtLink
        to="https://github.com/ViktorBachmanov/chess-nuxt"
        target="_blank"
        class="w-5 h-5"
      >
        <UIcon name="i-uil-github" class="w-5 h-5" />
      </NuxtLink>
    </div>
  </div>

  <div
    class="flex flex-col gap-10 items-center"
  >
    <SelectDay
      :days="days"
      v-model="day"
      class="mt-10"
      :status="status"
    />

    <MainTable
      :users="data.users"
      :games="data.games"
    />

    <GamesTable
      :games="data.games"
      :users="data.users"
    />
  </div>
</template>