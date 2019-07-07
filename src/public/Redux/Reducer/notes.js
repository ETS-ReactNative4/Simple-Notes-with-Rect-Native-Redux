const initialState = {
	data 			: [],
	// resultSearch	: [],
	isLoading		: false,
	isError 		: false,
	totalPage		: 0,
} 

// create a reducer for getting network from Restfull API
export default notes = (state = initialState, action) => {
	switch(action.type){
		case 'GET_NOTES_PENDING': 		//in case when loading get data
			return{
				isLoading : true
			}
		case 'GET_NOTES_REJECTED': 		//in case error network/else
			return{
				isLoading : false,
				isError   : true,
			}
		case 'GET_NOTES_FULFILLED': 	//in case successfuly get data
			return{
				isLoading 	: false,
				isError 	: false,
				data 		: action.payload.data.data,
				totalPage 	: action.payload.data.totalPage
			}

			// ADD
		case 'ADD_NOTES_PENDING':
			return{
				...state,
				isLoading : true
			}
		case 'ADD_NOTES_REJECTED': 		
			return{
				...state,
				isLoading : false,
				isError   : true,
			}
		case 'ADD_NOTES_FULFILLED':
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				data 		: action.payload.data.data.concat(...state.data)
			}

			// Update
		case 'UPDATE_NOTES_PENDING':
			return{
				...state,
				isLoading : true
			}
		case 'UPDATE_NOTES_REJECTED': 		
			return{
				...state,
				isLoading : false,
				isError   : true,
			}
		case 'UPDATE_NOTES_FULFILLED': 
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				data 		: state.data.map(note => 
                (note.idNote == action.payload.data.data[0].idNote) ? 
                    action.payload.data.data[0] : note
				)
			}

			
			// delete
		case 'DELETE_NOTES_PENDING':
			return{
				...state,
				isLoading : true
			}	
		case 'DELETE_NOTES_FULFILLED':
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				data 		: state.data.filter(note=>note.idNote !== action.payload.data.data.idNote)
			}
		case 'DELETE_NOTES_REJECTED': 		
			return{
				...state,
				isLoading : false,
				isError   : true,
			}

		// sort
		case 'SORT_NOTES_PENDING':
			return{
				...state,
				isLoading : true
			}
		case 'SORT_NOTES_REJECTED': 		
			return{
				...state,
				isLoading : false,
				isError   : true,
			}
		case 'SORT_NOTES_FULFILLED': 	
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				data 		: action.payload.data.data
			}

		// pag


		
		case 'PAGE_NOTES_PENDING':
			return{
				...state,
				isLoading : true
			}
		case 'PAGE_NOTES_REJECTED': 		
			return{
				...state,
				isLoading : false,
				isError   : true,
			}
		case 'PAGE_NOTES_FULFILLED': 	
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				data 		: [...state.data].concat( action.payload.data.data)
			}


		case 'CATEGORY_NOTES_PENDING': 		//in case when loading get data
			return{
				isLoading : true
			}
		case 'CATEGORY_NOTES_REJECTED': 		//in case error network/else
			return{
				isLoading : false,
				isError   : true,
			}
		case 'CATEGORY_NOTES_FULFILLED': 	//in case successfuly get data
			return{
				isLoading 	: false,
				isError 	: false,
				data 		: action.payload.data.data,
				// totalPage 	: action.payload.data.totalPage
			}


		default :
			return state
	}

}