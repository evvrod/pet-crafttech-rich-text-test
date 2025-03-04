import { useRef, useState, useEffect, useCallback } from 'react';
import { Group, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';
import Konva from 'konva';
import html2canvas from 'html2canvas';

import TextEditor from '../textEditor/TextEditor';
import HtmlText from '../htmlText/HtmlText';
import 'react-quill/dist/quill.snow.css'; // или другой стиль по вашему выбору

import { Tool } from '../../types/types';

interface IShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  tool: Tool;
  html: string;
  id: string;
  text: string;
}

export default function Shape(props: IShapeProps) {
  const { x, y, width, height, tool, html, id } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [htmlValue, setHtmlValue] = useState(html);

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const renderImage = useCallback(async () => {
    if (!htmlRef.current) return;
    const htmltext = htmlRef.current;

    const innerhtml = htmltext.innerHTML;
    if (!innerhtml) return;

    const canvas = await html2canvas(htmltext, {
      backgroundColor: 'rgba(0,0,0,0)',
      width,
      height,
    });

    if (imageRef.current) {
      imageRef.current.destroy();
    }

    const shape = new Konva.Image({
      x: 5,
      y: 5,
      width: width - 10,
      height: height - 10,
      image: canvas,
      clip: {
        x: 0,
        y: 0,
        width: width - 10,
        height: height - 10,
      },
    });

    groupRef.current?.add(shape);
    imageRef.current = shape;
  }, [width, height]);

  useEffect(() => {
    if (!isEditing) {
      renderImage();
    }
  }, [isEditing, renderImage]);

  const handleClick = () => {
    if (tool === 'shape') return;

    if (tool === 'cursor' && !isEditing) {
      imageRef.current?.hide();
      setIsEditing(true);
    }
  };

  function SaveHtml(newValue: string) {
    setHtmlValue(newValue);
    setIsEditing(false);
  }

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect stroke={'black'} width={width} height={height} />
        {isEditing && (
          <Html>
            <TextEditor
              value={htmlValue}
              save={(newValue) => SaveHtml(newValue)}
            />
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={htmlValue} id={id} />
      </Html>
    </>
  );
}
