import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios({
          url: 'https://graphql.anilist.co',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            query: `
              query {
                Page(page: 1, perPage: 10) {
                  media(type: ANIME) {
                    id
                    title {
                      romaji
                    }
                    coverImage {
                      large
                    }
                  }
                }
              }
            `,
          },
        });
        setAnimes(response.data.data.Page.media);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Animes</h1>
      <div className="anime-list">
        {animes.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img src={anime.coverImage.large} alt={anime.title.romaji} />
            <h2>{anime.title.romaji}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
