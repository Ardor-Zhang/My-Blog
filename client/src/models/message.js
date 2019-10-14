import request from '../utils/request';
import Infos from "../components/Infos/Infos";

export default {
    namespace : 'messages',

    state : {
        messages_array : []
    },

    reducers : {
        MESSAGES_ARRAY(state, { payload }) {
            let clone = state.messages_array.reverse()
            return { messages_array : clone.concat(payload).reverse() }
        }
    },

    effects : {
        *ADD_MESSAGE_ASYNC({ payload }, { call }) {
            const result = yield call(request, '/api/message/addMessage', 'post', payload);
            Infos(result)
        },
        *GET_ALL_MESSAGES_ASYNC(_, { call, put }) {
            const result = yield call(request, '/api/message/get_all_messages', 'post', null);
            if(result.type === "success") {
                yield put({ type : "MESSAGES_ARRAY", payload : result.infos })
             }
        }
    }
}