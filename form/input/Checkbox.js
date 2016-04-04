import React from 'react';
import extend from 'extend';
import AbstractInput from './AbstractInput.js'

export default class Checkbox extends AbstractInput{
    render(){
        var attributes = this.getCheckBoxAttributes();
        
        var input = React.createElement('input', attributes);
        let labelText = this.getLabelValue();
        var elems = [input, <span key='label'>{labelText ? labelText : ' '}</span>];
        
        var label = this.buildLabel(attributes.id, elems);
        var className = 'formfield-holder formfield-' + this.getInputType() +
            (this.props.className ? ' ' + this.props.className : '');
        var errors = this.buildErrorMessage();
        return (<div className={className} key={this.props.key}>
            {this.props.fakeLabel ? <div className="fake-label">&nbsp;</div> : null}
            {label}
            {errors}
        </div>);
    }
    onChangeRadio(event){
        this.setValue(
            this.props.checked !== undefined ? !this.props.checked : !this.props.value,
            event);
    }
    getValue() {
        return !!(this.props.checked !== undefined ? this.props.checked : this.props.value);
    }
    
    getCheckBoxAttributes(){
        var out = extend({}, this.props.attr);
        out.type = this.getInputType();
        out.checked = this.getValue();
        out.name = this.props.name;
        out.key = 'input';
        if(!out.id) {
            out.id = (this.props.formId ? this.props.formId + '_' + this.props.name : null);
        }
        if(!out.onChange) {
            out.onChange = this.onChangeRadio.bind(this);
        }
        return out;
    }
    
    getInputType(){
        return 'checkbox';
    }
}