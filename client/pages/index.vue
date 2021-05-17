<template>
  <div>
    <h2>Get Data</h2>

    <div v-if="!data">Failed to load data</div>
    <ul v-else class="list">
      <li v-for="d of data" :key="d._id" class="list__item">
        <nuxt-link :to="'/item/' + d._id">Open</nuxt-link>
        <div class="content">
          <strong>{{ d._id }}</strong
          ><strong>{{ d.name }}</strong>
          <strong>{{ d.value }}</strong>
        </div>
        <button @click="deleteHandler(d._id)">X</button>
      </li>
    </ul>

    <h2>Create Data</h2>
    <form @submit.prevent="createHandler">
      <input v-model="inputName" type="text" placeholder="NAME" />
      <input v-model="inputValue" type="text" placeholder="VALUE" />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      inputName: '',
      inputValue: '',
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async createHandler() {
      try {
        await this.$axios.$post('/data', {
          name: this.inputName,
          value: this.inputValue,
        })
        this.fetchData()
      } catch (e) {
        console.error(`Can't create data`, e)
      }

      this.inputName = ''
      this.inputValue = ''
    },
    async deleteHandler(id) {
      try {
        await this.$axios.$delete('/data/' + id)
        this.fetchData()
      } catch (e) {
        console.error(`Can't create data`, e)
      }
    },
    async fetchData() {
      try {
        const data = await this.$axios.$get('/data')
        this.data = data
      } catch (e) {
        this.data = null
        console.error(`Can't fetch data`, e)
      }
    },
  },
}
</script>
