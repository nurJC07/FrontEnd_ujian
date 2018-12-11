import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectProdukReducers from './SelectProdukReducers';

export default combineReducers({
    pikachu: () => 'Ryan Reynolds',
    // username: AuthReducer user name kita ganti auth karena utk menghindari error
    auth: AuthReducer,
    selectedProduk : SelectProdukReducers
});