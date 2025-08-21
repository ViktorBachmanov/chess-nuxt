<script setup>
const props = defineProps({
  games: Array,
  users: Array,
})

const usersNames = computed(() => {
  const obj = {}

  props.users.forEach(user => {
    obj[user.id] = user.name
  })

  return obj
})

const whiteClass = function(game, color) {
  if (!game.winner) {
    return ''
  }

  if (game.winner == game[color]) {
    return 'win'
  } else {
    return 'lose'
  }
}
</script>

<template>
  <table
  >
    <thead>
      <tr>
        <th>Белые</th>
        <th>Дата</th>
        <th>Чёрные</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="game in games"
      >
        <td
          :class="whiteClass(game, 'white')"
        >
          {{ usersNames[game.white] }}
        </td>
        <td>
          {{ new Date(game.date).toLocaleDateString('ru-RU') }}
        </td>
        <td
          :class="whiteClass(game, 'black')"
        >
          {{ usersNames[game.black] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th, td {
  padding: 0.25em;
  /* border: 0.5px solid; */
}

th {
  background-color: white;

  .dark & {
    background-color: #1d293d;
  }
}

.win {
  background-color: #b2dfdb;

  .dark & {
    background-color: #00695c;
  }
}

.lose {
  background-color: #ffcdd2;

  .dark & {
    background-color: #c51162;
  }
}
</style>