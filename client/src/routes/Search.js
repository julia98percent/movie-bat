import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { BoldTitle, SearchMoviePoster } from "../styles/theme";
import Nav from "../components/Navigation";
function Search() {
  let params = useParams();
  const searchKeyword = params.keyword;
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getSearch = async () => {
      const response = await axios
        .get(
          process.env.REACT_APP_DB_HOST +
            `http://ec2-3-36-74-205.ap-northeast-2.compute.amazonaws.com:5000/search/movies/title/${searchKeyword}`,
          {},
          { "Access-Control-Allow-Origin": "*", withCredentials: false }
        )
        .then((res) => res.data);

      setResult(response);
    };
    getSearch();
  }, []);

  return (
    <>
      <Nav />
      <BoldTitle>{searchKeyword} 검색 결과</BoldTitle>
      {Object.values(result).map((item) => (
        <>
          {
            <div style={{ display: "inline-block" }}>
              <Link to={`/movies/detail/${item["movie_idx"]}`}>
                <SearchMoviePoster src={item["movie_posterUrl"]} />
                <p>{item["movie_title"]}</p>
              </Link>
            </div>
          }
        </>
      ))}
    </>
  );
}
export default Search;
