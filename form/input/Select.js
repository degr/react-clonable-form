import React from 'react';
import AbstractInput from './AbstractInput.js'

export default class Select extends AbstractInput{
    render(){
        var group = this.buildOptionsGroup(this.props.options);
        var label = this.props.noLabel !== false ?
            (this.buildLabel(this.props.attr ? this.props.attr.id : null, this.getLabelValue())) :
            null;
        
        var className = 'formfield-holder formfield-select ' + 
            (this.props.className ? ' ' + this.props.className : '');
        
        return this.wrapInput(
            this.buildInput(group),
            label,
            false,
            className
        );
    }

    buildInput(optionsGroup){
        return <select {...this.props.attr} value={this.props.value} onChange={this.onChange.bind(this)}>
                {optionsGroup}
            </select>;
    }

    buildOptionsGroup(options) {
        var out = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            out.push(<option value={option.value} key={i}>{option.label}</option>);
        }
        return out;
    }
    onChange(event) {
        this.setValue(event.target.value);
    }
}