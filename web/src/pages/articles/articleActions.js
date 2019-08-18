import axios from 'axios';
import { showSnack } from '../../alerts/alertActions'
import {
  FETCH_ALL_ARTICLES,
  FETCH_ARTICLE,
  SELECT_ARTICLES_CATEGORY,
  SELECT_ARTICLES_ORDER,
  SELECT_ARTICLES_PAGE,
  ADD_ARTICLE_SUCCESS
} from '../../utils/types'
const BASE_URL = 'http://localhost:3000/api/items';

// Obtém a lista de todos os artigos
export function fetchAllArticles(config) {
  const page = config.page || 1;
  const pageSize = config.pageSize || 12;
  const order = config.order || 'asc';
  const filter = config.filter || '';
  const filterOn = config.filterOn || '';
  const category = config.category || '';

  return (dispatch) => {
    axios.get(`${BASE_URL}?type=article&&page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter && `&&filter=${filter}&&filterOn=${filterOn}`}${category && `&&category=${category}`}`)
      .then((articles) => {
        dispatch({ type: FETCH_ALL_ARTICLES, payload: articles.data });
      }).catch((error) => {
        console.error('Erro ao obter a lista de livros: ', error);
      });
  };
}

export function fetchArticle(id) {
  return (dispatch) => {
    axios.get(`${BASE_URL}/${id}`)
      .then((article) => {
        dispatch({ type: FETCH_ARTICLE, payload: article.data });
      }).catch((error) => {
        console.error('Erro ao obter dados do livro: ', error);
      });
  };
}

export function addArticle(data) {
  return (dispatch) => {
    axios.post(`${BASE_URL}`, { ...data, type: "article" })
      .then((article) => {
        dispatch({ type: ADD_ARTICLE_SUCCESS, payload: article.data });
        dispatch(showSnack("Artigo Adicionado com Sucesso"));
      }).catch((error) => {
        console.error("Erro ao adicionar livro: ", error);
      })
  }
}

export function selectCategory(category) { return { type: SELECT_ARTICLES_CATEGORY, payload: category }; }
export function selectOrder(order) { return { type: SELECT_ARTICLES_ORDER, payload: order }; }
export function selectPage(page) { return { type: SELECT_ARTICLES_PAGE, payload: page }; }
