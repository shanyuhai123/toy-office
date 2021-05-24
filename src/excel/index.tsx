import { defineComponent, ref } from '@vue/runtime-core'
import StatusBar from './modules/StatusBar'
import Core from './modules/Core'
import ToolBar from './modules/ToolsBar'
import './styles/index.less'

export default defineComponent({
  name: 'ToySheet',
  setup () {
    const coordinate = ref('A1')

    const handleCoordinate = (str: string) => {
      coordinate.value = str
    }

    return () => (
      <div id="toy-sheet">
        <ToolBar />
        <StatusBar currentCoordinate={coordinate.value} />
        <Core onCoordinate={handleCoordinate}/>
      </div>
    )
  }
})
