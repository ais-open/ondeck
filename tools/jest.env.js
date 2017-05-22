import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

// Put $ on the window element so we can
// test react and golden-layout
global.$ = global.jQuery = $;
global.React = React;
global.ReactDOM = ReactDOM;
