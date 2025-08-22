<script setup>
import { today } from '@internationalized/date'

const { data: users } = await useFetch('/api/users')

const open = ref(true)

const state = ref({
  white: users.value[0].id,
  black: users.value[1].id,
  winner: 'draw',
})

const results = [
  { value: 'draw', label: 'Ничья' },
  { value: 'white', label: 'Белые' },
  { value: 'black', label: 'Чёрные' },
]

const date = shallowRef(today('Europe/Paris'))

const loading = ref(false)

const emit = defineEmits(['deleted'])

const toast = useToast()

async function handleDelete() {
  loading.value = true
  // await new Promise(resolve => setTimeout(resolve, 2000))
  // loading.value = false
  // return

  try {
    await $fetch('/api/games', {
      method: 'DELETE',
    })
    emit('deleted')
    open.value = false
    toast.add({
      description: 'Игра удалена'
    })
  } catch (e) {
    console.log('e:', e)
    toast.add({
      description: e.statusMessage
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal
    title="Удалить игру"
    v-model:open="open"
    :ui="{ footer: 'justify-end' }"
    description="Удаление последней игры"
    class="w-fit"
  >
    <template #body>
      Удалить последнюю игру?
    </template>

    <template #footer>
      <UButton 
        class="mt-2"
        :loading="loading"
        color="error"
        @click="handleDelete"
      >
        Удалить
      </UButton>
    </template>

  </UModal>
</template>