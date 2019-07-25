import React from "react";
import PropTypes from "prop-types";
import "./IPInput.scss";
import { parseIP } from "../utils/parseIP";

const IPInput = ({value, onChange, error, className}) => {

    let values = parseIP(value);

    function changeHandler(event, values, index){
        let {value: newValue} = event.target;

        if(newValue != ""){
            newValue = parseInt(newValue, 10);

            if(isNaN(newValue)){
                return event.preventDefault();
            }
    
            if(newValue < 0 || newValue > 255){
                newValue = 255;
                focusNextInputItem(event.target);
            } else if(newValue > 99){
                focusNextInputItem(event.target);
            }
        }

        values[index] = newValue;
        if(typeof onChange == "function"){
            onChange(values.join("."));
        }
    }

    function focusNextInputItem(element){
        let next = element.nextElementSibling;
        if(!next)
            return;

        if(next.nodeName != "INPUT"){
            focusNextInputItem(next);
        } else {
            next.focus();
        }
    }

    function focusPrevInputItem(element){
        let prev = element.previousElementSibling;
        if(!prev)
            return;

        if(prev.nodeName != "INPUT"){
            focusPrevInputItem(prev);
        } else {
            prev.focus();
        }
    }

    function handleKeyDown(event) {
        const {target, keyCode} = event;
        const {value, selectionStart} = target;
        /* 37 = ←, 39 = →, 8 = backspace */
 
        if(keyCode == 37){
            if(selectionStart == 0){
                focusPrevInputItem(target);
            }
        } else if(keyCode == 39){
            if(!value || selectionStart == value.length){
                focusNextInputItem(target);
            }
        } else if(keyCode == 8){
            if(!value || selectionStart == 0){
                focusPrevInputItem(target);
            }
        }
    }

    let clases = "ipInput";
    clases += error ? " ipInput_error": "";
    clases += className ? " " + className : "";

    return (
        <div className={clases}>
            {
                values.reduce((elems, value, index, array) => {

                    elems.push(
                        <input type="text" key={index} className="ipInput__item" maxLength="3"
                            value={value} 
                            onChange={event => changeHandler(event, values, index)}
                            onKeyDown={handleKeyDown}
                        />
                    );
            
                    if(index + 1 < array.length){
                        elems.push(
                            <i key={index + "i"} className="ipInput__dot">.</i>
                        );
                    }
            
                    return elems;
            
                }, [])
            }
        </div>
    );
}

IPInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
}

export default IPInput;