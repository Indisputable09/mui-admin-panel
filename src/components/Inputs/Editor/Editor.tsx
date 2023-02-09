import React from 'react';
import { CKEditor } from 'ckeditor4-react';

interface IEditorProps {
  debug?: boolean;
  initData: string;
  onChange: (e: any) => void;
}

const Editor: React.FC<IEditorProps> = props => {
  return <CKEditor {...props} />;
};

export default Editor;
