import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NiceModal from '@ebay/nice-modal-react';
import {Main} from "./views/Main";
import {SignIn} from "./views/SignIn";
import {Authentication} from "./views/Authentication";
import {SignInCode} from "./views/SignInCode";
import {SignUp} from "./views/SignUp";
import App from './views/App';
import {ListUsers} from "./views/ListUsers";
import {ConsultMovements} from "./views/ConsultMovements";
import {ActiveCard} from './views/ActiveCard';
import {ForgotPassword} from './views/ForgotPassword';
import {AuthProvider, RequireAuth} from "./hook/AuthContext";
import { RecoverPassword } from './views/RecoverPassword';
import { Admin } from './views/admin';
import { Home } from './components/admin/pages/Home';
import { Language } from './components/admin/pages/Language';
import { TemplateSideBar } from './routes/templates/TemplateSideBar';
import {UpdatePassword} from "./views/UpdatePassword";
import { User } from './components/admin/pages/User';
import {QueryMovements} from "./views/QueryMovements";
import {PoliciesCookies} from './views/PoliciesCookies';
import { MainServices } from './views/MainServices';
import UserFlow from './components/main/UserFlow';


ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <NiceModal.Provider>
                    <Routes>
                        <Route path={"/"} element={<App/>}/>
                        <Route path={"/policies-cookies"} element={<PoliciesCookies/>}/>
                        <Route path={"/services"} element={<MainServices/>}/>
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
                        <Route path={"/admin"} element={
                            <RequireAuth>
                                <Admin/>
                            </RequireAuth>
                        }/>
                        <Route path={"/sign-in"} element={<SignIn/>}/>
                        <Route path={"/auth"} element={<Authentication/>}/>
                        <Route path={"/sign-in/code"} element={<SignInCode/>}/>
                        <Route path={"/sign-up"} element={<SignUp/>}/>
                        <Route path={"/user/list"} element={<ListUsers/>}/>
                        <Route path={"/query/:number"} element={<QueryMovements/>}/>
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
                        <Route path={"/recover-password/:token"} element={<RecoverPassword/>}/>
                        
                        <Route path={"/"} element={<TemplateSideBar/>}>
                            {/* <Route path={"/home"} element={<Home/>}/> */}
                            
                            <Route path={"/Usuarios"} element={
                                <RequireAuth>
                                    <User/>
                                </RequireAuth>
                            }/>
                            <Route path={"/language"} element={<Language/>}/>
                        </Route>
                        <Route path={"/update-password"} element={<UpdatePassword/>}/>
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
