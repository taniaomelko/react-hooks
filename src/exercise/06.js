// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon';
import { ErrorBoundary } from 'react-error-boundary';

// // ------------------------ 6.1 -----------------------
// function PokemonInfo({pokemonName}) {
//   const [pokemon, setPokemon] = React.useState(null);
//   const [error, setError] = React.useState(false);

//   React.useEffect(() => {
//     setPokemon(null);
    
//     if (pokemonName) {
//       fetchPokemon(pokemonName)
//       .then(
//         pokemonData => {
//           setPokemon(pokemonData);
//         },
//       )
//       .catch(error => setError(error));
//     } 
//   }, [pokemonName]);
  

//   if (error) {
//     return (
//       <div role="alert">
//         There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   }

//   if (!pokemonName) {
//     return 'Submit a pokemon';
//   }
//   if (pokemonName && !pokemon) {
//     return <PokemonInfoFallback name={pokemonName} />;
//   }
//   if (pokemon) {
//     return <PokemonDataView pokemon={pokemon} />;
//   }
// }
// // ----------------------- 6.1 -----------------------

// // ----------------------- 6.2 -----------------------
// function PokemonInfo({pokemonName}) {
//   const [status, setStatus] = React.useState('idle');
//   const [pokemon, setPokemon] = React.useState(null);
//   const [error, setError] = React.useState(false);

//   React.useEffect(() => {
//     if (pokemonName) {
//       setStatus('pending');
//       fetchPokemon(pokemonName)
//       .then(
//         pokemonData => {
//           setPokemon(pokemonData);
//           setStatus('resolved');
//         },
//       )
//       .catch(error => {
//         setError(error);
//         setStatus('rejected');
//       });
//     } 
//   }, [pokemonName]);
  
//   if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   }

//   if (status === 'idle') {
  //     return 'Submit a pokemon';
  //   } else if (status === 'pending') {
    //     return <PokemonInfoFallback name={pokemonName} />;
    //   } else if (status === 'resolved') {
      //     return <PokemonDataView pokemon={pokemon} />;
      //   }
// }
// // ----------------------- 6.2 -----------------------

// // ----------------------- 6.3 -----------------------
// function PokemonInfo({pokemonName}) {
//   const [pokemonState, setPokemonState] = React.useState({ status: 'idle', pokemon: null, error: false });
  
//   React.useEffect(() => {
//     if (pokemonName) {
//       setPokemonState(prevState => ({...prevState, status: 'pending', pokemon: null}));
//       fetchPokemon(pokemonName)
//         .then(
//           pokemonData => {
//             setPokemonState(prevState => ({...prevState, status: 'resolved', pokemon: pokemonData}));
//           },
//         )
//         .catch(error => {
//           setPokemonState(prevState => ({...prevState, status: 'rejected', error: error}));
//         });
//     } 
//   }, [pokemonName]);

//   const { status, pokemon, error } = pokemonState;
  
//   if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   }

//   if (status === 'idle') {
//     return 'Submit a pokemon';
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />;
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />;
//   }
// }
// // ----------------------- 6.3 -----------------------

// ----------------------- 6.6 -----------------------
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function PokemonInfo({pokemonName}) {
  const [pokemonState, setPokemonState] = React.useState({ status: 'idle', pokemon: null, error: null });

  React.useEffect(() => {
    if (pokemonName) {
      setPokemonState(prevState => ({...prevState, status: 'pending', pokemon: null}));
      fetchPokemon(pokemonName)
        .then(
          pokemonData => {
            setPokemonState(prevState => ({...prevState, status: 'resolved', pokemon: pokemonData}));
          },
        )
        .catch(error => {
          setPokemonState(prevState => ({...prevState, status: 'rejected', error: error}));
        });
    } 
  }, [pokemonName]);

  const { status, pokemon, error } = pokemonState;
  
  if (status === 'idle') {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  } else if (status === 'rejected') {
    throw error
  }
}
// ----------------------- 6.6 -----------------------

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* <PokemonInfo pokemonName={pokemonName} /> */}

        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setPokemonName('')} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
