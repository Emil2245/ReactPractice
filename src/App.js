import './App.css';
import Greet from './components/Greet'
import GithubRepoChecker from './components/GithubRepoChecker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <GithubRepoChecker/>
        <p>Hello world.</p>
        <Greet/>
      </header>
    </div>
  );
}

export default App;
