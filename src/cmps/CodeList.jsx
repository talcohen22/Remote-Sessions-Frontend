import { CodePreview } from "./CodePreview";
import { useNavigate } from "react-router-dom";


export function CodeList({ codes }) {

    const navigate = useNavigate()

    function onGetCode(code) { //When the user choose a code, he will redirected to the page of the relevant code
        navigate(`/code/${code._id}`) 
    }

    return (
        <section className="code-list">
            <h1 className="page-title">Choose code block</h1>
            {codes.map(code => (
                <li key={code._id} onClick={() => onGetCode(code)}>
                    <CodePreview code={code} />
                </li>
            ))}
        </section>
    )
}