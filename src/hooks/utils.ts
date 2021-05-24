import { getCurrentInstance, onMounted } from '@vue/runtime-core'

export const safeOnMounted = (hook: () => any) => {
  const vm = getCurrentInstance()

  if (vm?.isMounted) {
    hook()
  } else {
    onMounted(hook)
  }
}
