import * as React from 'react';
import {Transition} from "react-transition-group";

const styles = require('./styles');
const cx = require('classnames');

const transitionStyles = {
    entering: {
        transform: 'rotateX(90deg)',
    },
    entered: {
        transform: 'rotateX(0)',
    }
};

export const AppearItem = ({children, index, className, ...props}) => {
    return (
        <Transition
            {...props}
            timeout={{
                enter: 100,
                exit: 500,
            }}
            mountOnEnter
            appear
            exit
            unmountOnExit
        >
            {(state) => (
                <li
                    className={cx(styles.enter, {[className]: className})}
                    style={{
                        ...transitionStyles[state],
                        transitionDelay: `${!!index ? index*0.1 : 0}s`
                    }}>
                    {children}
                </li>)}
        </Transition>
    )
};
