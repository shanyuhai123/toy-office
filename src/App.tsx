import { computed, defineComponent, ref } from 'vue'
import Excel from './excel'
import { getStrLen } from './utils/common'

export default defineComponent({
  name: 'App',
  setup () {
    const sheetName = ref('未命名')
    const sheetNameWidth = computed(() => {
      const len = getStrLen(sheetName.value)

      return (len > 10 ? len : 10) * 9.6 + 'px'
    })

    return () => (
      <div id="sheet-app">
        <header class="toy-sheet-header">
          <input type="text" class="sheet-name" v-model={sheetName.value} style={{ width: sheetNameWidth.value }} placeholder="请输入名称" />
        </header>
        <Excel />
      </div>
    )
  }
})
