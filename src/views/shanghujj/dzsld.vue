<template>
  <div class="app-container">
    <el-cascader
      v-model="selectedOptions"
      size="large"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'

export default {
  name: 'Dzsld',
  data() {
    return {
      options: regionData,
      selectedOptions: []
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
      console.log(codeToText[value[0]])
      if (value[1] != null && value[2] != null) {
        var addressText = codeToText[value[0]] + '/' + codeToText[value[1]] + '/' + codeToText[value[2]]
      } else {
        if (value[1] != null) {
          addressText = codeToText[value[0]] + '/' + codeToText[value[1]]
        } else {
          addressText = codeToText[value[0]]
        }
      }
      // this.form.address = addressText
      console.log(addressText)
      this.provinces = codeToText[this.selectedOptions[0]]
      this.city = codeToText[this.selectedOptions[1]]
      this.area = codeToText[this.selectedOptions[2]]
    }
  }
}
</script>

<style scoped>

</style>
