import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteFigure, updateFigure } from '../../store/slices/figureSlice';
import { clearSelection } from '../../store/slices/activeFigureSlice';

import styles from './OptionPanel.module.css';

export default function OptionPanel() {
  const dispatch = useDispatch();
  const selectedFigure = useSelector(
    (state: RootState) => state.activeFigure.selectedFigure,
  );

  const [localFigure, setLocalFigure] = useState(selectedFigure);

  useEffect(() => {
    if (selectedFigure) {
      setLocalFigure(selectedFigure);
    }
  }, [selectedFigure]);

  const handleSave = (id: string) => {
    if (!localFigure) return;
    dispatch(updateFigure({ id: id, updates: localFigure }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteFigure(id));
    dispatch(clearSelection());
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setLocalFigure((prevFigure) => {
      if (prevFigure) {
        return {
          ...prevFigure,
          [field]: value,
        };
      }
      return prevFigure;
    });
  };

  if (!localFigure) {
    return <p>No figure selected</p>;
  }

  const renderSizeFields = () => {
    if (localFigure.type === 'circle' || localFigure.type === 'triangle') {
      return (
        <div>
          <label>Radius:</label>
          <input
            type="number"
            value={localFigure.radius}
            onChange={(e) =>
              handleFieldChange('radius', parseInt(e.target.value, 10))
            }
          />
        </div>
      );
    }

    if (localFigure.type === 'rect') {
      return (
        <>
          <div>
            <label>Width:</label>
            <input
              type="number"
              value={localFigure.width}
              onChange={(e) =>
                handleFieldChange('width', parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label>Height:</label>
            <input
              type="number"
              value={localFigure.height}
              onChange={(e) =>
                handleFieldChange('height', parseInt(e.target.value, 10))
              }
            />
          </div>
        </>
      );
    }
  };

  return (
    localFigure && (
      <div className={styles.figures}>
        <p>Selected Shape: {localFigure.id}</p>
        <p>Type: {localFigure.type}</p>

        <div>
          <label>Fill Color:</label>
          <input
            type="color"
            value={localFigure.fill}
            onChange={(e) => handleFieldChange('fill', e.target.value)}
          />
        </div>

        <div>
          <label>Stroke Color:</label>
          <input
            type="color"
            value={localFigure.stroke}
            onChange={(e) => handleFieldChange('stroke', e.target.value)}
          />
        </div>
        {renderSizeFields()}

        <button onClick={() => handleSave(localFigure.id)}>Save</button>
        <button onClick={() => handleDelete(localFigure.id)}>Delete</button>
      </div>
    )
  );
}
