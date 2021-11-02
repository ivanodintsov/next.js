import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import config from '~/config';

const bugsnagClient = bugsnag(config.bugsnag);

bugsnagClient.use(bugsnagReact, React);

export default bugsnagClient;
