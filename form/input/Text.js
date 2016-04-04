import React from 'react';
import AbstractInput from './AbstractInput.js'

export default class Text extends AbstractInput{

    render(){
        var input = this.buildInput(this.prepareAttributes());
        var label = this.props.noLabel === true ? null :
            this.buildLabel(this.props.attr ? this.props.attr.id : null, this.getLabelValue());
        return this.wrapInput(input, label);
    }
    
    prepareAttributes(){
        var attributes = extend({}, this.props.attr);
        attributes.type = this.props.type ? this.props.type : 'text';
        attributes.value = this.getValue();

        attributes.name = this.props.name;
        if(!attributes.onChange) {
            attributes.onChange = this.changeValue.bind(this);
        }
        if(!attributes.id) {
            attributes.id = (this.props.formId ? this.props.formId + '_' + this.props.name : null);
        }
        return attributes;
    }
    
    getInputType(){
        return 'input';
    }
    
    buildInput(attributes){
        return React.createElement(this.getInputType(), attributes);
    }
}