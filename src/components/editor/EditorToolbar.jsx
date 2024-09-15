import { Quill } from 'react-quill';

import EditorToolbarStyle from './EditorToolbarStyle';
import { Divider } from '@mui/material';
import { GrBold } from 'react-icons/gr';
import { GrItalic } from 'react-icons/gr';
import { GrUnderline } from 'react-icons/gr';
import { GrStrikeThrough } from 'react-icons/gr';
import { GrOrderedList } from 'react-icons/gr';
import { GrUnorderedList } from 'react-icons/gr';
import { GrUndo } from 'react-icons/gr';
import { GrRedo } from 'react-icons/gr';
// ----------------------------------------------------------------------
const icons = Quill.import('ui/icons');
icons.bold = null;
icons.italic = null;
icons.underline = null;
icons.strike = null;
icons.list.ordered = null;
icons.list.bullet = null;
const FONT_FAMILY = ['Arial', 'Tahoma', 'Georgia', 'Impact', 'Verdana'];

const FONT_SIZE = [
  '8px',
  '9px',
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '42px',
  '54px',
  '68px',
  '84px',
  '98px',
];
const HEADINGS = [
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6',
];

export function undoChange() {
  // @ts-ignore
  this.quill.history.undo();
}
export function redoChange() {
  // @ts-ignore
  this.quill.history.redo();
}

const Size = Quill.import('attributors/style/size');
Size.whitelist = FONT_SIZE;
Quill.register(Size, true);

const Font = Quill.import('attributors/style/font');
Font.whitelist = FONT_FAMILY;
Quill.register(Font, true);

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video',
];

export default function EditorToolbar({ id, isSimple, ...other }) {
  return (
    <EditorToolbarStyle {...other}>
      <div
        id={id}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#EEF5FD',
        }}>
        <div className="ql-formats">
          {!isSimple && (
            <select className="ql-font" defaultValue="">
              <option value="">Font</option>
              {FONT_FAMILY.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          )}

          {!isSimple && (
            <select className="ql-size" defaultValue="16px">
              {FONT_SIZE.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}

          <select className="ql-header" defaultValue="">
            {HEADINGS.map((heading, index) => (
              <option key={heading} value={index + 1}>
                {heading}
              </option>
            ))}
            <option value="">Normal</option>
          </select>
        </div>
        <div className="ql-formats">
          <button type="button" className="ql-bold">
            <GrBold height={10} width={10} />
          </button>
          <button type="button" className="ql-italic">
            <GrItalic height={10} width={10} />
          </button>
          <button type="button" className="ql-underline">
            <GrUnderline height={10} width={10} />
          </button>
          <button type="button" className="ql-strike">
            <GrStrikeThrough height={10} width={10} />
          </button>
        </div>
        <span>
          <Divider
            style={{
              width: '1px',
              height: '20px',
            }}
            light
            // variant="middle"
            orientation="vertical"
          />
        </span>
        {!isSimple && (
          <div className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
          </div>
        )}
        <div className="ql-formats">
          <button type="button" className="ql-list" value="ordered">
            <GrOrderedList height={10} width={10} />
          </button>
          <button type="button" className="ql-list" value="bullet">
            <GrUnorderedList height={10} width={10} />
          </button>
          {!isSimple && (
            <button type="button" className="ql-indent" value="-1" />
          )}
          {!isSimple && (
            <button type="button" className="ql-indent" value="+1" />
          )}
        </div>
        {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-script" value="super" />
            <button type="button" className="ql-script" value="sub" />
          </div>
        )}
        {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-code-block" />
            <button type="button" className="ql-blockquote" />
          </div>
        )}
        <div className="ql-formats">
          <button type="button" className="ql-direction" value="rtl" />
          <select className="ql-align" />
        </div>
        <div className="ql-formats">
          {/* <button type="button" className="ql-link" /> */}
          {/* <button type="button" className="ql-image" /> */}
          {/* <button type="button" className="ql-video" /> */}
        </div>
        <div className="ql-formats">
          {!isSimple && <button type="button" className="ql-formula" />}
          <button type="button" className="ql-clean" />
        </div>
        {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-undo">
              {/* <Iconify icon={'ic:round-undo'} width={18} height={18} /> */}
              <GrUndo />
            </button>
            <button type="button" className="ql-redo">
              {/* <Iconify icon={'ic:round-redo'} width={18} height={18} /> */}
              <GrRedo />
            </button>
          </div>
        )}
      </div>
    </EditorToolbarStyle>
  );
}
