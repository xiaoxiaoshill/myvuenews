import Vue from 'vue'//路由文件，配置路由路径
import Router from 'vue-router'
Vue.use(Router)
// 重写路由，防止跳转报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
import login from '../components/login'
import register from '../components/register'
import Home from '../components/Home'
import top from '../components/top'
import left from '../components/left'
import tuijian from '../components/tuijian'
import gedan from '../components/gedan'
import diantai from '../components/diantai'
import Ranking from '../components/Ranking'
import singer from '../components/singer'
import newest from '../components/newest'
import xiugai from '../components/xiugai'
import xiugaione from '../components/xiugai-one'
import xiugaitwo from '../components/xiugai-two'
import xiugaithree from '../components/xiugai-three'
import EYourP from '../components/EYourP'

export default new Router({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/register',component:register},
        {path:'/login',component:login},
        {path:'/Home/:id',components:{Home:Home,top:top,left:left},
        props:{Home:true,top:true,left:true},
        children:[
            {path:'',component:tuijian},
            {path:'tuijian',component:tuijian},
            {path:'gedan',component:gedan},
            {path:'diantai',component:diantai},
            {path:'Ranking',component:Ranking},
            {path:'singer',component:singer},
            {path:'newest',component:newest}
        ]
        },
        {path:'/Home/:id/xiugai',components:{Home:xiugai,top:top,left:left},
        props:{Home:true,top:true,left:true},
        children:[
           {path:'',components:{default:xiugaione,xiu:xiugaione}},
           {path:'xiugaione',components:{default:xiugaione,xiu:xiugaione}},
           {path:'xiugaitwo',components:{default:xiugaitwo,xiu:xiugaitwo}},
           {path:'xiugaithree',components:{default:xiugaithree,xiu:xiugaithree}}
        ]
        },
        {path:'/Home/:id/xiugai/EYourP',components:{Home:EYourP,top:top,left:left},props:{Home:true,top:true,left:true}}
        
    ]
})