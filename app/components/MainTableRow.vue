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

