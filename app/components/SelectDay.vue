<script setup>
const props = defineProps({
  days: Array,
  status: String,
})

const day = defineModel()

const objDays = ref([])

watch(() => props.days, newDays => {
  objDays.value = newDays.map(day => ({
    label: new Date(day.date).toLocaleDateString('ru-RU'),
    value: day.date,
  }))

  objDays.value.unshift({
    label: 'Все',
    value: 'all'
  })
}, {
  immediate: true
})
</script>

<template>
  <div class="flex flex-col">
    <label
      class="text-sm"
      for="select_day_id"
    >
      Игровой день
    </label>
    <USelect
      v-model="day"
      :items="objDays"
      class="w-36"
      id="select_day_id"
      :loading="status == 'pending'"
      :trailing="true"
    />
  </div>
</template>