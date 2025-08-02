
import { BrowserRouter } from "react-router-dom"
import JobBoardAuth from "./Authentication/JobBoardAuth"
import Layout from "./ROUTING/Layout"
function App() {

  return (
    <>   
      <BrowserRouter>
      <Layout></Layout>
      </BrowserRouter>
    </>
  )
}

export default App
