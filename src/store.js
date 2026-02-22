import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  characters: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character')

  if (!response.ok) {
    throw new Error('Не удалось загрузить персонажей')
  }

  const data = await response.json()
  return data.results
})

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.characters = action.payload
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Произошла ошибка'
      })
  },
})

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
  },
})

