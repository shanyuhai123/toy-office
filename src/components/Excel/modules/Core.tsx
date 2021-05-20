import { useSize } from '@/hooks/useSize'
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { initContentLayer, initInputDOM } from '../hooks/useLayer'
import { useCanvasClick, useCanvasDoubleClick } from '../hooks/useEvents'
import { cell } from '../config'
import { CanvasSize } from '../types'

interface CoreProps {
  onCoordinate: (str: string) => void;
}

export default defineComponent<CoreProps>({
  name: 'ExcelCore',
  emits: ['coordinate'],
  setup (_, { emit }) {
    // DOM
    const excelCore = ref<HTMLElement | null>(null)
    const canvasSize = reactive<CanvasSize>({
      width: -99999,
      height: -99999
    })
    const eventLayerContext = ref<CanvasRenderingContext2D | null>(null)
    const contentLayerContext = ref<CanvasRenderingContext2D | null>(null)
    const inputDom = ref<HTMLInputElement | null>(null)

    onMounted(async () => {
      const { width, height } = useSize(excelCore.value)
      canvasSize.width = width
      canvasSize.height = height
    })

    // init
    initContentLayer(contentLayerContext, canvasSize)
    initInputDOM(inputDom, contentLayerContext)
    // use
    const { handleCanvasClick } = useCanvasClick(eventLayerContext, canvasSize, emit)
    const { handleCanvasDoubleClick, top, left } = useCanvasDoubleClick(eventLayerContext, canvasSize)

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
          style={{
            width: cell.width + 'px',
            height: cell.height + 'px',
            top: top.value + 'px',
            left: left.value + 'px'
          }}
          ref={inputDom}
        />
      </div>
    )
  }
})
