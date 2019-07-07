import axios from 'axios';

export const getCategory = () => {
    return {
        type    : 'GET_CATEGORY',
        payload : axios.get('http://192.168.100.49:5000/category'),
    }
}

export const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: axios.post('http://192.168.100.49:5000/category', data)
    }
}

export const deleteCategory = (id) => {
    return {
        type    : "DELETE_CATEGORY",
        payload : axios.delete('http://192.168.100.49:5000/category/'+id)
    }
}