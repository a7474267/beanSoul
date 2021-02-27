import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Home.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: '/cart-form',
        component: () => import('../views/frontend/CartForm.vue'),
      },
      {
        path: '/cart-check/:orderId',
        component: () => import('../views/frontend/CartCheck.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
