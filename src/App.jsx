import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppShell from "./AppShell";
import { StoreProvider } from 'Shell/store'
import './App.scss';

const App = () => {
  return (
    <StoreProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter basename="/mf-shell">
          <AppShell />
        </BrowserRouter>
      </Suspense>
    </StoreProvider>
  );
};

export default App;
