import axios from 'axios';

export const getNotes = (sort, search) => {
    if(search===undefined){
        search=''
    }else{
        search=search
    }
    if(sort==='ASC'){
       sort ='asc' 
    }else{
        sort='desc'
    }
    return {
        type    : 'GET_NOTES',
        payload : axios.get(`http://192.168.100.49:5000/notes?sort=${sort}&search=${search}`),
    }
}

export const addNotes = (data) => {
    return {
        type    : 'ADD_NOTES',
        payload : axios.post('http://192.168.100.49:5000/notes', {title:data.title, note:data.description, category:data.category}),
    }
}

export const updateNotes = (id, data) => {
    return {
        type    : 'UPDATE_NOTES',
        payload : axios.patch('http://192.168.100.49:5000/notes/'+id.id, {title:data.title, note:data.note, category:data.category}),
    }
}

export const deleteNotes = (id) => {
	// console.warn("console log action "+ id.id)
    return {
        type    : 'DELETE_NOTES',
        payload : axios.delete('http://192.168.100.49:5000/notes/'+id.id),
    }
}


export const pageNotes = (page) => {
    return {
        type    : 'PAGE_NOTES',
        payload : axios.get('http://192.168.100.49:5000/notes?page='+page),
    }
}

export const showNotesByCategory = (idCategory) => {
    console.warn(idCategory)
    return {
        type    : 'CATEGORY_NOTES',
        payload : axios.get('http://192.168.100.49:5000/notes/'+idCategory),
    }
}