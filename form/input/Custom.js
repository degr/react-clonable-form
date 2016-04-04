import React from 'react';
import Text from './Text';

export default class Custom extends Text{
    buildInput() {
        return this.props.custom;
    }
}