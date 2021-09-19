<template>
  <div>
    <span>home</span>
    <button @click="toAboout">to about</button>
  </div>

</template>
<script>
import lodash from 'lodash'
import { getValidCellphone } from '@/utils/utils'
console.log('this is home')
export default {
  methods: {
    handleData() {
      const a = { b: 'go to about' }
      const c = lodash.get(a, 'b', '')
      getValidCellphone()
      console.log('home',c)
    },
    toAboout() {
      this.handleData()
      this.$router.push({ name: 'about' })
    }
  }
}
</script>
