import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../../store/slices/toolSlice';
import { RootState } from '../../store';

import { Tool } from '../../types/types';

export default function ToolPanel() {
  const dispatch = useDispatch();
  const tool = useSelector((state: RootState) => state.tool.tool);

  const handleToolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTool(e.target.value as Tool));
  };

  return (
    <>
      <label>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === 'cursor'}
          onChange={handleToolChange}
        />
        <span>Interaction</span>
      </label>

      <label>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === 'shape'}
          onChange={handleToolChange}
        />
        <span>Add</span>
      </label>
    </>
  );
}
