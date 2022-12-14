import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/AuthForm.vue";
import GameList from "../views/GameList.vue";
import GameItem from "../views/GameItem.vue";
import UserProfile from "../views/UserProfile.vue";
import RegisterForm from "../views/RegisterForm.vue";
import SuccessLogin from "../views/SuccessLogin.vue";
import PageNotFound from "../views/PageNotFound.vue";
import ComponentMain from "../components/ComponentMain.vue";

const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ComponentMain,
    },
    {
      path: "/games",
      name: "gameList",
      component: GameList,
    },
    {
      path: "/games/:id",
      name: "gameItem",
      component: GameItem,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterForm,
    },
    {
      path: "/profile/:name",
      name: "profile",
      component: UserProfile,
    },
    {
      path: "/success",
      name: "success login",
      component: SuccessLogin,
    },
    {
      path: "/*",
      name: "404",
      component: PageNotFound,
    },
  ],
});

export default index;
