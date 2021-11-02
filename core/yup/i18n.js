import i18n from '../i18n';

const getError = (key, defaultKey) => (params) => {
  const fieldLabel = i18n.t(`fields.${params.path}.label`);
  const data = {
    ...params,
    field_name: fieldLabel,
  };

  let text = i18n.t(key, data);

  if ((text === key || text === `custom_validation.required.${data.path}`) && defaultKey) {
    text = i18n.t(defaultKey, data);
  }

  return text;
};

const i18nLocale = {
  string: {
    required: getError('validations.required', 'validations.required_default'),
    min: getError('validations.min'),
    max: getError('validations.max'),
    phone_ru: params => i18n.t('validations.phone_ru', params),
    personal_inn_ru: params => i18n.t('validations.personal_inn_ru', params),
    ru_one: params => i18n.t('validations.ru_one', params),
    ru_two: params => i18n.t('validations.ru_two', params),
    date_one: params => i18n.t('validations.date_one', params),
    email: params => i18n.t('validations.email', params),
    password: params => i18n.t('validations.password', params),
    password_equal: params => i18n.t('validations.password_equal', params),
    num_one: params => i18n.t('validations.num_one', params),
    link: params => i18n.t('validations.link', params),
    date: getError('validations.date'),
  },
  mixed: {
    required: getError('validations.required', 'validations.required_default'),
    min: getError('validations.min'),
    max: getError('validations.max'),
    ext: getError('validations.ext'),
    notType: getError('validations.notType'),
  },
  array: {
    fileSize: getError('validations.fileSize'),
  },
  boolean: {
    checkbox: params => i18n.t('validations.checkbox', params),
  },
  number: {
    integer: getError('validations.integer'),
    positive: getError('validations.positive'),
    max: getError('validations.max_number'),
    min: getError('validations.min_number'),
  }
};

export default i18nLocale;
