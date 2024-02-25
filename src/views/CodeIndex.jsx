import { useEffect, useState } from "react"
import { CodeList } from "../cmps/CodeList"
import { codeService } from "../services/code.service"

export function CodeIndex() {

    const [codes, setCodes] = useState([])

    useEffect(() => {
        loadCodes() //get all the codes from db when this cmp first render
    }, [])

    async function loadCodes() {
        try {
            const codes = await codeService.query()
            setCodes(codes)
        } catch (err) {
            console.log('Cannot load codes', err);
        }
    }

    return (
        <section className="code-index">
            <CodeList codes={codes} />
        </section>
    )
}