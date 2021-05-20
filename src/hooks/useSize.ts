import { reactive } from '@vue/reactivity'

export interface TargetSize {
  width: number
  height: number
}

export function useSize (target: HTMLElement | null): TargetSize {
  const size = reactive<TargetSize>({
    width: 0,
    height: 0
  })

  if (target) {
    const { clientWidth, clientHeight } = target

    size.width = clientWidth
    size.height = clientHeight
  }

  return size
}
