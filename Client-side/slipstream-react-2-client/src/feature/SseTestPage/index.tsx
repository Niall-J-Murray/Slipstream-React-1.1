import {useEffect, useState} from "react";

export default function SseTestPage() {
    const [listening, setListening] = useState(false);
    const [data, setData] = useState([]);
    let eventSource = undefined;

    useEffect(() => {
        if (!listening) {
            // eventSource = new EventSource("http://localhost:8080/api/sse/time");
            eventSource = new EventSource("http://localhost:8080/api/sse/pick-made-test");

            eventSource.onopen = (event) => {
                console.log("connection opened")
            }

            eventSource.onmessage = (event) => {
                console.log("result", event.data);
                setData(old => [...old, event.data])
            }

            eventSource.onerror = (event) => {
                console.log(event.target.readyState)
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log('eventsource closed (' + event.target.readyState + ')')
                }
                eventSource.close();
            }

            setListening(true);
        }

        return () => {
            eventSource.close();
            console.log("eventsource closed")
        }

    }, [])

    return (
        <div className="App">
            <header className="App-header">
                Received Data
                {data.map(d =>
                    <div key={d}>{d}</div>
                )}
            </header>
        </div>
    );
}
