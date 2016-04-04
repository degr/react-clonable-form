import React from 'react';
import Checkbox from './Checkbox.js'

export default class RadioButton extends Checkbox{
    getCheckBoxAttributes(){
        var out = super.getCheckBoxAttributes();
        out.value = this.props.value;
        return out;
    }
    
    getInputType(){
        return 'radio';
    }

    setValue(value, event){
        if(typeof this.props.onSetValue === 'function') {
            let {errorMessages, errorKeys} = this.validate(value);
            this.props.onSetValue(this.props.name, this.props.value, value, errorMessages, errorKeys, event);
        }
    }
}