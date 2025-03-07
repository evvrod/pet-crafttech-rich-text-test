import { useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Konva from 'konva';
import html2canvas from 'html2canvas';

import { selectEditedFigure } from '../../store/slices/figureSelectedSlice';

import { isRect } from '../../utils/figureUtils';

import { Figure } from '../../types/types';

export function useShapeHandlers(figure: Figure, tool: string) {
  const { id } = figure;
  const dispatch = useDispatch();

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const renderImage = useCallback(async () => {
    if (!htmlRef.current) return;

    const canvas = await html2canvas(htmlRef.current, {
      backgroundColor: 'rgba(0,0,0,0)',
      width: figure.widthText,
      height: figure.heightText,
    });

    if (imageRef.current) {
      imageRef.current.destroy();
    }

    const shape = new Konva.Image({
      x: isRect(figure) ? 0 : -figure.widthText / 2,
      y: isRect(figure) ? 0 : -figure.heightText / 2,
      width: figure.widthText,
      height: figure.heightText,
      image: canvas,
    });

    groupRef.current?.add(shape);
    imageRef.current = shape;
  }, [figure]);

  useEffect(() => {
    renderImage();
  }, [renderImage]);

  const handleClick = () => {
    if (tool === 'cursor') {
      dispatch(selectEditedFigure(id));
    }
  };

  return {
    groupRef,
    htmlRef,
    handleClick,
  };
}
