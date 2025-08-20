<script setup>
const open = defineModel()

const state = ref({
  username: undefined,
  password: undefined
})

const loading = ref(false)

const emit = defineEmits(['logged'])

const toast = useToast()

async function handleSubmit() {
  loading.value = true
  // await new Promise(resolve => setTimeout(resolve, 2000))
  // loading.value = false

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: state.value.username,
        password: state.value.password
      }
    })
    emit('logged')
    open.value = false
    toast.add({
      description: 'Вы вошли'
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
    title="Log in"
    v-model:open="open"
    :ui="{ footer: 'justify-end' }"
    description="Введите ФИО и пароль"
    class="w-fit"
  >
    <template #body>
      <UForm
        @submit="handleSubmit"
        class="flex flex-col items-center gap-4"
        :state="state"
      >
        <UFormField label="Фамилия И.О." name="username">
          <UInput v-model="state.username" />
        </UFormField>

        <UFormField label="Пароль" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton 
          type="submit"
          class="mt-2"
          :loading="loading"
        >
          Submit
        </UButton>
      </UForm>
    </template>

    <!-- <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
      <UButton label="Submit" color="neutral" />
    </template> -->
  </UModal>
</template>