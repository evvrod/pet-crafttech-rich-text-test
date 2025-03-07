import { Group, Rect, Circle, RegularPolygon } from 'react-konva';
import { Html } from 'react-konva-utils';

import HtmlText from '../htmlText/HtmlText';
import 'react-quill/dist/quill.snow.css';

import { useShapeHandlers } from './useShapeHandlers';
import { Figure } from '../../types/types';

interface IShapeProps {
  figure: Figure;
  tool: string;
}

export default function Shape(props: IShapeProps) {
  const { figure, tool } = props;

  const { groupRef, htmlRef, handleClick } = useShapeHandlers(figure, tool);

  const renderShape = () => {
    switch (figure.type) {
      case 'circle':
        return (
          <Circle
            id={figure.id}
            stroke={figure.stroke}
            fill={figure.fill}
            radius={figure.radius}
          />
        );
      case 'rect':
        return (
          <Rect
            id={figure.id}
            stroke={figure.stroke}
            fill={figure.fill}
            width={figure.width}
            height={figure.height}
          />
        );
      case 'triangle':
        return (
          <RegularPolygon
            id={figure.id}
            stroke={figure.stroke}
            fill={figure.fill}
            sides={figure.sides}
            radius={figure.radius}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Group
        x={figure.x}
        y={figure.y}
        onClick={handleClick}
        onTap={handleClick} 
        ref={groupRef}
        draggable
      >
        {renderShape()}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} figure={figure} id={figure.id} />
      </Html>
    </>
  );
}
