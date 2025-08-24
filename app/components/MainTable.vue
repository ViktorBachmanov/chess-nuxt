<script setup>
const props = defineProps({
  users: Array,
  games: Array,
})

const transformedUsers = ref([])

// console.log('transformedUsers:', transformedUsers.value)

const sortBy = ref('rating')  // rating | score

watch(() => props.games, newGames => {
  transformedUsers.value = props.users.map(user => ({ ...user }))
  transformUsers(newGames), { immediate: true }
  sortUsers(sortBy.value)
}, {
  immediate: true
})

watch(sortBy, newSorting => sortUsers(newSorting))

function sortUsers(sorting) {
  transformedUsers.value.sort((a, b) => {
    return b[sorting] - a[sorting]
  })
}

// console.log('transformedUsers:', transformedUsers.value)

function transformUsers(games) {
  transformedUsers.value.forEach(user => user.opponents = {})
  
  games.forEach(game => { 
    if (game.winner) {
      const winner = transformedUsers.value.find(user => user.id === game.winner)
      const loserId = game.white === winner.id
        ? game.black
        : game.white
      const loser = transformedUsers.value.find(user => user.id === loserId)

      updateOpponent(winner, loserId, 1)
      updateOpponent(loser, winner.id, 0)
    } else {
      const whiteUser = transformedUsers.value.find(user => user.id === game.white)
      const blackUser = transformedUsers.value.find(user => user.id === game.black)

      updateOpponent(whiteUser, blackUser.id, 0.5)
      updateOpponent(blackUser, whiteUser.id, 0.5)
    }
  })

  transformedUsers.value.forEach(user => {
    user.score = Object.values(user.opponents).reduce((sum, oppScore) => {
      return sum + oppScore
    }, 0)
  })
}

function updateOpponent (user, opponentId, score) {
  if (user.opponents[opponentId]) {
    user.opponents[opponentId] += score
  } else {
    user.opponents[opponentId] = score
  }
}
</script>

<template>
  <div
    class="max-w-screen overflow-x-auto pr-2"
  >
    <table
    >
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          <th>
            <label for="radio_rating_id">
              Рейтинг
            </label>
            <input
              type="radio"
              v-model="sortBy"
              value="rating"
              id="radio_rating_id"
            >
          </th>
          <th>
            <label for="radio_score_id">
              Очки
            </label>
            <input
              type="radio"
              v-model="sortBy"
              value="score"
              id="radio_score_id"
            >
          </th>
          <th>Игры</th>

          <th
            v-for="(userIndex, index) in transformedUsers.length"
          >
            {{ index + 1 }}
          </th>
        </tr>
      </thead>

      <tbody>
        <MainTableRow
          v-for="(user, index) in transformedUsers"
          :user="user"
          :num="index + 1"
          :users="transformedUsers"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th, :deep(td) {
  padding: 0.33em;
  border: 0.5px solid;
}

th:first-child, :deep(td:first-child) {
  position: sticky;
  left: 0;
  background-color: #fcfbfd;
  min-width: 2em;

  .dark & {
    background-color: #1d293d;
  }
}

th:nth-child(2), :deep(td:nth-child(2)) {
  position: sticky;
  left: 2em;
  background-color: #fcfbfd;
  white-space: nowrap;

  .dark & {
    background-color: #1d293d;
  }
}
</style>