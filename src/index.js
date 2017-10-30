import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {blue500, grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        accent1Color: grey500
    }
});

const xhttp = new XMLHttpRequest();
let appConfig = {};
xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
       // Typical action to be performed when the document is ready:
       appConfig = JSON.parse(xhttp.responseText);
       ReactDOM.render(
           <MuiThemeProvider muiTheme={muiTheme}>
               <App appConfig={JSON.stringify(appConfig)}/>
           </MuiThemeProvider>,
           document.getElementById('root')
       );
       registerServiceWorker();
    }
};

xhttp.open('GET', `${process.env.PUBLIC_URL}/app-config.json`, true);
xhttp.send();
