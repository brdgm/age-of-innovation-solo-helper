import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupGameAutoma from '@/views/SetupGameAutoma.vue'
import RoundIncome from '@/views/RoundIncome.vue'
import EndOfRound from '@/views/EndOfRound.vue'
import RoundTurnPlayer from '@/views/RoundTurnPlayer.vue'
import RoundTurnBot from '@/views/RoundTurnBot.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupGameAutoma',
    name: 'SetupGameAutoma',
    component: SetupGameAutoma
  },
  {
    path: '/round/:round/income',
    name: 'RoundIncome',
    component: RoundIncome
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/player/:player',
    name: 'RoundTurnPlayer',
    component: RoundTurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/bot/:bot',
    name: 'RoundTurnBot',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/end',
    name: 'EndOfRound',
    component: EndOfRound
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')