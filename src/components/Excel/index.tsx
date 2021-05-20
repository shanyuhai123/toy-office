import { defineComponent } from '@vue/runtime-core'
import StatusBar from './modules/StatusBar'
import Core from './modules/Core'

export default defineComponent({
  name: 'ExcelContainer',
  setup () {
    return () => (
      <div class="excel-container">
        <StatusBar />
        <Core/>
      </div>
    )
  }
})
