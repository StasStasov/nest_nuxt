<template>
  <ul>
    <li>ID: {{ data._id }}</li>
    <li>Name: {{ data.name }}</li>
    <li>Value: {{ data.value }}</li>
    <li>
      <h2>Update Data</h2>
      <form @submit.prevent="updateHandler">
        <input v-model="inputName" type="text" placeholder="NAME" />
        <input v-model="inputValue" type="text" placeholder="VALUE" />
        <button type="submit">Update</button>
      </form>
    </li>
    <li><nuxt-link to="/">Back</nuxt-link></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      inputName: '',
      inputValue: '',
      id: '',
      data: {},
    }
  },
  mounted() {
    this.id = this.$route.params.item
    this.fetchData()
  },
  methods: {
    async updateHandler() {
      try {
        await this.$axios.$put('/data/' + this.id, {
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
    async fetchData() {
      try {
        const data = await this.$axios.$get('/data/' + this.id)
        this.data = data
      } catch (e) {
        this.data = null
        console.error(`Can't fetch data`, e)
      }
    },
  },
}
</script>
