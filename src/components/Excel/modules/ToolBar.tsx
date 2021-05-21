import { defineComponent } from '@vue/runtime-core'
import { MergeCells } from '@icon-park/vue-next'

export default defineComponent({
  name: 'ExcelToolBar',
  setup () {
    return () => (
      <div class="excel-tool-bar">
        <span class="tool-item" title="合并单元格" >
          <MergeCells size="1.4em" />
        </span>
      </div>
    )
  }
})
