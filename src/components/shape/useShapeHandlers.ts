import { useRef, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Konva from 'konva';
import html2canvas from 'html2canvas';

import { selectEditedFigure } from '../../store/slices/figureSelectedSlice';

import { Figure } from '../../types/types';

export function useShapeHandlers(figure: Figure, tool: string) {
  const { id } = figure;
  const dispatch = useDispatch();

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const dimensions = useMemo(() => {
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
  }, [figure]);

  const renderImage = useCallback(async () => {
    if (!htmlRef.current) return;
    const { width, height } = dimensions;

    const canvas = await html2canvas(htmlRef.current, {
      backgroundColor: 'rgba(0,0,0,0)',
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
  }, [dimensions]);

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
