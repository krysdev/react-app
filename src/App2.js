import React, {useState, useEffect, useRef} from 'react';

function App() {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
      setToggle(!toggle);
    };
  
    return <Toggler toggle={toggle} onToggle={handleToggle} />;
};

const Toggler = ({ toggle, onToggle }) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      console.log('I run only if toggle changes.');
    } else {
      didMount.current = true;
    }
  }, [toggle]);

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
}

export default App