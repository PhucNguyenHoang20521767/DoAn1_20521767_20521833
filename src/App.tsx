import './App.css';
import Header from '@/components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/home';
import SignIn from './pages/SignIn/signin';

function App() {
  return (
    <div className="App">
      <Header />
      <SignIn/>
      <Footer />
    </div>
  )
}

export default App;