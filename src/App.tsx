import { useState } from 'react';

import Canvas from './components/canvas/Canvas';
import Panel from './components/panel/Panel';
import Burger from './components/burger/Burger';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Burger isActive={isOpen} setIsOpen={setIsOpen} />
      <Canvas />
      <Panel isOpen={isOpen} />
    </>
  );
}
export default App;
