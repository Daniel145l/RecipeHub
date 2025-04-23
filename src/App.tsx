import { Route, Routes } from "react-router-dom"
import { Favorites } from "./pages/Favorites"
import { Home } from "./pages/Home"
import RecipeDetails from "./pages/RecipeDetails"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
    </Routes>
  )
}

export default App
