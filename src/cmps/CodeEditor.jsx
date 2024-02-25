import AceEditor from "react-ace";

export function CodeEditor({ code, onHandleChange }) {

    return (
        <section className='code-editor'>
            <AceEditor
                mode="java"
                theme="github"
                value={code.content}
                onChange={onHandleChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style={{
                    backgroundColor: "#1b1b1b",
                    width: '70vw',
                    maxWidth: '800px',
                    height: '60vh',
                }}
            />
        </section>
    )
}