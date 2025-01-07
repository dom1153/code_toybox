import MyLayout from './MyLayout'
import Splash from './Splash'

function App() {
  return (
    <>
      {true && <MyLayout>{true && <p>Hey</p>}</MyLayout>}
      {false && <Splash />}
    </>
  )
}

export default App
