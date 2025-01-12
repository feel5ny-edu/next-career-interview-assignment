import { Route, Routes } from 'react-router-dom';
import { MovieMain } from './movie-main/page';
import { MovieDetail } from './movie-detail/page';

function App() {
  return (
    <main className="flex justify-center">
      <div className="w-[960px]">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<MovieMain />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
