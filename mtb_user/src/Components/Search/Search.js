import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css';

const SearchComponent = () => {
  const navi = useNavigate();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const fetchdata = (v) => {
    fetch("http://localhost:8000/movie/movies", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) => {
        const result = res.data.filter((m) => {
          return v && m && m.title && m.title.toLowerCase().includes(v);
        })
        setResults(result);
      });
  }

  const handleInputChange = (v) => {
    setInput(v);
    fetchdata(v);
  };

  const handleSubmit = (v) => {
    navi(`/user/moviedetail/${v}`);
    setInput('');
    setResults([]);
  };

  return (
    <>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="🔍 Search for Movies, Events, Plays, Sports and Activities"
          value={input}
          onChange={(e) => {
            { handleInputChange(e.target.value) }
          }}
        />
      </form>
      <div className="results-list">
        {
          results.map((r, id) => {
            return (
              <>
                <div className="s_result" onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(r._id);
                }} key={id}>{r.title}
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default SearchComponent;