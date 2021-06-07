import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthPage } from './bages/auth_page.js';
import { CreatePage } from './bages/create_page.js';
import { DetailPage } from './bages/detail_page.js';
import { LinksPage } from './bages/links_page.js';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    };
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
};