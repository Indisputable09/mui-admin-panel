export const stopInputScroll = (e: any) => {
  (e.target as HTMLInputElement).blur();
  e.stopPropagation();
  setTimeout(() => {
    (e.target as HTMLInputElement).focus();
  }, 0);
};
