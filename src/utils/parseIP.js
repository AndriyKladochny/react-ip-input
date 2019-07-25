export function parseIP(ip = "..."){
    let values = ip.split(".");
    values.length = 4;
    for(let i = 0; i < 4; i++){
        if(values[i] !== ""){
            let val = +values[i];
        
            if(isNaN(val)) {
                values[i] = ""
            } else {
                if(val < 0) {
                    values[i] = "0";
                } else if(val > 255) {
                    values[i] = "255";
                }
            }
        }
    }
    return values;
}