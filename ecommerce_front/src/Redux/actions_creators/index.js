import axios from "axios";
import {
  GET_ALL_GAMES,
  GET_CATEGORIES,
  GET_AUTHORS,
  GET_DESIGNERS,
  GET_LANGUAGES,
  GET_EDITORIALS,
  GET_MECHANICS,
  GET_THEMATICS,
  GET_GAMES_BY_NAMES
} from "../action-types/index";
import { toast } from "react-toastify";

const VITE_URL_GAMES = import.meta.env.VITE_URL_GAMES;
const VITE_URL_CATEGORIES = import.meta.env.VITE_URL_CATEGORIES;
const VITE_URL_AUTHORS = import.meta.env.VITE_URL_AUTHORS;
const VITE_URL_DESIGNERS = import.meta.env.VITE_URL_DESIGNERS;
const VITE_URL_LANGUAGES = import.meta.env.VITE_URL_LANGUAGES;
const VITE_URL_EDITORIALS = import.meta.env.VITE_URL_EDITORIALS;
const VITE_URL_MECHANICS = import.meta.env.VITE_URL_MECHANICS;
const VITE_URL_THEMATICS = import.meta.env.VITE_URL_THEMATICS;

export const getAllGames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_GAMES);
      dispatch({ type: GET_ALL_GAMES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getGamesByName = (name) => {
  return async (dispatch) => {
    try {
      const responseF = await axios.get(`${VITE_URL_GAMES}/name/?name=${name}`);
      dispatch({ type: GET_GAMES_BY_NAMES, payload: responseF.data });
    } catch (res) {
      alert(res.response.data.message);
    }
  };
};

export const postGames = (data) => {
  return async () => {
    try {
      await axios.post(VITE_URL_GAMES, data);
      toast.success("The game was successfully created");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_CATEGORIES);
      dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postCategories = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_CATEGORIES, data);
      toast.success("The category was successfully created");
      dispatch(getCategories());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getAuthors = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_AUTHORS);
      dispatch({ type: GET_AUTHORS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postAuthors = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_AUTHORS, data);
      toast.success("Author was successfully created");
      dispatch(getAuthors());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getDesigners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_DESIGNERS);
      dispatch({ type: GET_DESIGNERS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postDesigners = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_DESIGNERS, data);
      toast.success("Designer was successfully created");
      dispatch(getDesigners());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getLanguages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_LANGUAGES);
      dispatch({ type: GET_LANGUAGES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postLanguages = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_LANGUAGES, data);
      toast.success("Language was successfully created");
      dispatch(getLanguages());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getEditorials = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_EDITORIALS);
      dispatch({ type: GET_EDITORIALS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postEditorials = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_EDITORIALS, data);
      toast.success("Editorial was successfully created");
      dispatch(getEditorials());
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const getMechanics = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_MECHANICS);
      dispatch({ type: GET_MECHANICS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postMechanics = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_MECHANICS, data);
      toast.success("Mechanic was successfully created");
      dispatch(getMechanics());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getThematics = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_THEMATICS);
      dispatch({ type: GET_THEMATICS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postThematics = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_THEMATICS, data);
      toast.success("Thematic was successfully created");
      dispatch(getThematics());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
