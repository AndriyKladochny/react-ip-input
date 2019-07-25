import React, {useState} from "react";
import IPInput from "../../src";
import "./scss/index.scss";

const App = () => {

    const [ip1, setIp1] = useState("");
    const [ip2, setIp2] = useState("127.0.0.1");
    const [ip3, setIp3] = useState("aaa.999.0.1");

    return (
        <article className="example">
            <h1>React IP Input</h1>
            <section>
                <h2>With empty string value by default</h2>
                <IPInput value={ip1} onChange={setIp1} />
                <div className="example__IPval">IP: {ip1}</div>
            </section>
            <section>
                <h2>With valid IP by default</h2>
                <IPInput value={ip2} onChange={setIp2} />
                <div className="example__IPval">IP: {ip2}</div>
            </section>
            <section>
                <h2>With invalid IP by default</h2>
                <IPInput value={ip3} onChange={setIp3} />
                <div className="example__IPval">IP: {ip3}</div>
            </section>
        </article>
    );
}
    

export default App;