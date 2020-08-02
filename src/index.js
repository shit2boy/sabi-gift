import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ProductProvider } from './Context';

ReactDOM.render(
  <ProductProvider>
    <App />
 </ProductProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
