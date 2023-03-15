import './App.css';
import Greet from './components/Greet'
import GithubRepo from "./components/GithubRepo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Greet/>  
        <GithubRepo/>
      </header>
    </div>
  );
}

export default App;
