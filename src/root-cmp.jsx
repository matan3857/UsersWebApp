import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/AppHeader'

export class RootCmp extends React.Component {
    render() {
        return (
            <div>
                <AppHeader />
                <main className="main-container">
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={route.isExact} element={<route.element />} path={route.path} />)}
                    </Routes>
                </main>
            </div>
        )
    }
}