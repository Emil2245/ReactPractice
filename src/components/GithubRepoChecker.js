// import React from 'react';

// class GithubRepoChecker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       repoExists: null,
//       repoLink: '',
//     };
//   }

//   checkRepoExistence = () => {
//     const { repoLink } = this.state;
//     const regex = new RegExp('https://github.com/(.*)/(.*)');
//     const matches = regex.exec(repoLink);
//     if (matches && matches.length >= 3) {
//       const username = matches[1];
//       const repoName = matches[2];
//       fetch(`https://api.github.com/repos/${username}/${repoName}`)
//         .then((response) => {
//           if (response.status === 200) {
//             this.setState({ repoExists: true });
//           } else {
//             this.setState({ repoExists: false });
//           }
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   handleInputChange = (event) => {
//     this.setState({
//       repoLink: event.target.value,
//       repoExists: null,
//     });
//   };

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     this.checkRepoExistence();
//   };

//   render() {
//     const { repoExists, repoLink } = this.state;
//     return (
//       <div>
//         <form onSubmit={this.handleFormSubmit}>
//           <label htmlFor="repoLink">Enter Github Repository Link:</label>
//           <input
//             type="text"
//             id="repoLink"
//             name="repoLink"
//             value={repoLink}
//             onChange={this.handleInputChange}
//             required
//           />
//           <button type="submit">Check Repository</button>
//         </form>
//         {repoExists === true && <p>The repository exists!</p>}
//         {repoExists === false && <p>The repository does not exist!</p>}
//         {repoExists === null && <p>Enter a Github repository link and click "Check Repository" to verify its existence.</p>}
//       </div>
//     );
//   }
// }

// export default GithubRepoChecker;

// import React, { useState, useEffect } from "react";

// function GithubRepoChecker() {
//   const [repoUrl, setRepoUrl] = useState(""); // Inicializa el estado del valor del input en una cadena vacía

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (repoUrl) {
//         checkRepoExistence();
//       }
//     }, 1000); // Define un temporizador de 1 segundo para verificar el link después de que el usuario deja de escribirlo

//     return () => clearTimeout(timer); // Cancela el temporizador cuando el componente se desmonta o el estado del valor del input cambia
//   }, [repoUrl]);

//   const checkRepoExistence = () => {
//     const regex = /https:\/\/github\.com\/(.*)\/(.*)/;
//     const match = repoUrl.match(regex); // Obtiene la coincidencia con la expresión regular a partir del estado del valor del input
//     if (match) {
//       const apiUrl = `https://api.github.com/repos/${match[1]}/${match[2]}`;
//       fetch(apiUrl)
//         .then((response) => {
//           if (response.ok) {
//             alert("El repositorio existe");
//           } else {
//             alert("El repositorio no existe");
//           }
//         })
//         .catch(() => {
//           alert("Error al conectar con la API de Github");
//         });
//     } else {
//       alert("Por favor, introduce una URL válida de un repositorio de Github");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={repoUrl}
//         onChange={(event) => setRepoUrl(event.target.value)} // Actualiza el estado del valor del input cada vez que el usuario escribe algo en el input
//       />
//     </div>
//   );
// }

// export default GithubRepoChecker;
//todo fix
import React, { useState, useEffect } from "react";

function GithubRepoChecker() {
  const [repoUrl, setRepoUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkRepoExistence();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [repoUrl]);

  const checkRepoExistence = () => {
    const regex = /https:\/\/github\.com\/(.*)\/(.*)/;
    const match = repoUrl.match(regex);
    if (match) {
      const apiUrl = `https://api.github.com/search/users?q=${match[1]}+in:user+${match[2]}+in:repo`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.total_count === 1) {
            setImgUrl("/assets/github-mark-green.svg");
          } else {
            setImgUrl("/assets/github-mark-red.svg");
          }
        })
        .catch(() => {
          setImgUrl("/assets/x-red.svg");
        });
    } else {
      setImgUrl("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={repoUrl}
        onChange={(event) => setRepoUrl(event.target.value)}
      />
      {imgUrl ? (
        <img src={imgUrl} alt="Resultado" width="150" height="150" />
      ) : null}
    </div>
  );
}

export default GithubRepoChecker;
