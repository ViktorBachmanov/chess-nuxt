<script setup>
const props = defineProps({
  userData: Object,
})
</script>

<template>
  <tr>
    <td>{{ userData.id }}</td>
    <td>{{ userData.name }}</td>
  </tr>
</template>

<style scoped>
th, td {
  padding: 0.33em;
  border: 0.5px solid;
}
</style>