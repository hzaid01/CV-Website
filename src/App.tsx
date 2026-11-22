import { lazy, Suspense } from "react";

const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  return (
    <main className="main-body">
      <Suspense>
        <MainContainer />
      </Suspense>
    </main>
  );
};

export default App;
