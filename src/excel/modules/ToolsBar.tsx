import { defineComponent } from '@vue/runtime-core'
import { MergeCellsOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'SheetToolsBar',
  setup () {
    return () => (
      <div class="sheet-tools-bar">
        <span class="tool-item" title="合并单元格" >
         <MergeCellsOutlined />
        </span>
      </div>
    )
  }
})
