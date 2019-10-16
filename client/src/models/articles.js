import request from '../utils/request';
import Infos from "../components/Infos/Infos";

export default {
    namespace : 'articles',

    state : {
        articles_array : [],
        articles_array_show : []
    },

    reducers : {
        ARTICLES_ARRAY(state, { payload }) {
            return { articles_array : payload, articles_array_show : payload}
        },
        FILTER_ARTICLE(state, { payload }) {
            let articles_array_show;
            if(payload === "All") {
                articles_array_show = state.articles_array
            } else{
                articles_array_show = state.articles_array.filter((val) => {return val.type === payload})
            }
            return { ...state, articles_array_show }
        }
    },

    effects : {
        *ADD_ARTICLE_ASYNC({ payload }, { call }) {
            const result = yield call(request, '/api/article/addArticle', 'post', payload);
            Infos(result)
        },
        *GET_ALL_ARTICLES_ASYNC(_, { call, put }) {
            const result = yield call(request, '/api/article/get_all_articles', 'post', null);
            if(result.type === "success") {
                yield put({ type : "ARTICLES_ARRAY", payload : result.infos })
             }
        },
        *ADD_VIEW_TIME({ payload } , { call }) {
            yield call(request, '/api/article/add_view_time', 'post', payload);
        }
    }
}