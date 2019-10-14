export default {
    namespace : 'where',  // 指当前在哪一页

    state : {
        where : 0  
    },

    reducers : {
        WHERE(_, { payload }) {
            return { where : payload}
        }
    }
}