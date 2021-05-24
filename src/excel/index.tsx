import { defineComponent, provide, ref } from '@vue/runtime-core'
import StatusBar from './modules/StatusBar'
import Core from './modules/Core'
import ToolsBar from './modules/ToolsBar'
import './styles/index.less'
import { theme } from './config'

type SelectedRange = [number, number, number, number]

export default defineComponent({
  name: 'ToySheet',
  setup () {
    const core = ref<any>(null)
    const coordinate = ref('A1')
    const selectedRange = ref<SelectedRange>([0, 0, 0, 0])

    const updateCoordinate = (str: string) => {
      coordinate.value = str
    }
    const updateSelectedRange = (...data: SelectedRange) => {
      selectedRange.value = data
    }

    provide('coordinate', coordinate)
    provide('selectedRange', selectedRange)
    provide('updateCoordinate', updateCoordinate)
    provide('updateSelectedRange', updateSelectedRange)

    // TODO: 修改这糟糕的写法
    const handleToolsEvent = (str: string) => {
      if (str === 'cell-merge') {
        const ctx = core.value.$el.querySelector('.content-layer').getContext('2d')

        // 先清空画布
        ctx.clearRect(...selectedRange.value)
        // 再绘制
        ctx.strokeStyle = theme.lineColor
        ctx.lineWidth = 2
        ctx.strokeRect(...selectedRange.value)
      }
    }

    return () => (
      <div id="toy-sheet">
        <ToolsBar onToolsEvent={handleToolsEvent} />
        <StatusBar />
        <Core ref={core} />
      </div>
    )
  }
})
