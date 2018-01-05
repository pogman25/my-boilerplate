import * as React from 'react';
import { connect } from 'react-redux';

class Templ extends React.Component<any, any>{
    render() {
        return (
            <div>
                <h1>пример Redux-Saga</h1>
            </div>
        )
    }
}

const mapStoreToProps = () => ({

});

const mapDispatchToProp = () => ({

});

export default connect(mapStoreToProps, mapDispatchToProp)(Templ);
