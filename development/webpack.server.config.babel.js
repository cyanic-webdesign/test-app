import { server_configuration as serverConfiguration } from 'universal-webpack'; // eslint-disable-line camelcase
import settings from './universal-webpack-settings';
import configuration from './webpack.config';

export default serverConfiguration(configuration, settings);
