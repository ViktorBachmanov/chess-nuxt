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
    {
      label: 'Удалить последнюю',
      disabled: !loggedIn.value,
      onSelect: openGameDeleteDialog
    },
  ]
])

const gameAddDialogIsOpen = ref(false)

function openGameAddDialog() {
  gameAddDialogIsOpen.value = true
}

const emit = defineEmits(['game-added', 'game-deleted'])

function handleGameAdded() {
  emit('game-added')
}

//------------------------------------------

const gameDeleteDialogIsOpen = ref(false)

function openGameDeleteDialog() {
  gameDeleteDialogIsOpen.value = true
}

function handleGameDeleted() {
  emit('game-deleted')
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

    <LazyGameDeleteDialog
      v-if="gameDeleteDialogIsOpen"
      @after:leave="gameDeleteDialogIsOpen = false"
      @deleted="handleGameDeleted"
    />
  </div>
</template>