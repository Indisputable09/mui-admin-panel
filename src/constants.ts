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
