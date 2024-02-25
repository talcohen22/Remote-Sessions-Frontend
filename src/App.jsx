import { CodeIndex } from "./views/CodeIndex"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { CodeDetails } from "./cmps/CodeDetails"
import { AppHeader } from "./cmps/AppHeader"
import { About } from "./cmps/About"

function App() {

  return (
    <div className="main-layout">
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<CodeIndex />} />
          <Route path='/code/:codeId' element={<CodeDetails />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
