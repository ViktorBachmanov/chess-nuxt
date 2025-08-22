<script setup>
const props = defineProps({
  days: Array,
  status: String,
})

const day = defineModel()

const flattenDays = props.days.map(day => ({
  label: new Date(day.date).toLocaleDateString('ru-RU'),
  value: day.date,
}))

flattenDays.unshift({
  label: 'Все',
  value: 'all'
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
      :items="flattenDays"
      class="w-36"
      id="select_day_id"
      :loading="status == 'pending'"
      :trailing="true"
    />
  </div>
</template>