import Flmngr from '@flmngr/flmngr-react';

export const useFileManager = (
  handleImageChange: (file: string | null) => void
) => {
  const openFileManager = () => {
    Flmngr.open({
      apiKey: 'FLMNFLMN', // default free key
      urlFileManager:
        'https://ortus.artyshok.studio/flmngr?token=def920a9022956f89ad62515e7609820', // server
      urlFiles: 'https://ortus.artyshok.studio/storage/files', // file storage
      isMultiple: false, // let selecting a single file
      acceptExtensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
      onFinish: (files: any) => {
        handleImageChange(files[0].url);
      },
    });
  };

  return {
    openFileManager,
  };
};
