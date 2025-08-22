<script setup>
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

// const modelValue = shallowRef(today('Europe/Paris'))
const modelValue = defineModel()
</script>

<template>
  <UPopover>
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
    </UButton>

    <template #content>
      <UCalendar v-model="modelValue" class="p-2" />
    </template>
  </UPopover>
</template>

