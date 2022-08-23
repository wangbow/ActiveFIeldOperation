import logo from './logo.svg';
import {Table} from '@b-design/ui'
import Env from './Env';

import FieldEnv from './FieldEnv';
import './App.css';
import '@b-design/ui/dist/index.css';


function App() {
  return (
    <div className="App">
      {/* <Env /> */}
      <FieldEnv />
    </div>
  );
}

export default App;
