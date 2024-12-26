import { useState } from "react";

// Modelo base para un Pokémon
const pokemonTemplate = {
  id: "",
  name: "",
  abilities: [],
  img: "",
};


export function SearchPokemon() {
  // Estados del componente
  const [inputNamePokemon, setInputNamePokemon] = useState(""); // Almacena el nombre del Pokémon ingresado
  const [data, setData] = useState(null); // Almacena los datos del Pokémon
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Almacena errores

  // Maneja cambios en el campo de texto
  const handleInputChange = (event) => {
    setInputNamePokemon(event.target.value);
  };

  // Simula un retraso
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Maneja la búsqueda del Pokémon
  const handleSearchClick = async () => {
    console.log("Buscando Pokémon:", inputNamePokemon);
    setLoading(true);
    setError(null);

    try {
      await delay(2000); // Simula un retraso de 2 segundos

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputNamePokemon.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Error en la solicitud");

      const result = await response.json();
      console.log("img:", result.sprites.back_default);
      console.log("Datos obtenidos:", result);

      // Actualiza los datos con la respuesta de la API
      const updatedPokemon = {
        ...pokemonTemplate,
        id: result.id,
        name: result.name,
        abilities: result.abilities,
        img: result.sprites.front_default,
      };
      setData(updatedPokemon);
    } catch (err) {
      console.error("Error al consumir la API:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Renderiza el estado de carga
  if (loading) {
    return <p className="text-center">Cargando datos...</p>;
  }

  return (
    <>
      {/* Formulario de búsqueda */}
      <div className="d-flex align-items-center py-3">
        <form className="mx-auto p-4 row g-3">
          <div className="col-auto">
            <input
              type="text"
              value={inputNamePokemon}
              onChange={handleInputChange}
              className="form-control"
              id="namePokemon"
              placeholder="example: ditto"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={handleSearchClick} // Referencia directa a la función
              type="button"
              className="btn btn-success mb-3"
              disabled={loading}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Resultado de la búsqueda */}
      <div className="py-4 d-flex justify-content-center">
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {data && (
          <div className="text-center">
            <h3>{data.name}</h3>
            <p>ID: {data.id}</p>
            <ul>
              <strong>Habilidades:</strong>
              {data.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
            <img style={{ border: "2px solid black" }} src={data.img} alt={data.name} />
          </div>
        )}
      </div>
    </>
  );
}
