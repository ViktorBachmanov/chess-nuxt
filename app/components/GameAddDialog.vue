<script setup>
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

const loading = ref(false)

const emit = defineEmits(['added'])

const toast = useToast()

async function handleSubmit() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
  return

  try {
    await $fetch('/api/games', {
      method: 'POST',
      body: {
        
      }
    })
    emit('added')
    open.value = false
    toast.add({
      description: 'Игра добавлена'
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
    title="Добавить игру"
    v-model:open="open"
    :ui="{ footer: 'justify-end' }"
    description="Введите данные"
    class="w-fit"
  >
    <template #body>
      <UForm
        @submit="handleSubmit"
        class="flex flex-col items-end gap-4"
        :state="state"
      >
        <div>
          <label
            class="mr-2"
            for="white_id"
          >
            Белые:
          </label>
          <USelect
            v-model="state.white"
            :items="users"
            class="w-40"
            id="white_id"
            value-key="id"
          />
        </div>

        <div>
          <label
            class="mr-2"
            for="black_id"
          >
            Чёрные:
          </label>
          <USelect
            v-model="state.black"
            :items="users"
            class="w-40"
            id="black_id"
            value-key="id"
          />
        </div>

        <div>
          <label
            class="mr-2"
            for="rslt_id"
          >
            Кто выиграл:
          </label>
          <USelect
            v-model="state.winner"
            :items="results"
            class="w-40"
            id="rslt_id"
          />
        </div>

        <UButton 
          type="submit"
          class="mt-2"
          :loading="loading"
        >
          Submit
        </UButton>
      </UForm>
    </template>

  </UModal>
</template>