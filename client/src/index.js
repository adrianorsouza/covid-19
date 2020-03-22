import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'typeface-nunito';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
