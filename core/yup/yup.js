import * as Yup from 'yup';
import * as R from 'ramda';
import i18nLocale from './i18n';
import {
  phoneRegex,
  ruOneRegex,
  ruTwoRegex,
  dateOneRegex,
  emailRegex,
  passwordRegex,
  numOneRegex,
  textRegex,
} from './constants';
import { checkInn10, checkInn12 } from './innRu';
// import moment from '~/libs/moment';
import parseDate from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import fileType from 'file-type/browser';

Yup.setLocale(i18nLocale);

Yup.addMethod(Yup.boolean, 'checkbox', () =>
  Yup.boolean().oneOf([true], i18nLocale.boolean.checkbox).required()
);

Yup.addMethod(Yup.string, 'phone_ru', function (args) {
  return Yup.string().matches(phoneRegex, {
    message: i18nLocale.string.phone_ru,
  });
});

Yup.addMethod(Yup.string, 'personalInnRu', () =>
  Yup.string().test({
    message: i18nLocale.string.personal_inn_ru,
    test: (value) => {
      if (R.isNil(value) || R.isEmpty(value)) {
        return true;
      }

      if (R.is(String, value)) {
        const innList = value.split('').map((val) => parseInt(val, 10));
        return checkInn10(innList) || checkInn12(innList);
      }

      return false;
    },
  })
);

Yup.addMethod(Yup.string, 'ruOne', () =>
  Yup.string().matches(ruOneRegex, {
    message: i18nLocale.string.ru_one,
  })
);

Yup.addMethod(Yup.string, 'ruTwo', () =>
  Yup.string().matches(ruTwoRegex, {
    message: i18nLocale.string.ru_two,
  })
);

Yup.addMethod(Yup.string, 'text', function (args) {
  return this.matches(textRegex, {
    message: i18nLocale.string.text(args),
  });
});

Yup.addMethod(Yup.string, 'dateOne', () =>
  Yup.string().matches(dateOneRegex, {
    message: i18nLocale.string.date_one,
  })
);

Yup.addMethod(Yup.string, 'customEmail', () =>
  Yup.string().matches(emailRegex, {
    message: i18nLocale.string.email,
  })
);

Yup.addMethod(Yup.string, 'password', function () {
  return this.matches(passwordRegex, {
    message: i18nLocale.string.password,
  });
});

Yup.addMethod(Yup.string, 'passwordEqual', function (ref) {
  return this.oneOf([ref], i18nLocale.string.password_equal);
});

Yup.addMethod(Yup.string, 'numOne', () =>
  Yup.string().matches(numOneRegex, {
    message: i18nLocale.string.num_one,
  })
);

Yup.addMethod(Yup.string, 'name', () => Yup.string().ruOne().min(2).max(20));

Yup.addMethod(Yup.string, 'min_max', function (min, max) {
  return this.min(
    min,
    i18nLocale.string.min_max({
      min,
      max,
    })
  ).max(
    max,
    i18nLocale.string.min_max({
      min,
      max,
    })
  );
});

const minimumBytes = 4100;
Yup.addMethod(Yup.mixed, 'ext', (extensions) => {
  return Yup.mixed().test({
    message: (params) => {
      const fileName = R.path(['value', 'name'], params);
      return i18nLocale.mixed.ext({
        ...params,
        fileName,
      });
    },
    test: (value) => {
      const blob = value.slice(0, minimumBytes);

      return fileType.fromBlob(blob).then((res) => {
        const isValid = R.includes(res?.mime, extensions);
        return isValid;
      });
    },
  });
});

const getFileSize = (item) => item.size / 1024;
const getTotalFileSize = R.reduce((acc, item) => acc + item.size / 1024, 0);

Yup.addMethod(Yup.array, 'fileSize', (size) => {
  return Yup.array().test({
    message: (params) => {
      const totalSize = getTotalFileSize(params.value);
      return i18nLocale.array.fileSize({
        ...params,
        size: totalSize,
        max: size,
      });
    },
    test: (value) => {
      return getTotalFileSize(value) < size;
    },
  });
});

Yup.addMethod(Yup.mixed, 'fileSize', function (size, config) {
  return this.test({
    message: (params) => {
      const totalSize = getFileSize(params.value);
      return i18nLocale.mixed.fileSize({
        ...params,
        ...config,
        size: totalSize,
        max: size,
      });
    },
    test: (value) => {
      return getFileSize(value) < size;
    },
  });
});

Yup.addMethod(Yup.mixed, 'date', (format, formatText) =>
  Yup.mixed().test({
    message: (params) => {
      return i18nLocale.string.date({
        ...params,
        format: formatText || format,
      });
    },
    test: (value) => {
      if (R.isNil(value) || R.isEmpty(value)) {
        return true;
      }

      if (value.length !== format.length) {
        return false;
      }

      const date = parseDate(value, format, new Date());

      return isValid(date);
    },
  })
);

Yup.addMethod(Yup.string, 'link', function (args) {
  return Yup.string().matches(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    {
      message: i18nLocale.string.link,
    }
  );
});

export default Yup;
