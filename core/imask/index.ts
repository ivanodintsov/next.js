const phone = '+{7} (000) 000-00-00';

const phoneBlock = {
  mask: '+M OPERATOR REST',
  startsWith: '7',
  definitions: {
    M: /[1-9]/,
  },
  blocks: {
    OPERATOR: {
      mask: '(000)',
    },

    REST: {
      mask: '000-00-00',
    },
  },
};

const phoneBlock8 = {
  mask: 'COUNTRY OPERATOR REST',
  startsWith: '8',
  blocks: {
    COUNTRY: {
      mask: '+8',
    },

    OPERATOR: {
      mask: '(000)',
    },

    REST: {
      mask: '000-00-00',
    },
  },
};

export default {
  phone,
  phoneBlock,
  phoneBlock8,
};
