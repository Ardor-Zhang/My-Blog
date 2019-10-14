import request from '../utils/request';
import Infos from "../components/Infos/Infos";

export default {
    namespace : 'articles',

    state : {
        articles_array : []
    },

    reducers : {
        ARTICLES_ARRAY(state, { payload }) {
            return { articles_array : payload}
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
        }
    }
}