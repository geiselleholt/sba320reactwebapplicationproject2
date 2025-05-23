import { useState } from "react";
import "./App.css";

function App() {

  return <>
        <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Game" element={<ParkPage />} />
        <Route path="/Rules" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </>;
}

export default App;
