import { defineComponent, inject } from '@vue/runtime-core'
import { Ref } from 'vue'

export default defineComponent({
  name: 'SheetStatusBar',
  setup () {
    const coordinate = inject('coordinate') as Ref<string>

    return () => (
      <div class="sheet-status-bar">
        <span class="current-coordinate">{coordinate.value}</span>
        <input type="text" class="calc-function"/>
      </div>
    )
  }
})
