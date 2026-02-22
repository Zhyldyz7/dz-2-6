import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchCharacters } from './store'

function App() {
  const dispatch = useDispatch()
  const { characters, status, error } = useSelector((state) => state.characters)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <div className="status">Загрузка персонажей...</div>
  }

  if (status === 'failed') {
    return (
      <div className="status status-error">
        Ошибка при загрузке персонажей: {error}
      </div>
    )
  }

  return (
    <div className="app">
      <h1 className="title">Персонажи Rick and Morty</h1>

      <div className="characters-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <h2 className="character-name">{character.name}</h2>
            <p className="character-field">
              <span className="field-label">Гендер:</span> {character.gender}
            </p>
            <p className="character-field">
              <span className="field-label">Вид / тип:</span>{' '}
              {character.type || character.species}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
