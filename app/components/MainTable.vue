<script setup>
const props = defineProps({
  users: Array,
})
</script>

<template>
  <table
    class="mt-10 mx-auto"
  >
    <thead>
      <tr>
        <th>№</th>
        <th>ФИО</th>
        <th>Очки</th>
        <th>Игры</th>
        <th>Рейтинг</th>
      </tr>
    </thead>

    <tbody>
      <MainTableRow
        v-for="user in users"
        :user="user"
      />
    </tbody>
  </table>
</template>

<style scoped>
th, :deep(td) {
  padding: 0.33em;
  border: 0.5px solid;
}
</style>