import createServer from '@wehkamp/blaze-nodejs-server';
import AppRoot from '../client/index';
import reducer from '../store/reducer';

export default ({ chunks }) => {
  createServer({
    AppRoot,
    appReducers: { test: reducer },
    chunks: chunks(),
  }).start();
};
