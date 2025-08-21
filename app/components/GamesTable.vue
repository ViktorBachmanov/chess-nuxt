<script setup>
const props = defineProps({
  games: Array,
  users: Array,
})

const usersNames = computed(() => {
  const obj = {}

  props.users.forEach(user => {
    obj[user.id] = user.name
  })

  return obj
})

</script>

<template>
  <table
  >
    <thead>
      <tr>
        <th>Белые</th>
        <th>Дата</th>
        <th>Чёрные</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="game in games"
      >
        <td>
          {{ usersNames[game.white] }}
        </td>
        <td>
          {{ new Date(game.date).toLocaleDateString('ru-RU') }}
        </td>
        <td>
          {{ usersNames[game.black] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th, td {
  padding: 0.25em;
  /* border: 0.5px solid; */
}
</style>