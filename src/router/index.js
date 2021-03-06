import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import MyAds from '@/components/Ads/MyAds'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/ad/:id",
            name: "ad",
            component: Ad
        },
        {
            path: "/myAds",
            name: "myAds",
            component: MyAds,
            beforeEnter: AuthGuard
        },
        {
            path: "/new",
            name: "newAd",
            component: NewAd,
            beforeEnter: AuthGuard
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/registration",
            name: "reg",
            component: Registration
        },
        {
            path: "/orders",
            name: "orders",
            component: Orders,
            beforeEnter: AuthGuard
        }
    ]
})