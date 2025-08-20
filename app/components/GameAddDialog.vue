<script setup>
const open = ref(true)

const state = ref({
  
})

const loading = ref(false)

const emit = defineEmits(['added'])

const toast = useToast()

async function handleSubmit() {
  loading.value = true
  // await new Promise(resolve => setTimeout(resolve, 2000))
  // loading.value = false

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
        class="flex flex-col items-center gap-4"
        :state="state"
      >

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