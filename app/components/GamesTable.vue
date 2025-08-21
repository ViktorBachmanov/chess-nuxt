<script setup>
const props = defineProps({
  games: Array,
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
          {{ game.white }}
        </td>
        <td>
          {{ new Date(game.date).toLocaleDateString('ru-RU') }}
        </td>
        <td>
          {{ game.black }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th, td {
  padding: 0.25em;
  border: 0.5px solid;
}
</style>