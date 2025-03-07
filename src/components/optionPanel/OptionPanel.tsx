import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  updateFigure,
  selectFigureById,
} from '../../store/slices/figuresSlice';
import { closeOptionPanel } from '../../store/slices/optionPanelStateSlice';

import {
  getTextDimensions,
  isCircle,
  isTriangle,
  isRect,
} from '../../utils/figureUtils';

import styles from './OptionPanel.module.scss';

export default function OptionPanel() {
  const dispatch = useDispatch();

  const selectedFigure = useSelector(
    (state: RootState) => state.figureSelected.idFigure,
  );

  const figure = useSelector((state: RootState) =>
    selectedFigure ? selectFigureById(state, selectedFigure) : null,
  );

  const [localFigure, setLocalFigure] = useState(figure);

  useEffect(() => {
    if (figure) {
      setLocalFigure(figure);
    }
  }, [figure]);

  const handleSave = (id: string) => {
    if (!localFigure) return;
    dispatch(updateFigure({ id: id, updates: localFigure }));
    dispatch(closeOptionPanel());
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setLocalFigure((prevFigure) => {
      if (prevFigure) {
        let newFigure = {
          ...prevFigure,
          [field]: value,
        };

        if (field === 'radius' || field === 'width' || field === 'height') {
          const { width, height } = getTextDimensions(newFigure);
          newFigure = {
            ...newFigure,
            widthText: width,
            heightText: height,
          };
        }
        return newFigure;
      }
      return prevFigure;
    });
  };

  if (!localFigure) {
    return <p>No figure selected</p>;
  }

  const renderSizeFields = () => {
    if (isCircle(localFigure) || isTriangle(localFigure)) {
      return (
        <div>
          <label>Radius: </label>
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

    if (isRect(localFigure)) {
      return (
        <>
          <div>
            <label>Width: </label>
            <input
              type="number"
              value={localFigure.width}
              onChange={(e) =>
                handleFieldChange('width', parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label>Height: </label>
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
        <h2>Edit Shape</h2>
        <div>
          <label>Fill Color: </label>
          <input
            type="color"
            value={localFigure.fill}
            onChange={(e) => handleFieldChange('fill', e.target.value)}
          />
        </div>

        <div>
          <label>Stroke Color: </label>
          <input
            type="color"
            value={localFigure.stroke}
            onChange={(e) => handleFieldChange('stroke', e.target.value)}
          />
        </div>
        {renderSizeFields()}

        <button onClick={() => handleSave(localFigure.id)}>Save</button>
      </div>
    )
  );
}
