const initialState = {
	number 		: 10,
	data 		: [],
	results		: [],
	isLoading	: false,
	isError 	: false,
	category 	: [] 
} 

// create a reducer for getting network from Restfull API
export default category = (state = initialState, action) => {
	switch(action.type){
		case 'GET_CATEGORY_PENDING': 		//in case when loading get data
			return{
				isLoading : true
			}
		case 'GET_CATEGORY_REJECTED': 		//in case error network/else
			return{
				isLoading : false,
				isError   : false,
			}
		case 'GET_CATEGORY_FULFILLED': 	//in case successfuly get data
			return{
				isLoading 	: false,
				isError 	: false,
				data 		: action.payload.data.data
			}
		case 'ADD_CATEGORY_PENDING': 		//in case when loading get data
			return{
				...state,
				isLoading : true
			}
		case 'ADD_CATEGORY_REJECTED': 		//in case error network/else
			return{
				...state,
				isLoading : false,
				isError   : false,
			}
		case 'ADD_CATEGORY_FULFILLED': 	//in case successfuly get data
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				data 		: state.data.concat(...action.payload.data.data)
			}

		case 'DELETE_CATEGORY_PENDING': 		//in case when loading get data
			return{
				...state,
				isLoading : true
			}
		case 'DELETE_CATEGORY_REJECTED': 		//in case error network/else
			return{
				...state,
				isLoading : false,
				isError   : false,
			}
		case 'DELETE_CATEGORY_FULFILLED': 	//in case successfuly get data
			return{
				...state,
				isLoading 	: false,
				isError 	: false,
				// data 		: state.data.concat(...action.payload.data.data)
				data 		: state.data.filter(category=>category.idCategory !== action.payload.data.idCategory)
				// data 		: action.payload.data.data

			}

		default :
			return state
	}
}