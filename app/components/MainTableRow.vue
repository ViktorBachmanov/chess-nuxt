<script setup>
const props = defineProps({
  user: Object,
  num: Number,
  usersTotal: Number,
})
</script>

<template>
  <tr>
    <td
    >
      {{ num }}
    </td>
    <td 
      style="text-align: left;"
    >
      {{ user.name }}
    </td>

    <td
      v-for="userIndex in usersTotal"
    >
    </td>

    <td></td>
    <td>{{ user.games }}</td>
    <td>{{ user.rating }}</td>
  </tr>
</template>

<style scoped>
td {
  text-align: right;
  min-height: 2em;
  min-width: 2em;
}

td:first-child {
  font-weight: bold;
}
</style>