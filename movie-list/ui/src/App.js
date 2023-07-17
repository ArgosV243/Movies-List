import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const Movies = ({ movies, onDelete }) => {
  return movies.map((e, i) => {
    return (
      <li key={i}>
        {e.title}
        <button onClick={() => onDelete(i)}>Delete</button>
      </li>
    );
  });
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch the movies!');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
  }, [movies, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    const newMovie = { title: searchTerm };
    setUserMovies([...userMovies, newMovie]);
    setSearchTerm('');
  };

  const handleDeleteMovie = (index) => {
    const updatedUserMovies = [...userMovies];
    updatedUserMovies.splice(index, 1);
    setUserMovies(updatedUserMovies);
  };

  if (movies.length < 1) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <form onSubmit={handleAddMovie}>
            <input
              type="text"
              placeholder="Add a movie..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button type="submit">Add</button>
          </form>
          <p>Movies:</p>
          <ul>
            <Movies movies={filteredMovies} onDelete={handleDeleteMovie} />
          </ul>
        </header>
      </div>
    );
  }
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import React, {useState, useEffect} from 'react'


// const Movies = ({movies}) => {
//   return movies.map((e, i) => {
//     return <li key={i}>{e.title}
//     <button onClick={() => onDelete(i)}>Delete</button>
//     </li>
//   })
// }

// function App() {
//   const [movies, setMovies] = useState([])
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredMovies, setFilteredMovies] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/movies')
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch the movies!');
//         }
//         return res.json();
//       })
//       .then(data => {
//         console.log(data);
//         setMovies(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     const filteredMovies = movies.filter((movie) =>
//       movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredMovies(filteredMovies);
//   }, [movies, searchTerm]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleAddMovie = (e) => {
//     e.preventDefault();
//     const newMovie = { title: searchTerm };
//     setUserMovies([...userMovies, newMovie]);
//     setSearchTerm('');
//   };

//   const handleDeleteMovie = (index) => {
//     const updatedUserMovies = [...userMovies];
//     updatedUserMovies.splice(index, 1);
//     setUserMovies(updatedUserMovies);
//   };

//   if(movies.length < 1){
//     return <p>loading....</p>
//   }else{

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//           <p>Movies:</p>
//           <input
//               type="text"
//               placeholder="Search movies..."
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           <ul>
//             <Movies movies={filteredMovies} onDelete={handleDeleteMovie} />
//           </ul>
//           <form onSubmit={handleAddMovie}>
//             <input
//               type="text"
//               placeholder="Add a movie..."
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <button type="submit">Add</button>
//           </form>
//       </header>
//     </div>
//   );
//   }
// }

// export default App;
