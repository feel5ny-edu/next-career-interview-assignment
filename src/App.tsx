import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieMain } from './page/Main';
import { MovieDetail } from './page/detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieMain />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
