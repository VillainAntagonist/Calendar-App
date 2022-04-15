import {IUser} from "../../../models/IUser";
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from './types';
import {AppDispatch} from "../../index";
import UserService from "../../../api/userService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: isAuth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUser = response.data.find(user => user.username === username && user.password === password);
                if (mockUser) {
                    localStorage.setItem('isAuth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setUser(mockUser));
                    dispatch(AuthActionCreators.setIsAuth(true));

                } else {
                    dispatch(AuthActionCreators.setError('Wrong Username or Password'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1500)

        } catch (e) {
            dispatch(AuthActionCreators.setError('Error occurred during Logging'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false))
    }

}


