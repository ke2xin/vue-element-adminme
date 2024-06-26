import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    hidden: true,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    hidden: false,
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    hidden: true,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    hidden: true,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    hidden: true,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    hidden: true,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },
  // 下面开始进行开发操作
  {
    path: '/projector',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'projector', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/projector/index'),
        name: 'projector',
        meta: { title: 'projector', icon: 'el-icon-takeaway-box' }
      },
      {
        path: 'topic',
        component: () => import('@/views/projector/topic'),
        name: 'topic',
        meta: { title: 'topic', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/douyin',
    component: Layout,
    alwaysShow: true,
    hidden: false,
    meta: { title: 'douyin', icon: 'education' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/douyin/index'),
        name: 'douyin',
        meta: { title: 'douyinResource', icon: 'el-icon-picture' }
      },
      {
        path: 'searchkc',
        component: () => import('@/views/douyin/searchkc'),
        name: 'searchkc',
        meta: { title: 'searchkc', icon: 'el-icon-search' }
      },
      {
        path: 'addkc',
        component: () => import('@/views/douyin/add-kc'),
        name: 'addkc',
        meta: { title: 'addkc', icon: 'form' }
      },
      {
        path: 'querykc',
        component: () => import('@/views/douyin/query-kc'),
        name: 'querykc',
        meta: { title: 'querykc', icon: 'search' }
      }
    ]
  },
  {
    path: '/douyin-role',
    component: Layout,
    alwaysShow: true,
    hidden: false,
    meta: { title: 'douyin_role', icon: 'peoples' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/douyin-role/index'),
        name: 'douyin-role',
        meta: { title: 'douyinupZl', icon: 'skill' }
      },
      {
        path: 'settle-in',
        component: () => import('@/views/douyin-role/settle-in'),
        name: 'settle-in',
        meta: { title: 'settle_in', icon: 'el-icon-s-cooperation' }
      },
      {
        path: 'settle-in-partner',
        component: () => import('@/views/douyin-role/settle-in-partner'),
        name: 'settle-in-partner',
        meta: { title: 'settle_in_partner', icon: 'el-icon-s-cooperation' }
      },
      {
        path: 'add-role',
        component: () => import('@/views/douyin-role/add-role'),
        name: 'add-role',
        meta: { title: 'add_role', icon: 'add_role' }
      },
      {
        path: 'bind-role',
        component: () => import('@/views/douyin-role/bind_role'),
        name: 'bind-role',
        meta: { title: 'bind_role', icon: 'el-icon-paperclip' }
      },
      {
        path: 'query-entity',
        component: () => import('@/views/douyin-role/query-entity'),
        name: 'query-entity',
        meta: { title: 'query_entity', icon: 'search' }
      },
      {
        path: 'get-bind-list',
        component: () => import('@/views/douyin-role/get_bind_list.vue'),
        name: 'get-bind-list',
        meta: { title: 'get_bind_list', icon: 'search' }
      },
      {
        path: 'get-class-auth',
        component: () => import('@/views/douyin-role/get_class_auth'),
        name: 'get-class-auth',
        meta: { title: 'get_class_auth', icon: 'search' }
      },
      {
        path: 'query-entity-info',
        component: () => import('@/views/douyin-role/query_entity_info'),
        name: 'query-entity-info',
        meta: { title: 'query_entity_info', icon: 'search' }
      },
      {
        path: 'add-class-auth',
        component: () => import('@/views/douyin-role/add_class_auth'),
        name: 'add-class-auth',
        meta: { title: 'add_class_auth', icon: 'search' }
      },
      {
        path: 'update-class-auth',
        component: () => import('@/views/douyin-role/update_class_auth'),
        name: 'update-class-auth',
        meta: { title: 'update_class_auth', icon: 'edit' }
      },
      {
        path: 'get-audit-detail',
        component: () => import('@/views/douyin-role/get_audit_detail'),
        name: 'get-audit-detail',
        meta: { title: 'get_audit_detail', icon: 'search' }
      }
    ]
  },

  {
    path: '/yut',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'yut', icon: 'el-icon-picture-outline' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/yut/index'),
        name: 'yut',
        meta: { title: 'yut_img', icon: 'el-icon-picture' }
      }
    ]
  },

  {
    path: '/lunar',
    component: Layout,
    alwaysShow: false,
    meta: { title: 'lunar', icon: 'el-icon-s-opportunity' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/lunar/index'),
        name: 'lunar',
        meta: { title: 'lunar', icon: 'el-icon-s-opportunity' }
      }
    ]
  },
  {
    path: '/diff',
    component: Layout,
    alwaysShow: false,
    meta: { title: 'diff', icon: 'el-icon-s-opportunity' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/diff/index'),
        name: 'diff',
        meta: { title: 'diff', icon: 'el-icon-grape' }
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    alwaysShow: false,
    meta: { title: 'address', icon: 'el-icon-s-opportunity' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/address/index'),
        name: 'address',
        meta: { title: 'address', icon: 'el-icon-location' }
      }
    ]
  },
  {
    path: '/shanghujj',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'shanghujj', icon: 'component' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/shanghujj/index'),
        name: 'shanghujj',
        meta: { title: 'shanghujj', icon: 'component' }
      },
      {
        path: 'jinjian',
        component: () => import('@/views/shanghujj/jinjian'),
        name: 'jinjian',
        meta: { title: 'jinjian', icon: 'component' }
      },
      {
        path: 'dzsld',
        component: () => import('@/views/shanghujj/dzsld'),
        name: 'dzsld',
        meta: { title: 'dzsld', icon: 'component' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
