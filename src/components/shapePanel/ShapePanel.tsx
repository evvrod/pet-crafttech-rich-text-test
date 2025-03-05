import { useDispatch, useSelector } from 'react-redux';
import { setShape } from '../../store/slices/shapeSlice';
import { RootState } from '../../store';

import { Shape } from '../../types/types';

import styles from './ShapePanel.module.css';

export default function ShapePanel() {
  const dispatch = useDispatch();

  const selectedShape = useSelector(
    (state: RootState) => state.shape.selectedShape,
  );

  const handleShapeChange = (shape: Shape) => {
    dispatch(setShape(shape));
  };

  return (
    <div>
      <div className={styles.shapes}>
        <p>Selected Shape: {selectedShape}</p>

        <label>
          <input
            type="radio"
            name="shape"
            value="circle"
            checked={selectedShape === 'circle'}
            onChange={() => handleShapeChange('circle')}
          />
          Circle
        </label>

        <label>
          <input
            type="radio"
            name="shape"
            value="rect"
            checked={selectedShape === 'rect'}
            onChange={() => handleShapeChange('rect')}
          />
          Rectangle
        </label>

        <label>
          <input
            type="radio"
            name="shape"
            value="triangle"
            checked={selectedShape === 'triangle'}
            onChange={() => handleShapeChange('triangle')}
          />
          Triangle
        </label>
      </div>
    </div>
  );
}
