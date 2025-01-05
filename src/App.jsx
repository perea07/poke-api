import { SearchPokemon } from './components/SearchPokemon.jsx'

export function App() {

  return (
    <>
      <div className='container-fluid'>
      <h1 className='text-center py-4'>Welcome PokéAPI</h1>
      <SearchPokemon />
      </div>
    </>
  )
}