import { useRef } from 'react';
import './App.css';
import Canvas from './components/canvas/Canvas';
import Panel from './components/panel/Panel';


function App() {

  const stageRef = useRef(null);
  
  return (
    <>
      <Canvas stageRef={stageRef} />
      <Panel />
    </>
  );
}
export default App;
