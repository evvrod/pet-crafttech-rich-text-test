import { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';
import html2canvas from 'html2canvas';

import { RootState } from '../../store';
import {
  selectFigure,
  clearSelection,
} from '../../store/slices/activeFigureSlice';
import { openMenu, closeMenu } from '../../store/slices/menuSlice';

import { Figure } from '../../types/types';

export function useShapeHandlers(figure: Figure, tool: string) {
  const { id, html } = figure;
  const dispatch = useDispatch();
  const activeMenuId = useSelector(
    (state: RootState) => state.menu.activeMenuId,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [htmlValue, setHtmlValue] = useState(html);

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const calculateDimensions = (figure: Figure) => {
    if (figure.type === 'circle') {
      return { width: 1.5 * figure.radius, height: 1.5 * figure.radius };
    }
    if (figure.type === 'rect') {
      return { width: figure.width, height: figure.height };
    }
    if (figure.type === 'triangle') {
      return { width: figure.radius, height: figure.radius };
    }
    return { width: 0, height: 0 };
  };

  const renderImage = useCallback(async () => {
    if (!htmlRef.current) return;
    const { width, height } = calculateDimensions(figure);

    const canvas = await html2canvas(htmlRef.current, {
      backgroundColor: 'rgba(122,0,0,1)',
      width,
      height,
    });

    if (imageRef.current) {
      imageRef.current.destroy();
    }

    const shape = new Konva.Image({
      x: -width / 2,
      y: -height / 2,
      width,
      height,
      image: canvas,
    });

    groupRef.current?.add(shape);
    imageRef.current = shape;
  }, [figure]);

  useEffect(() => {
    if (!isEditing) {
      renderImage();
    }
  }, [isEditing, renderImage]);

  const handleClick = () => {
    if (tool === 'shape') return;
    if (tool === 'cursor' && !isEditing) {
      dispatch(openMenu(id));
      dispatch(clearSelection());
    }
  };

  const openShapeEditor = () => {
    dispatch(selectFigure(figure));
    dispatch(closeMenu());
  };

  const openTextEditor = () => {
    dispatch(closeMenu());
    imageRef.current?.hide();
    setIsEditing(true);
  };

  const saveHtml = (newValue: string) => {
    setHtmlValue(newValue);
    setIsEditing(false);
  };

  return {
    isEditing,
    htmlValue,
    activeMenuId,
    groupRef,
    htmlRef,
    handleClick,
    openShapeEditor,
    openTextEditor,
    saveHtml,
  };
}
