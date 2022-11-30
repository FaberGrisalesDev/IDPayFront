import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from '../reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NiceModal from '@ebay/nice-modal-react';

import {Main} from "../views/Main";
import {SignIn} from "../views/SignIn";
import {Authentication} from "../views/Authentication";
import {SignInCode} from "../views/SignInCode";
import {SignUp} from "../views/SignUp";
import App from '../views/App';
import {ListUsers} from "../views/ListUsers";
import {ConsultMovements} from "../views/ConsultMovements";
import {ActiveCard} from '../views/ActiveCard';
import {ForgotPassword} from '../views/ForgotPassword';
import {AuthProvider, RequireAuth} from "../hook/AuthContext";
import { RecoverPassword } from '../views/RecoverPassword';
import {QueryMovements} from "../views/QueryMovements";
import { MainServices } from '../views/MainServices';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <NiceModal.Provider>
                    <Routes>
                        <Route path={"/"} element={<App/>}/>
                        <Route path={"/home"} element={
                            <RequireAuth>
                                <MainServices/>
                            </RequireAuth>
                        }/>
                        <Route path={"/main"} element={
                            <RequireAuth>
                                <Main/>
                            </RequireAuth>
                        }/>
                        <Route path={"/sign-in"} element={<SignIn/>}/>
                        <Route path={"/query/:number"} element={<QueryMovements />}/>
                        <Route path={"/auth"} element={<Authentication/>}/>
                        <Route path={"/sign-in/code"} element={<SignInCode/>}/>
                        <Route path={"/sign-up"} element={<SignUp/>}/>
                        <Route path={"/user/list"} element={<ListUsers/>}/>
                        <Route path={"/consult-movements"} element={
                            <RequireAuth>
                                <ConsultMovements/>
                            </RequireAuth>
                        }/>
                        <Route path={"/active-card"} element={
                            <RequireAuth>
                                <ActiveCard/>
                            </RequireAuth>
                        }/>
                        <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                        {/* <Route path={"/recover-password/:token"} element={<RecoverPassword/>}/> */}
                    </Routes>
                </NiceModal.Provider>
            </AuthProvider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
