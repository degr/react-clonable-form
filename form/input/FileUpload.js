import React from 'react';
import StringUtils from '~/utils/StringUtils';
import $ from 'jquery';

import Custom from './Custom.js';

/**
 * <FileUpload name="imageUpload" label="Image"
 *       action="phpmanager/services/temppath/tempupload.php" onSetValue={(name, value) => {...}}/>
 */
export default class FileUpload extends React.Component {

    constructor(props){
        super(props);
        this.id = this.props.id || StringUtils.getUniqueValue();
        
        this.name = this.props.buttonLabel;
        if(!props.action){
            throw 'Please specify "action" for file uploader component.';
        }
    }
    
    form = null;
    iframe = null;
    eventBinded = false;
    
    componentDidMount(){
        let style = 'padding:0;margin:0;height:0;width:0;border:none';
        let form = document.createElement('form');
        form.id = this.id + "_upload_image_form";
        form.enctype = "multipart/form-data";
        form.method ="post";
        form.target = this.id + "_path_iframe";
        form.action = this.props.action;
        form.setAttribute('style', style);
        document.body.appendChild(form);
        this.form = form;
        
        let iframe = document.createElement('iframe');
        iframe.name = this.id + "_path_iframe";
        iframe.id = this.id + "_path_iframe";
        iframe.setAttribute('style', style);
        document.body.appendChild(iframe);
        this.iframe = iframe;
    }
    componentWillUnmount(){
        this.form.parentElement.removeChild(this.form);
        this.form = null;
        this.iframe.parentElement.removeChild(this.iframe);
        this.iframe = null;
    }
    render() {
        let custom = <div className="fileUpload">
            <label className="btn btn-primary" htmlFor={this.id + "_path_input"}>
                <input id={this.id + "_path_input"} name="Filedata" type="file" className="upload"
                       onChange={this.submit.bind(this)} accept={this.props.accept}/>
                <span>{this.name ? this.name : 'Upload'}</span>
            </label>
            {
                this.props.onDelete && this.props.value ? 
                    <a href="#" className="delete-link" onClick={(e) => this.onDelete(e)}>
                        <span className="icon icon-trash"/>{"Delete " + this.props.value}
                    </a> :
                    null
            }
        </div>;
        return <Custom custom={custom} {...this.props} />
    }
    submit(){
        if(!this.eventBinded) {
            this.eventBinded = true;
            this.iframe.onload = this.getIframeContents.bind(this);
        }
        let elem = document.getElementById(this.id + "_path_input");
        let clone = elem.cloneNode(true);
        elem.parentNode.insertBefore(clone, elem);
        this.form.appendChild(elem);
        this.form.submit();
        this.form.removeChild(elem);
    }
    getIframeContents(){
        this.props.onSetValue(this.props.name, $(this.iframe).contents().text(), null);
    }
    onDelete(e){
        if(e)e.preventDefault();
        this.props.onSetValue(this.props.name, '', null);
    }
}