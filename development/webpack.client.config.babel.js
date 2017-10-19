import { client_configuration as clientConfiguration } from 'universal-webpack'; // eslint-disable-line camelcase
import settings from './universal-webpack-settings';
import configuration from './webpack.config';

export default clientConfiguration(configuration, settings);
