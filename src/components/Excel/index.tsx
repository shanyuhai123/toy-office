import { defineComponent, ref } from '@vue/runtime-core'
import StatusBar from './modules/StatusBar'
import Core from './modules/Core'
import ToolBar from './modules/ToolBar'

export default defineComponent({
  name: 'ExcelContainer',
  setup () {
    const coordinate = ref('A1')

    const handleCoordinate = (str: string) => {
      coordinate.value = str
    }

    return () => (
      <div class="excel-container">
        <ToolBar />
        <StatusBar currentCoordinate={coordinate.value} />
        <Core onCoordinate={handleCoordinate}/>
      </div>
    )
  }
})
