import React from 'react';
import { CKEditor } from 'ckeditor4-react';

interface IEditorProps {
  debug?: boolean;
  initData: string;
  onChange: (e: any) => void;
  name?: string;
}

const Editor: React.FC<IEditorProps> = props => {
  return (
    <>
      <CKEditor
        {...props}
        onInstanceReady={event => {
          event.editor.on('beforeCommandExec', function (event: any) {
            if (event.data.name === 'paste') {
              event.editor._.forcePasteDialog = true;
            }
            if (
              event.data.name === 'pastetext' &&
              event.data.commandData.from === 'keystrokeHandler'
            ) {
              event.cancel();
            }
          });
        }}
        config={{
          format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;div',
          stylesSet: [
            {
              name: 'Checkmark list',
              element: 'ul',
              attributes: { class: 'checkMark' },
            },
          ],
        }}
      />
    </>
  );
};

export default Editor;
