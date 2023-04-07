import './App.css';
import Header from '@/components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/home';

function App() {
  return (
    <div className="App">
      <Header />
      <Home></Home>
      <Footer />
    </div>
  )
}

export default App;