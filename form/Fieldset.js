import React from 'react';
import ChildModifier from './ChildModifier';
/**
 * inheritance:
 * class ChildClass extends Fieldset{
 *    renderChildren(){
 *       return [
 *           <Text name="firstname" key="1"/>,
 *           <Text name="lastname" key="2"/>
 *       ].map((child, key) => {return this._cloneChild(child, key)})
 *       super.renderChild
 *    }
 * }
 * 
 */
export default class Fieldset extends ChildModifier {
    render(){
        return <fieldset disabled={this.props.disabled} form={this.props.form} title={this.props.title} className={this.props.className} id={this.props.id}>
            {this.renderChildren()}
        </fieldset>
    }
    cloneChild(child, key){
        if(!child.props || child.props.noClone) {
            return child;
        }
        let newProps = {
            formId: this.props.formId
        };
        if(this.props.formModel && !child.props.formModel)newProps.formModel = this.props.formModel;
        if(this.props._formErrors && !child.props._formErrors)newProps._formErrors = this.props._formErrors;
        if(this.props._formErrorMessages && !child.props._formErrorMessages)newProps._formErrorMessages = this.props._formErrorMessages;
        newProps.ref = key;
        newProps.key = key;
        if(child.props.onSetValue === undefined)newProps.onSetValue = this.props.onSetValue;
        if(child.props.value === undefined && this.props.formModel)newProps.value = this.props.formModel[child.props.name];
        if(child.props.errors === undefined && this.props._formErrors)newProps.errors = this.props._formErrors[child.props.name];
        if(child.props.errorMessages === undefined && this.props._formErrorMessages)newProps.errorMessages = this.props._formErrorMessages[child.props.name];
        return React.cloneElement(child, newProps);
    }

    getAggregateState(){
        let out = {};
        if(this.refs) {
            for(let r in this.refs){
                let child = this.refs[r];
                if(child.getInputState) {
                    out[child.props.name] = child.getInputState(child.getValue());
                }
                if(child.getAggregateState) {
                    let aggregate = child.getAggregateState();
                    for(let aKey in aggregate){
                        out[aKey] = aggregate[aKey];
                    }
                }
            }
        }
        return out;
    }
}