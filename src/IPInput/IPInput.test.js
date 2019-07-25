import React from 'react';
import { shallow } from "enzyme";
import IPInput from "./IPInput";
import { parseIP } from "../utils/parseIP";

const defProps = {
    value: "",
    onChange: () => {}
}

const errorClass = "ipInput_error";

describe("IPInput", () => {
    
    it('renders without crashing', () => {
        shallow(<IPInput {...defProps} />);
    });

    it('renders 4 inputs and 3 dots inside with any input', () => {
        const IPs = [
            "10.0.75.1", "", "10.0.aaa.1", "10.0", 
            "10.11.0.0.1", "test"
        ];

        IPs.forEach(
            ip => {
                const wrapper = shallow(<IPInput {...defProps} value={ip} />);
                expect(wrapper.find("input[type='text']").length).toEqual(4);
                expect(wrapper.find("i").length).toEqual(3);
            }
        )
    });

    it('renders with correct values in internal inputs', () => {
        const IPs = [
            "10.0.75.1", "", "10.0.aaa.1", "10.0", 
            "10.11.0.0.1", "test"
        ];

        IPs.forEach(
            ip => {
                const wrapper = shallow(<IPInput {...defProps} value={ip} />);
                expect(
                    wrapper.find("input[type='text']").map(el => el.prop('value'))
                ).toEqual(parseIP(ip));
            }
        )
    });

    it('className property', () => {
        const className = "custom-class";
        const wrapper = shallow(<IPInput {...defProps} className={className} />);
        expect(wrapper.at(0).hasClass(className)).toEqual(true);
    });

    it('has error class if error property is true', () => {
        const wrapper = shallow(<IPInput {...defProps} error={true} />);
        expect(wrapper.at(0).hasClass(errorClass)).toEqual(true);
    });

    it('has error class if error property is non-empty string', () => {
        const wrapper = shallow(<IPInput {...defProps} error={"Error"} />);
        expect(wrapper.at(0).hasClass(errorClass)).toEqual(true);
    });

});