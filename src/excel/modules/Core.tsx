import { useSize } from '@/hooks/useSize'
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { initContentLayer, initEventLayer, initInputDOM } from '../hooks/useLayer'
import { useCanvasDoubleClick } from '../hooks/useEvents'
import { cell } from '../config'
import { CanvasSize } from '../types'

export default defineComponent({
  name: 'SheetCore',
  setup () {
    // DOM
    const excelCore = ref<HTMLElement | null>(null)
    const canvasSize = reactive<CanvasSize>({
      width: -99999,
      height: -99999
    })
    const contentLayerContext = ref<CanvasRenderingContext2D | null>(null)
    const eventLayer = ref<HTMLCanvasElement | null>(null)
    const eventLayerContext = ref<CanvasRenderingContext2D | null>(null)
    const inputDom = ref<HTMLInputElement | null>(null)

    onMounted(async () => {
      const { width, height } = useSize(excelCore.value)
      canvasSize.width = width
      canvasSize.height = height
    })

    // init
    initContentLayer(contentLayerContext, canvasSize)
    initEventLayer(eventLayer, canvasSize)
    initInputDOM(inputDom, contentLayerContext)
    // use
    const { handleCanvasDoubleClick, top, left } = useCanvasDoubleClick(eventLayerContext, canvasSize)

    return () => (
      <div class="sheet-core" ref={excelCore}>
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
            eventLayer.value = c
            eventLayerContext.value = c && c.getContext('2d')
          }}
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
