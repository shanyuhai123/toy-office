import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'ExcelStatusBar',
  setup () {
    return () => (
      <div class="excel-status-bar">
        <span class="current-coordinate">A1</span>
        <input type="text" class="calc-function"/>
      </div>
    )
  }
})
