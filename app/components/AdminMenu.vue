<script setup lang="ts">

const { loggedIn, session, user, clear, fetch: refreshSession } = useUserSession()

const loginDialogIsOpen = ref(false)

const items = computed(() => [
  [
    {
      label: 'Войти',
      disabled: loggedIn.value,
      onSelect: () => loginDialogIsOpen.value = true
    },
    {
      label: 'Выйти',
      disabled: !loggedIn.value,
      onSelect: clear
    },
    {
      label: 'Добавить игру',
      disabled: !loggedIn.value,
      onSelect: openGameAddDialog
    },
  ]
])

const gameAddDialogIsOpen = ref(false)

function openGameAddDialog() {
  gameAddDialogIsOpen.value = true
}

const emit = defineEmits(['game-added'])

function handleGameAdded() {
  emit('game-added')
}
</script>

<template>
  <div>
    <UDropdownMenu
      :items="items"
      :ui="{
        content: 'w-48 dark:bg-slate-700'
      }"
    >
      <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>

    <LoginDialog
      v-model="loginDialogIsOpen"
      @logged="refreshSession"
    />

    <LazyGameAddDialog
      v-if="gameAddDialogIsOpen"
      @after:leave="gameAddDialogIsOpen = false"
      @added="handleGameAdded"
    />
  </div>
</template>