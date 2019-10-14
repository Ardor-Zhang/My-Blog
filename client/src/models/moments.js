import request from '../utils/request';
import Infos from "../components/Infos/Infos";

export default {
    namespace : 'moments',

    state : {
        moments_array : []
    },

    reducers : {
        MOMENTS_ARRAY(state, { payload }) {
            return { moments_array : payload}
        }
    },

    effects : {
        *ADD_MOMENT_ASYNC({ payload }, { call }) {
            const result = yield call(request, '/api/moment/addItem', 'post', payload);
            Infos(result)
        },
        *GET_ALL_MONENTS_ASYNC(_, { call, put }) {
            const result = yield call(request, '/api/moment/get_all_moments', 'post', null);
            if(result.type === "success") {
                yield put({ type : "MOMENTS_ARRAY", payload : result.infos })
             }
        }
    }
}