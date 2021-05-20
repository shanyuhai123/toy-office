import { useSize } from '@/hooks/useSize'
import { defineComponent, onMounted, reactive, ref, watch } from '@vue/runtime-core'
import { nextTick, Ref } from 'vue'
import { initContentLayer } from '../hooks/useLayer'
import { useCanvasClick, useCanvasDoubleClick } from '../hooks/useEvents'
import { cell } from '../config'
import { CanvasSize } from '../types'

export default defineComponent({
  name: 'ExcelCore',
  setup () {
    // DOM
    const excelCore = ref<HTMLElement | null>(null)
    const canvasSize = reactive<CanvasSize>({
      width: -99999,
      height: -99999
    })
    const eventLayerContext = ref<CanvasRenderingContext2D | null>(null)
    const contentLayerContext = ref<CanvasRenderingContext2D | null>(null)
    // value
    const cellInput = ref('你好')

    onMounted(async () => {
      const { width, height } = useSize(excelCore.value)
      canvasSize.width = width
      canvasSize.height = height
    })

    watch(contentLayerContext, async (val) => {
      await nextTick()
      initContentLayer(val as CanvasRenderingContext2D, canvasSize)
    })

    const { handleCanvasClick } = useCanvasClick(eventLayerContext as Ref<CanvasRenderingContext2D>, canvasSize)
    const { handleCanvasDoubleClick, top, left } = useCanvasDoubleClick(eventLayerContext as Ref<CanvasRenderingContext2D>, canvasSize)

    return () => (
      <div class="excel-core" ref={excelCore}>
        <canvas
          class="content-layer"
          width={canvasSize.width}
          height={canvasSize.height}
          ref={(c: any): any => {
            contentLayerContext.value = c && c.getContext('2d')
          }}
        ></canvas>
        <canvas
          class="event-layer"
          width={canvasSize.width}
          height={canvasSize.height}
          ref={(c: any): any => {
            eventLayerContext.value = c && c.getContext('2d')
          }}
          onClick={handleCanvasClick.value}
          onDblclick={handleCanvasDoubleClick.value}
        ></canvas>
        <input
          class="canvas-input"
          type="text"
          v-model={cellInput.value}
          style={{
            width: cell.width + 'px',
            height: cell.height + 'px',
            top: top.value + 'px',
            left: left.value + 'px'
          }}
        />
      </div>
    )
  }
})
