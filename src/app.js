import _ from 'lodash';
import React, { Component } from 'react';
import './app.scss';

function component () {
    const element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack', 'and', 'Webpack'], ' ');

    return element;
}

document.body.appendChild(component());