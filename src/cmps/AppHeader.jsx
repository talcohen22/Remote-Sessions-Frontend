import { Link } from "react-router-dom"

export function AppHeader() {
    return (
        <section className="app-header">
            <nav className="main-nav flex">
                <Link to="/">Lobby</Link>
                <Link to="/about">About</Link>
            </nav>
        </section>
    )
}