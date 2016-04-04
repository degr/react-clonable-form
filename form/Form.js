import React from 'react';

import ChildModifier from './ChildModifier.js';

export default class Form extends ChildModifier {
    static notifier;
    static setNotifier(notifier){
        Form.notifier = notifier;
    }
    
    shouldComponentUpdate(nextProps){
        for(let key in this.props) {
            if(typeof nextProps[key] !== 'function' && nextProps[key] != this.props[key]) {
                return true;
            }
        }
        return false;
    }
    
    submit(e) {
        if(typeof this.props.submit === 'function') {
            if(e)e.preventDefault();
            var errors = {};
            var onError = false;
            var model = {};
            
            if(this.refs) {
                for(let r in this.refs){
                    let child = this.refs[r];
                    if(child.getInputState) {
                        if(Form.onSubmitField(child.getInputState(child.getValue()), child.props.name, model, errors) && !onError){
                            onError = true;
                        }
                    }
                    if(child.getAggregateState) {
                        let aggregate = child.getAggregateState();
                        for(let aKey in aggregate) {
                            if(Form.onSubmitField(aggregate[aKey], aKey, model, errors) && !onError){
                                onError = true;
                            }
                        }
                    }
                }
            }
            if(notifier && onError) {
                notifier('Validation fail. Form contain errors.');
            }
            this.props.submit(model, onError, onError ? errors : null, e);
        }
    }
    
    static onSubmitField(field, key, model, errors){
        let {value, errorMessages, errorKeys} = field;
        model[key] = value;
        if (errorKeys && errorKeys.length) {
            errors[key] = errorMessages;
            return true;
        }
        return false;
    }
    
    render() {
        return (<form onSubmit={this.submit.bind(this)} className={this.props.className} id={this.props.id}>
            {this.renderChildren()}
            <div className="clearfix"></div>
        </form>);
    }


    cloneChild(child, key){
        if(!child.props || child.props.noClone) {
            return child;
        }
        let newProps = {
            formId: this.props.id
        };
        if(this.props.model && !child.props.formModel)newProps.formModel = this.props.model;
        if(this.props.errors && !child.props._formErrors)newProps._formErrors = this.props.errors;
        if(this.props.errorMessages && !child.props._formErrorMessages)newProps._formErrorMessages = this.props.errorMessages;
        newProps.ref = key;
        newProps.key = key;
        if(child.props.onSetValue === undefined)newProps.onSetValue = this.collectValues.bind(this);
        if(child.props.value === undefined && this.props.model)newProps.value = this.props.model[child.props.name]; 
        if(child.props.errors === undefined && this.props.errors)newProps.errors = this.props.errors[child.props.name]; 
        if(child.props.errorMessages === undefined && this.props.errorMessages)newProps.errorMessages = this.props.errorMessages[child.props.name]; 
        return React.cloneElement(child, newProps);
    }
    

    collectValues(name, value, errorMessages, errorKeys, event){
        if(typeof this.props.onCollectValues === 'function') {
            this.props.onCollectValues(name, value, errorMessages, errorKeys, event);
        } else {
            throw "Form must contain 'onCollectValues' props. Please, specify this function."
        }
    }
}
