import React, { useRef } from 'react';
// import styles from './styles.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}) => {
  // Editor ref

  const quill = useRef();

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'clean',
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };

  return (
    <div style={{ minWidth: '100%', maxWidth: '75vh' }}>
      <ReactQuill
        ref={(el) => (quill.current = el)}
        theme="snow"
        value={value}
        onChange={onChange}
        formats={formats}
        modules={modules}
        error={error}
        {...other}
        style={{
          minWidth: '100%',
          maxWidth: '75vh',
          marginTop: '1rem',
          height: '260px',
        }}
      />
      {helperText && helperText}
    </div>
  );
};

export default Editor;
