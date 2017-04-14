import _ from 'lodash';
import './style.scss';

function component () {
    const element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack', 'and', 'Webpack'], ' ');

    return element;
}

document.body.appendChild(component());

function solution(A, K) {
    let lengthA = A.length;
    if (K > lengthA) {
        if(K % lengthA) {
            let X = K - Math.floor(K/lengthA);
            let subA = A.slice(lengthA - X - 1, lengthA);
            A.splice(lengthA - X - 1, lengthA);
            return [...subA, ...A];
        } else {return A;}
    } else {
        let subA = A.slice(lengthA - X - 1, lengthA);
        A.splice(lengthA - X - 1, lengthA);
        return [...subA, ...A];
    }
}