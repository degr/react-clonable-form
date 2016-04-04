import isArray from 'is-array';
import React, {Component} from 'react';

export default class ChildModifier extends Component {
    renderChildren() {
        if (!this.props.children)return null;

        let children;
        if (React.isValidElement(this.props.children)) {
            children = [this.props.children]
        } else if (this.props.children && this.props.children.length) {
            children = this.props.children;
        } else if (this.props.children) {
            throw 'Unknown chldrens format in form';
        } else {
            return null;
        }
        return children.map(this._cloneChild.bind(this));
    }
    _cloneChild(child, key){
        if(isArray(child)) {
            return child.map(this._cloneChild.bind(this))
        } else {
            return this.cloneChild(child, key)
        }
    }
}