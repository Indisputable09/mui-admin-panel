import Flmngr from '@flmngr/flmngr-react';

export const useFileManager = (
  handleImageChange: (
    file: string | null
  ) => (key?: string, index?: number) => void
) => {
  const openFileManager = (key?: string, index?: number) => {
    Flmngr.open({
      apiKey: 'FLMNFLMN', // default free key
      urlFileManager:
        'https://ortus.artyshok.studio/flmngr?token=def920a9022956f89ad62515e7609820', // server
      urlFiles: 'https://ortus.artyshok.studio/storage/files', // file storage
      isMultiple: false, // let selecting a single file
      acceptExtensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
      onFinish: (files: any) => {
        if (key) {
          console.log('with key');
          handleImageChange(files[0].url)(key, index);
        } else {
          console.log('no key');
          handleImageChange(files[0].url)();
        }
      },
    });
  };

  return {
    openFileManager,
  };
};
