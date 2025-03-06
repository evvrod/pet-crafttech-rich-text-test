import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import {
  closeOptionPanel,
  openOptionPanel,
} from '../../store/slices/optionPanelStateSlice';
import {
  closeTextEditorPanel,
  openTextEditorPanel,
} from '../../store/slices/textEditorPanelStateSlice';

import {
  deleteFigure,
  selectFigureById,
} from '../../store/slices/figuresSlice';

import ToolPanel from '../toolPanel/ToolPanel';
import OptionPanel from '../optionPanel/OptionPanel';
import ShapePanel from '../shapePanel/ShapePanel';
import TextPanel from '../textPanel/TextPanel';

import styles from './Panel.module.scss';

export default function Panel() {
  const dispatch = useDispatch();
  const tool = useSelector((state: RootState) => state.tool.tool);

  const selectedFigure = useSelector(
    (state: RootState) => state.figureSelected.idFigure,
  );

  const figure = useSelector((state: RootState) =>
    selectedFigure ? selectFigureById(state, selectedFigure) : null,
  );

  const activeOptionPanel = useSelector(
    (state: RootState) => state.optionPanelState.activePanelId,
  );
  const activeTextEditorPanel = useSelector(
    (state: RootState) => state.textEditorPanelState.activePanelId,
  );

  const handleDelete = () => {
    if (figure) {
      dispatch(deleteFigure(figure.id));
    }
  };

  const handleEditText = () => {
    if (figure) {
      dispatch(openTextEditorPanel(figure.id));
      dispatch(closeOptionPanel());
    }
  };

  const handleEditShape = () => {
    if (figure) {
      dispatch(openOptionPanel(figure.id));
      dispatch(closeTextEditorPanel());
    }
  };

  return (
    <div className={styles.panel}>
      <h1>Options</h1>
      <ToolPanel />
      {tool === 'shape' && <ShapePanel />}

      {tool === 'cursor' && selectedFigure && figure && (
        <div className={styles.info}>
          <h2>Selected shape</h2>
          <p>Id = {figure.id}</p>
          <p>Type = {figure.type}</p>
        </div>
      )}

      {tool === 'cursor' &&
        selectedFigure &&
        figure &&
        !activeOptionPanel &&
        !activeTextEditorPanel && (
          <>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEditText}>Edit Text</button>
            <button onClick={handleEditShape}>Edit Shape</button>
          </>
        )}

      {tool === 'cursor' && selectedFigure && figure && activeOptionPanel && (
        <OptionPanel />
      )}

      {tool === 'cursor' &&
        selectedFigure &&
        figure &&
        activeTextEditorPanel && (
          <TextPanel id={figure.id} value={figure.html} />
        )}
    </div>
  );
}
