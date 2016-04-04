import React from 'react';
import AbstractInput from './AbstractInput.js'
import RadioButton from './RadioButton.js'

export default class Radio extends AbstractInput{
    render(){
        var group = this.buildRadioGroup(this.props.options);
        var label = this.props.noLabel !== false ?
            (this.buildLabel(this.props.attr ? this.props.attr.id : null, this.getLabelValue())) :
            null;
        var className = 'formfield-holder formfield-radio' +
            (this.props.className ? ' ' + this.props.className : '')
        return this.wrapInput(group, label, false, className);
    }
    
    buildRadioGroup(options) {
        var out = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var radioId = this.getId() + "_" + option.value;
            var attributes = {
                name: this.props.name,
                label: option.label,
                value: option.value,
                checked: this.getValue() === option.value,
                key: i,
                attr: {id: radioId},
                onSetValue: this.onRadioButtonClick.bind(this)
            };
            out.push(<RadioButton {...attributes}/>);
        }
        return out;
    }
    onRadioButtonClick(name, value, isChecked, errorMessages, errorKeys, event) {
        if(typeof this.props.onSetValue === 'function' && isChecked) {
            this.props.onSetValue(this.props.name, value, errorMessages, errorKeys, event);
        }
    }
}