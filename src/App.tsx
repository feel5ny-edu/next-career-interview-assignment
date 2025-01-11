import { Route, Routes } from 'react-router-dom';
import { MovieMain } from './page/main';
import { MovieDetail } from './page/detail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieMain />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
