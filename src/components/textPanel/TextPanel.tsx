import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateFigure } from '../../store/slices/figuresSlice';
import { closeTextEditorPanel } from '../../store/slices/textEditorPanelStateSlice';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './TextPanel.module.css';

interface ITextEditorProps {
  id: string;
  value: string;
}

export default function TextPanel(props: ITextEditorProps) {
  const { id, value } = props;

  const dispatch = useDispatch();

  const [text, setText] = useState<string>(value);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
  };

  const handleChange = (str: string) => {
    setText(str);
  };

  function saveText(str: string) {
    dispatch(updateFigure({ id: id, updates: { html: str } }));
    dispatch(closeTextEditorPanel());
  }

  return (
    <div className={styles.editor}>
      <div className={styles.panel}>
        <button onClick={() => saveText(text)}>Save</button>
        <button onClick={() => dispatch(closeTextEditorPanel())}>Cancel</button>
      </div>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        className={styles.content}
      />
    </div>
  );
}
