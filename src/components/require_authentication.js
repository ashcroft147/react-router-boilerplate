import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC: this is a function which is called within exsisting component
export default function(ComposedComponent) {
    class Authentication extends Component {
        // context: this is just like props but allows us to kind of skip levels in our components hierarchy
        // react forcibly prevents you from abusing this idea of context by forcing you to define these context type properties
        // static keywords: this defines a property or object on the class, and we can access this by not using instance of class
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if(!this.props.authenticated) {
                this.context.router.push('/');
           }
        }

        componentWillUpdate(nextProps) { // this called whenever a new set of props are handed
            if(!nextProps.authenticated) {
                this.context.router.push('/');
            }
        }

        render() {           
            console.log(this.context);
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.authenticated }; // authenticated: props using this component
                                                       // state.authenticated: get state from redux store
    }

    return connect(mapStateToProps)(Authentication);
}
