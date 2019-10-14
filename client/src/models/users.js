import request from '../utils/request';
import Infos from "../components/Infos/Infos";
import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';

export default {
    namespace : 'users',  // 指当前在哪一页

    state : {
        isRegister : false,
        isAuthenticated : false,
        userNow : {}
    },

    reducers : {
        TIME_TO_LOGIN(state, { payload }) {
            return {...state, isRegister : payload};
        },
        SETCURRENTUSER(state, { payload }) {
            return {
                ...state,
                isAuthenticated : !isEmpty(payload),
                userNow : payload, 
            }
        },
        LOGOUT(state,_) {
            return {
                ...state,
                isAuthenticated : false,
                userNow : {}, 
            }
        }
    },

    effects : {
        *REGISTER_ASYNC({ payload }, { call, put }) {
            const result = yield call(request, "/api/user/register", "post", {...payload, profile : ""});
            Infos(result)
            if(result.type === "success") {
               yield put({ type : "TIME_TO_LOGIN", payload : true })
            }
            
        },
        *CHECK_USERNAME({ payload }, { call }) {
            const result = yield call(request, "/api/user/register_checkusername", "post", payload);
            Infos(result) 
        },
        *LOGIN_ASYNC({ payload }, { call, put }) {
            const result = yield call(request, "/api/user/login", "post", payload);
            Infos(result)
            if(result.type === "success") {
                const token = result.token;
                localStorage.setItem("jwtToken", token);
                yield put({ type : "SETCURRENTUSER", payload : jwtDecode(token)})
             }
        }
    }
}