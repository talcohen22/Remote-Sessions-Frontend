import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { codeService } from "../services/code.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client'
import { CodeEditor } from "./CodeEditor";

const baseUrl = (process.env.NODE_ENV === 'production') ? '//remote-sessions-1vt0.onrender.com' : '//localhost:3030'
const socket = io.connect(baseUrl)



export function CodeDetails() {

    const { codeId } = useParams()
    const [code, setCode] = useState('')
    const [firstClientConnected, setFirstClientConnected] = useState('')
    const [isShowMessage, seIsShowMessage] = useState(false)
    const timeoutId = useRef()
    const navigate = useNavigate()


    useEffect(() => {
        socket.on('code updated', (code) => { //listening to a 'code update' event when this cmp goes up
            setCode(code)
        })

        socket.emit('client connected') //emit to the backend that a client connected
        socket.on('set first client', firstClientConnected => { //get the first client connected from the backend
            setFirstClientConnected(firstClientConnected)
        })

        loadCode()
    }, [codeId])

    async function loadCode() { //find the relevant code from db
        try {
            const code = await codeService.getById(codeId)
            setCode(code)
        } catch (err) {
            console.log('Cannot load code', err);
        }
    }

    async function onHandleChange(value) {
        try {
            if (firstClientConnected === socket.id) { //the first client connected (the teacher) cannot to edit the code- a message will show
                seIsShowMessage(true)
                clearTimeout(timeoutId.current)
                timeoutId.current = setTimeout(() => { //the message present for 3 seconds from the moment he started to type
                    seIsShowMessage(false)
                }, 3000);
            }
            else { //update the code state and the db
                const newCode = { ...code, content: value }
                const updateCode = await codeService.edit(newCode)
                setCode(updateCode)

                socket.emit('code changed', updateCode) //emit to the backend that the event 'code changed' happened
            }
        } catch (err) {
            console.log('Cannot update code', err);
        }
    }

    function getLobbyPage() { //When the user click on the back button, he will redirected to the lobby page
        navigate('/')
    }

    return (
        <section className="code-details">

            <div className="code-details-header flex">
                <button className="back-btn" onClick={getLobbyPage} title="back">
                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                </button>
                <h1>Code block page: {code.title}</h1> {/*add the code title*/}
            </div>

            <p className="error-message">{isShowMessage ? `You are in read mode, your changes will not be saved` : ''}</p>

            {code.content && code.solution &&
                code.content.replace(/\s/g, '') === code.solution.replace(/\s/g, '') &&
                <p className="solution">🤩💪</p>}

            <CodeEditor code={code} onHandleChange={onHandleChange} />

        </section>
    )
}

