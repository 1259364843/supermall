import Vue from "vue";
import VueRouter from "vue-router";
//  1.安装插件
Vue.use(VueRouter);

//懒加载方式导入组件
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shopcart/ShopCart')
const Profile = () => import('views/profile/Profile')

const Detail = () => import('views/detail/Detail')
//  2.创建路由对象实例
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
//  商品详情页面路由
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出

export default router;
