import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/stores/userStore";
import Layout from '@/views/Layout/index.vue'
import Repository from '@/views/Repository/index.vue'
import AllData from '@/views/Repository/components/AllData.vue'
import form from "@/views/MyHome/components/form.vue";
import Document from '@/views/SeminarCentre/components/Document.vue'
import TeachingActivities from '@/views/MyHome/components/TeachingActivities.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/repository'

        },
        {
          path:'/repository',
          component: Repository,
          children: [
            {
              path: '',
              component: AllData
            },
            {
              path: 'classification',
              component: () => import('@/views/Repository/components/Classification.vue')
            },
            {
              path: 'upload',
              component: () => import('@/views/Repository/components/Upload.vue')
            }
          ],

        },
        {
          path: '/myhome',
          component: () => import('@/views/MyHome/index.vue'),
          children: [
            {
              path: 'teaching',
              component: TeachingActivities
            },
            {
              path: '',
              component: () => import('@/views/MyHome/components/TeachingPlan.vue')
            },
            {
              path: 'tutorial',
              component: () => import('@/views/MyHome/components/TutorialPlan.vue')
            },
            {
              path: 'form',
              component: form
            }
          ]
        },
        {
          path:'/seminarcentre',
          component: () => import('@/views/SeminarCentre/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/SeminarCentre/components/MyTeaching.vue')
            },
            {
              path: 'document',
              component: Document
            },
            {
              path: 'onlinemeeting',
              component: () => import('@/views/SeminarCentre/components/OnlineMeeting.vue')
            },
            {
              path: 'resources',
              component: () => import('@/views/SeminarCentre/components/Resources.vue')
            }
          ]
        },
        {
          path: '/UserInformation',
          component: () => import('@/views/UserInformation/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/UserInformation/components/person.vue')
            },
            {
              path: 'administrator',
              component: () => import('@/views/UserInformation/components/administrator.vue'),
              children:[
                {
                  path: '',
                  component: () => import('@/views/management/controlPanel.vue'),
                },
                {
                  path: 'userControl',
                  component: () => import('@/views/management/userControl.vue'),
                }
              ]
            },
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
    },
    {
      path: '/register',
      component: () => import('@/views/Register/index.vue'),
    },
    {
      path: '/online',
      component: () => import('@/views/Online/index.vue')
    },

  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 获取token
  const token = userStore.userInfo.token
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/');
    } else {
      next(); // 允许正常导航
    }
  } else {
    if (to.path === '/login' || to.path === '/register') {
      next(); // 允许正常导航
    } else {
      let toPath = to.path
      next('/login?redirect=' + toPath);
    }
  }
})

export default router
