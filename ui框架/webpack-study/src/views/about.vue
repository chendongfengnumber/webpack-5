<template>
  <div>
    <span>about</span>
    <button @click="toHome">to home</button>
  </div>
</template>
<script>
import lodash from 'lodash'
import { getValidCellphone } from '@/utils/utils'
console.log('this is about')
export default {
  methods: {
    handleData() {
      const a = { b: 'go to home' }
      const c = lodash.get(a, 'b', '')
      getValidCellphone()
      console.log('about',c)
    },
    toHome() {
      this.handleData()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
