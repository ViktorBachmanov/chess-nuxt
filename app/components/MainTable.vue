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
      </tr>
    </thead>

    <tbody>
      <MainTableRow
        v-for="user in users"
        :user-data="user"
      />
    </tbody>
  </table>
</template>

<style scoped>
th, td {
  padding: 0.33em;
  border: 0.5px solid;
}
</style>