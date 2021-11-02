import { useSnackbar } from 'notistack';
const copy = require('copy-to-clipboard');

const useShare = () => {
  const { enqueueSnackbar } = useSnackbar();

  const share = (data) => {
    let nav: any;
    nav = window.navigator;

    if (nav.canShare && nav.canShare(data)) {
      nav.share(data)
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
    } else {
      copy(data.url || window.location.href);
      enqueueSnackbar('Ссылка скопирована', { variant: 'success' });
    }
  };

  return {
    share,
  }
};

export default useShare;
