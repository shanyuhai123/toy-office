import { App } from '@vue/runtime-core'
import ToySheet from './excel'

ToySheet.install = (app: App) => {
  app.component(ToySheet.name, ToySheet)
}

export default ToySheet
