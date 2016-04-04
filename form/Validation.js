import isPlainObject from 'is-plain-object';
import isArray from 'is-array';

let IS_EMAIL = /^([a-zA-Z0-9_.+-])+\@(([cd a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

let Validation = {
    cache: {},
    /**
     * @param value
     * @param rules (if string: 'min:6 max:4 require') (if object: {require: true, min:[1], max: 5, custom: function(v){return v === 4}}
     * @returns []
     */
    validate: function(value, rules){
        rules = Validation._normalizeRules(rules);
        var errors = [];
        for(var i in rules) {
            if(Validation.Rules.hasOwnProperty(i)) {
                var isValid = Validation.Rules[i].apply(Validation.Rules, [].concat(value, rules[i]));
                if (!isValid) {
                    errors.push(i);
                }
            } else {
                throw "Unknown validation rule: " + i + ". Please use one of the following: " + Object.keys(Validation.Rules);
            }
        }
        return errors;
    },
    messages: {
        required: 'Value must be defined.',
        max: 'Value is too large.',
        min: 'Value is too small.',
        length: 'This is not valid length.',
        email: 'Invalid email address',
        number: 'Value is not a number',
        positive: 'Value is not a positive number',
        negative: 'Value is not a negative number',
        phone: 'Not valid phone format. Only "-" characters and numbers allowed.',
        'default': 'Something wrong.'
    },
    _normalizeRules: function(rules){
        if(typeof rules === 'string') {
            if(Validation.cache[rules] === undefined) {
                var strRules = rules.split(' ');
                let object = {};
                for(var i = 0; i < strRules.length; i++) {
                    var args = strRules[i].split(':');
                    var name = args.shift();
                    object[name] = args;
                }
                Validation.cache[rules] = object;
            }
            rules = Validation.cache[rules];
        } else if(isPlainObject(rules)) {
            for(var k in rules) {
                if(rules.hasOwnProperty(k) && !isArray(rules[k])){
                    rules[k] = [rules[k]]
                }
            }
        }
        return rules ? rules : {};
    },
    Rules: {
        required: function (v, lazy) {
            return lazy === 'lazy' ? 
                ((v === '0' || v === ' ') ? false : !!v)  :
                (v === 0 || v === false) || v;
        },
        max: function (v, limit) {
            if(!v)v=0;
            return parseInt(v) <= limit;
        },
        min: function (v, limit) {
            if(!v)v=0;
            return parseInt(v) >= limit;
        },
        length: function (v, min, max) {
            if(!v)v="";
            return (max === undefined ? true : v.length <= max) && v.length >= min;
        },
        pattern: function(v, pattern) {
            return pattern.test(v);
        },
        number: function (v) {
            return Validation.Rules.pattern(v, /^(-?\d*)$/g);
        },
        positive: function (v) {
            return Validation.Rules.pattern(v, /^(\d*)$/g);
        },
        negative: function (v) {
            return Validation.Rules.pattern(v, /^(-\d*)$/g);
        },
        email: function(v){
            return Validation.Rules.pattern(v, IS_EMAIL);
        },
        phone: function(v){
            if(v) {
                if(typeof v === 'string') {
                    let numbers = v.replace(/-/g, '');
                    return Validation.Rules.number(numbers);
                } 
                return typeof v === 'number';
            }
            return true;
        },
        custom: function(v, callback) {
            return callback(v);
        }
    }
};
export default Validation;