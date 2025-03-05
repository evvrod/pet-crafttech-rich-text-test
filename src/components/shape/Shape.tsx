import { useRef, useState, useEffect, useCallback } from 'react';
import { Group, Rect, Circle, RegularPolygon } from 'react-konva';
import { Html } from 'react-konva-utils';
import Konva from 'konva';
import html2canvas from 'html2canvas';

import TextEditor from '../textEditor/TextEditor';
import HtmlText from '../htmlText/HtmlText';
import 'react-quill/dist/quill.snow.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  selectFigure,
  clearSelection,
} from '../../store/slices/activeFigureSlice';
import { openMenu, closeMenu } from '../../store/slices/menuSlice';

import { useShapeHandlers } from './useShapeHandlers';

import { Figure } from '../../types/types';

import styles from './Shape.module.css';

interface IShapeProps {
  figure: Figure;
  tool: string;
}

export default function Shape(props: IShapeProps) {
  const { figure, tool } = props;

  const {
    isEditing,
    htmlValue,
    activeMenuId,
    groupRef,
    htmlRef,
    handleClick,
    openShapeEditor,
    openTextEditor,
    saveHtml,
  } = useShapeHandlers(figure, tool);

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
        ref={groupRef}
        draggable
      >
        {renderShape()}
        {isEditing && (
          <Html>
            <TextEditor
              value={htmlValue}
              save={(newValue) => saveHtml(newValue)}
            />
          </Html>
        )}
        {activeMenuId === figure.id && (
          <Html>
            <div className={styles.menu}>
              <button className={styles.buttonMenu} onClick={openTextEditor}>
                Поменять текст
              </button>
              <button className={styles.buttonMenu} onClick={openShapeEditor}>
                Поменять фигуру
              </button>
            </div>
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={htmlValue} id={figure.id} />
      </Html>
    </>
  );
}
