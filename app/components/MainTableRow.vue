<script setup>
const props = defineProps({
  user: Object,
})
</script>

<template>
  <tr>
    <td>{{ user.id }}</td>
    <td style="text-align: left;">{{ user.name }}</td>
    <td>{{ user.score }}</td>
    <td>{{ user.games }}</td>
    <td>{{ user.rating }}</td>
  </tr>
</template>

<style scoped>
td {
  text-align: right;
}
</style>