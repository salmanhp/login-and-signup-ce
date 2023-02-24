import { Container } from "@mui/material"
import Login from './components/Login'
import { Router } from "react-chrome-extension-router";

function App() {

  return (
    <div>
      <Container>
        <Router>
          <Login />
        </Router>
      </Container>
    </div>
  )
}

export default App