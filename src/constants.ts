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
