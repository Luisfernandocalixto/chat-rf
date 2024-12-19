import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ChatRoom from "../src/components/ChatRoom";
function App() {
  return (
    <div className="App">
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography type="title" color='inherit'></Typography>
        </Toolbar>
      </AppBar>
      <ChatRoom/>
    </div >
  );
}

export default App;
