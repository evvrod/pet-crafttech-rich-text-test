import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './TextEditor.module.css';

interface ITextEditorProps {
  value: string;
  save: (value: string) => void;
}

export default function TextEditor(props: ITextEditorProps) {
  const { value, save } = props;

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

  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.panel}>
        <button onClick={() => save(text)}>Save</button>
        <button onClick={() => save(value)}>Cancel</button>
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
