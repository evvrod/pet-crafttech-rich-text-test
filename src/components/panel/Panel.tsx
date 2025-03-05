import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { closeMenu } from '../../store/slices/menuSlice';

import ToolPanel from '../toolPanel/ToolPanel';
import OptionPanel from '../optionPanel/OptionPanel';
import ShapePanel from '../shapePanel/ShapePanel';

import styles from './Panel.module.css';

export default function Panel() {
  const dispatch = useDispatch();
  const tool = useSelector((state: RootState) => state.tool.tool);

  const selectedFigure = useSelector(
    (state: RootState) => state.activeFigure.selectedFigure,
  );

  const handlePanelClick = () => {
    dispatch(closeMenu());
  };

  return (
    <div className={styles.panel} onClick={handlePanelClick}>
      <h1>Options</h1>
      <ToolPanel />
      {tool === 'shape' && <ShapePanel />}
      {tool === 'cursor' && selectedFigure && <OptionPanel />}
    </div>
  );
}
