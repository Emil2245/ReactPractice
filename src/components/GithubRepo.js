import React, { useState, useEffect } from "react";

const GithubRepo = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const checkRepo = async () => {
    const matches = url.match(/github\.com\/([^\/]+)\/([^\/]+)/i);
    if (matches && matches.length === 3) {
      const user = matches[1];
      const repo = matches[2];
      const response = await fetch(`https://api.github.com/repos/${user}/${repo}`);
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("fail");
      }
    } else {
      setStatus("invalid");
    }
  };

  useEffect(() => {
    if (url) {
      checkRepo();
    }
  }, [url]);

  return (
    <div>
      <form>
        <label>
          URL del repositorio de GitHub:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
      </form>
      {status === "success" && <img src="/assets/github-mark-green.svg" alt="Correcto" />}
      {status === "fail" && <img src="/assets/github-mark-red.svg" alt="Incorrecto" />}
      {status === "invalid" && <p>URL no válida</p>}
    </div>
  );
};

export default GithubRepo;
