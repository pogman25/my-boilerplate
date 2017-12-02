import * as React from 'react';

export default class Folder extends React.Component<any, any> {
    render() {
        const {list} = this.props;
        return (
            <ul>
                {list.map( i => (
                    <li
                        key={i.resource_id}
                    >
                        <p>{i.name}</p>
                    </li>
                ))
                }
            </ul>
        )
    }
}