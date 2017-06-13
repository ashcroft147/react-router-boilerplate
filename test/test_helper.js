// Set up testing environment to run like a browser in the command line
// 1. jsdom: is a kind of emulation or it fakes the DOM and HTML at the command line
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window); // 

// build 'renderComponent' helper that should render a given react class
// In renderComponent, we actually render component of connected version of comment list
// what's the difference betwrrn props vs state ?
var renderComponent = (ComponentClass, props, state) => {
    const componentInstance = TestUtils.renderIntoDocument(
        // CommentList, CommentBox element must be a child of the provider compnent 
        <Provider store= {createStore(reducers, state)}> 
            <ComponentClass {...props} />
        </Provider>
    ); // render React element into a detached DOM node

    return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

//  Build helper for simulating events with using react's Simulate method
$.fn.simulate = function(eventName, value) {
    if(value) {
        this.val(value);
    }

    TestUtils.Simulate[eventName](this[0]); // this[0]: select first element, avoid multiple elements are selected
}


// Setup chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };