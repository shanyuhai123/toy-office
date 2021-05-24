import { defineComponent } from '@vue/runtime-core'
import { MergeCellsOutlined } from '@ant-design/icons-vue'

interface SheetToolsBarProps {
  onToolsEvent: (str: string) => void;
}

export default defineComponent<SheetToolsBarProps>({
  name: 'SheetToolsBar',
  emits: [
    'tools-event'
  ],
  setup (_, { emit }) {
    const handleCellMerge = () => {
      emit('tools-event', 'cell-merge')
    }

    return () => (
      <div class="sheet-tools-bar">
        <span class="tool-item" title="合并单元格" onClick={handleCellMerge}>
         <MergeCellsOutlined />
        </span>
      </div>
    )
  }
})
