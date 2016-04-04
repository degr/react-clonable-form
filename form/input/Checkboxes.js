import React from 'react';
import extend from 'extend';
import AbstractInput from './AbstractInput.js'
import Checkbox from './Checkbox.js'


export default class Checkboxes extends AbstractInput{

    render(){
        var group = this.buildCheckboxesGroup(this.props.options);
        var label = this.buildLabel(null, this.getLabelValue());
        var className = 'formfield-holder formfield-checkboxes' +
            (this.props.className ? ' ' + this.props.className : '');
        return this.wrapInput(group, label, false, className);
    }

    onUpdateGroup(name, value, event){
        let out = extend({}, this.props.value);
        out[name] = value;
        this.setValue(out, event);
    }
    buildCheckboxesGroup(options) {
        var out = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var radioId = this.getId() + "_" + option.value;
            var attributes = {
                name: option.value,
                label: option.label,
                id: radioId,
                type: 'checkbox',
                key: i,
                checked: this.props.value[option.value],
                onSetValue: this.onUpdateGroup.bind(this),
                attr: {
                    id: radioId
                }
            };

            var input = <Checkbox {...attributes}/>;
            out.push(input);
        }
        return out;
    }
}