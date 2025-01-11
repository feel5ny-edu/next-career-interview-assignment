import { Route, Routes } from 'react-router-dom';
import { MovieMain } from './movie-main/page';
import { MovieDetail } from './movie-detail/page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieMain />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
