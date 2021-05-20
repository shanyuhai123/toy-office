import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'ExcelStatusBar',
  props: {
    currentCoordinate: {
      type: String,
      default: 'A1'
    }
  },
  setup (props) {
    return () => (
      <div class="excel-status-bar">
        <span class="current-coordinate">{props.currentCoordinate}</span>
        <input type="text" class="calc-function"/>
      </div>
    )
  }
})
