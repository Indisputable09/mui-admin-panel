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
        config={{
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
