import { parseIP } from "../parseIP";

describe("Utils", () => {
    describe("parseIP", () => {

        it('should return correct array with correct IP', () => {
            const IPs = ["10.0.75.1", "192.0.0.1", "0.0.0.0", "255.255.255.255"];

            IPs.forEach(
                ip => 
                expect(parseIP(ip)).toEqual(ip.split("."))
            );
        });

        it('should execute correctly without args', () => {
            expect(parseIP()).toEqual(["","","",""])
        });

        it('should execute correctly with empty string instead of argument', () => {
            expect(parseIP("")).toEqual(["","","",""])
        });

        it('should replace not a numbers with empty strings', () => {
            const testArr = [
                {value: "10.aaa.75.1", expected: ["10","","75","1"]}, 
                {value: "aaa", expected: ["","","",""]},
                {value: "aaa.bbb.cc.d", expected: ["","","",""]},
            ];

            testArr.forEach(
                ({value, expected}) => 
                expect(parseIP(value)).toEqual(expected)
            );
            
        });

        it('should replace numbers > 255 with 255', () => {
            const testArr = [
                {value: "10.0.256.255", expected: ["10","0","255","255"]}, 
                {value: "999.999.999.999", expected: ["255","255","255","255"]}
            ];

            testArr.forEach(
                ({value, expected}) => 
                expect(parseIP(value)).toEqual(expected)
            );
            
        });

        it('should replace numbers < 0 with 0', () => {
            const testArr = [
                {value: "10.0.-256.-1", expected: ["10","0","0","0"]}, 
                {value: "-999.-255.199.99", expected: ["0","0","199","99"]}
            ];

            testArr.forEach(
                ({value, expected}) => 
                expect(parseIP(value)).toEqual(expected)
            );
            
        });

        it('should cut IP with excess octets', () => {
            expect(parseIP("10.0.256.255.11")).toEqual(["10","0","255","255"])
        });

    });
});