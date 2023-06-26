import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../Redux/actions_creators/index";
import useLocalStorage from "../LocalStorage/useLocalStorage";
import style from "./Games.module.css";
import promotionalBanner from "../../Photos/PromotionalBanner.png";
import Filter from "../Filter/Filter";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SortGames from "../sortGames/sortGames";

const Games = () => {
  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.allGames);

  const [currentPage, SetCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  /*   const [currentGames, setCurrentGames] = useLocalStorage("currentGames", []); */

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = allGames.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className={style.gamesBanner}>
        <img src={promotionalBanner} alt="Banner" />
      </div>
      <div className={style.gamesMain}>
        <div className={style.titleMain}>
          <h1>Board Games</h1>
          <h3>Choose your favorite game</h3>
        </div>
        {
          <SortGames
            className={style.sortSelect}
            SetCurrentPage={SetCurrentPage}
          />
        }
        <div className={style.filtersMain}>
          <div className={style.filters}>
            <Filter
              type={"categories"}
              nameType={"category_name"}
              SetCurrentPage={SetCurrentPage}
              allGames={allGames}
            />
            <Filter
              type={"mechanics"}
              nameType={"mechanic_name"}
              SetCurrentPage={SetCurrentPage}
              allGames={allGames}
            />
            <Filter
              type={"thematics"}
              nameType={"thematic_name"}
              SetCurrentPage={SetCurrentPage}
              allGames={allGames}
            />
          </div>
        </div>
      </div>
      <div className={style.gamePagination}>
        <Pagination
          totalPosts={allGames.length}
          setCurrentPage={SetCurrentPage}
          postPerPage={postPerPage}
          currentPage={currentPage}
        />
        <div className={style.gamesContainer}>
          {currentPosts &&
            currentPosts.map((game) => {
              return (
                <Card
                  name={game.name}
                  image={game.image}
                  price={game.price}
                  key={game.game_id}
                  id={game.game_id}
                />
              );
            })}
        </div>
        <Pagination
          totalPosts={allGames.length}
          setCurrentPage={SetCurrentPage}
          postPerPage={postPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Games;
