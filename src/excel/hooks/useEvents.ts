import { Ref, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import { CanvasSize } from '../types'
import { getCellEndpoint } from '../utils'

export const useCanvasDoubleClick = (contentLayerContext: Ref<CanvasRenderingContext2D | null>, size: CanvasSize) => {
  const handleCanvasDoubleClick = ref((...args: any) => { })
  const top = ref(-9999)
  const left = ref(-9999)

  watch(contentLayerContext, async (ctx) => {
    await nextTick()

    handleCanvasDoubleClick.value = (e: MouseEvent) => {
      const { position } = getCellEndpoint(e)

      // TODO：选中首行首列时不触发高亮
      // 1. 后续可选择整行整列
      if (!position.top || !position.left) return

      top.value = position.top
      left.value = position.left
    }
  })

  return {
    top,
    left,
    handleCanvasDoubleClick
  }
}
