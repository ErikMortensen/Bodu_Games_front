import { createElement, useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import style from "../CardDetail/CardDetail.module.css";
import heart from "../../Photos/heart.svg";
import darkHeart from "../../Photos/darkHeart.svg";
import shoppingCart from "../../Photos/plusCart.svg";
import darkShoppingCart from "../../Photos/darkPlusCart.svg";
import star from "../../Photos/star.png";
import MoreDetail from "../MoreDetail/MoreDetail";
import useLocalStorage from "../LocalStorage/useLocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/authContext";
import DetailGameCarousel from "../DetailGameCarousel/DetailGameCarousel";
import { Modal } from "antd";
import FormReview from "../FormReview/FormReview";
import Reviews from "../Reviews/Reviews";

const VITE_URL_ALL_GAMES = import.meta.env.VITE_URL_ALL_GAMES;

const CardDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", []);
  const { userAuth, role } = useAuth();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode);
  const [modalReview, setModalReview] = useState(false);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(
          `https://backprojectboardgames-production.up.railway.app/games/id/${id}`
        );
        setGame(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameDetail();
  }, [id]);

  const handleCart = () => {
    let duplicate = cart?.find((g) => g.game_id === game.game_id);

    if (duplicate) {
      for (let index = 0; index < cart.length; index++) {
        let g = cart[index];
        if (g.game_id === game.game_id) {
          // if (g.game.on_sale === true) {
          //   g.game.price = g.game.price * 0.8;
          // }
          if (g.count < g.stock) {
            g.count = g.count + 1;
            g.total_price = g.count * g.price;
            setCart([...cart]);
            toast.success(`${game.name} added to cart`);
          } else if (g.count >= g.stock) {
            toast.error(`${game.name} exceeds stock`);
          }
        }
      }
    } else {
      // if (game.on_sale === true) {
      //   game.price = game.price * 0.8;
      // }
      game.count = +1;
      game.total_price = game.price;
      setCart([...cart, game]);
      toast.success(`${game.name} added to cart`);
    }
  };

  const handleModal = () => {
    setModalReview(modalReview === true ? false : true);
  };

  const handleSubmitReview = () => {
    console.log("hola");

    setModalReview(modalReview === true ? false : true);
  };
  return loading ? (
    <h1>Cargando...</h1>
  ) : (
    <div>
      <div className={style.firstFlexCd}>
        <div className={style.imgCardDetail}>
          <DetailGameCarousel game={game} />
        </div>
        <div className={style.gameDetail}>
          <div
            className={
              darkMode === true
                ? style.darkInfoCardDetail
                : style.inforCardDetail
            }
          >
            <div
              className={
                darkMode === true ? style.darkTitleGame : style.titleGame
              }
            >
              <h1 className={style.nameGame}>{game.name}</h1>
              {game.stock === 0 ? (
                <h3 className={style.unavailableCd}>unavailable</h3>
              ) : (
                <h3 className={style.availableCd}>available</h3>
              )}
            </div>
            <div className={style.ratingCd}>
              <span>
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
              </span>
            </div>
            <div
              className={darkMode === true ? style.darkPrices : style.prices}
            >
              <h2 className={game.on_sale ? style.gameSale : style.priceGame}>
                ${game.price} USD
              </h2>
              {game.on_sale === true ? (
                <h2>${(game.price * 0.8).toFixed(2)} USD</h2>
              ) : null}
            </div>
            <div className={style.butonShop}>
              <button
                className={
                  darkMode === true ? style.darkCartBtn : style.cartBtn
                }
                onClick={handleCart}
              >
                add to cart
                <span>
                  <img
                    src={darkMode === true ? darkShoppingCart : shoppingCart}
                    alt="cart"
                  />
                </span>
              </button>
              <button className={style.heartBtn}>
                <img
                  className={style.heartImg}
                  src={darkMode === true ? darkHeart : heart}
                  alt="heart"
                />
              </button>
              <div className={style.backGames}>
                <button
                  className={
                    darkMode === true
                      ? style.darkContinueShop
                      : style.continueShop
                  }
                  onClick={() => navigate("/games")}
                >
                  continue shopping
                </button>
              </div>
            </div>
            <div className={style.cardDescription}>
              <p>{game.Mechanics.description}</p>
            </div>
            <div className={style.characteristics}>
              <div
                className={
                  darkMode === true ? style.darkCategoryCd : style.categoryCd
                }
              >
                <h2>category</h2>
                {game &&
                  game.Categories.map((category, index) => {
                    return (
                      <h3 className={style.categoryNameDetail} key={index}>
                        {category.category_name}
                      </h3>
                    );
                  })}
              </div>
              <hr />
              <div
                className={
                  darkMode === true ? style.darkPlayersCd : style.playersCd
                }
              >
                <h2>number of players</h2>
                <h3>
                  {game.players_min} <span>-</span> {game.players_max}
                </h3>
              </div>
              <hr />
              <div
                className={darkMode === true ? style.darkTimeCd : style.timeCd}
              >
                <h2>time to play</h2>
                <h3>{game.playing_time} min per player</h3>
              </div>
            </div>
          </div>
          <MoreDetail game={game} />
        </div>
      </div>
      <div className={style.reviewCardDetail}>
        <h2>Review</h2>
        {userAuth ? (
          <button id="modalReview" onClick={handleModal}>
            leave a review
          </button>
        ) : (
          <span>
            Only registered users can write comments. Please{" "}
            <NavLink to={"/login"}>login</NavLink> or{" "}
            <NavLink to={"/signup"}>create an account</NavLink>
          </span>
        )}
      </div>
      <div>{userAuth && <Reviews gameId={game.game_id} />}</div>
      <Modal
        open={modalReview}
        onCancel={handleModal}
        onOk={handleSubmitReview}
        footer={""}
        title="Leave a Review"
      >
       {/* <FormReview gameId={game.game_id} /> */}
      </Modal>
    </div>
  );
};

export default CardDetail;
