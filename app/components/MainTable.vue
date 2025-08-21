<script setup>
const props = defineProps({
  users: Array,
})
</script>

<template>
  <table
  >
    <thead>
      <tr>
        <th>№</th>
        <th>ФИО</th>

        <th
          v-for="(userIndex, index) in users.length"
        >
          {{ index + 1 }}
        </th>

        <th>Очки</th>
        <th>Игры</th>
        <th>Рейтинг</th>
      </tr>
    </thead>

    <tbody>
      <MainTableRow
        v-for="(user, index) in users"
        :user="user"
        :num="index + 1"
        :users-total="users.length"
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