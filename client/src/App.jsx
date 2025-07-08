// src/App.jsx
import Home from './pages/Home';

function App() {
  return (
    <div className="bg-lightGrayishCyan min-h-screen font-spartan">
      <header className="bg-desaturatedDarkCyan h-40 bg-[url('/images/bg-header-desktop.svg')] bg-no-repeat bg-cover md:h-44" />
      <main className="relative -mt-8 px-4 max-w-6xl mx-auto">
        <Home />
      </main>
    </div>
  );
}
export default App;
