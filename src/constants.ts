import Flmngr from '@flmngr/flmngr-react';

export const stopInputScroll = (e: any) => {
  (e.target as HTMLInputElement).blur();
  e.stopPropagation();
  setTimeout(() => {
    (e.target as HTMLInputElement).focus();
  }, 0);
};

export const Status = {
  idle: 'IDLE',
  pending: 'PENDING',
  resolved: 'RESOLVED',
  rejected: 'REJECTED',
};

export const haveSameData = function (obj1: any, obj2: any) {
  const result = JSON.stringify(obj1) === JSON.stringify(obj2);
  return result;
};

export const loadFileManager = () => {
  Flmngr.load({
    apiKey: 'FLMNFLMN', // default free key
    urlFileManager: 'https://fm.flmngr.com/fileManager', // demo server
    urlFiles: 'https://fm.flmngr.com/files', // demo file storage
  });
};

export const getAltText = (url: string) => {
  const separatedArray = url.split('/');
  const altText = separatedArray[separatedArray.length - 1].split('.')[0];
  return altText;
};
