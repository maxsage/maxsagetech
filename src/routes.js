import Home from './components/Home.vue'
import Header from './components/Header.vue'

import Nodejs from './components/nodejs/Nodejs.vue'
import NodejsTheCompleteGuidetoBuildRESTfulAPIsCourseContents from './components/nodejs/NodejsTheCompleteGuidetoBuildRESTfulAPIsCourseContents.vue'

import Vuejs from './components/vuejs/Vuejs.vue'
import VuejsDeployingToHeroku from './components/vuejs/VuejsDeployingToHeroku.vue'
import VuejsBigPictureCourseContents from './components/vuejs/VuejsBigPictureCourseContents.vue'
import VuejsPlaybookCourseContents from './components/vuejs/VuejsPlaybookCourseContents.vue'
import DevelopingFasterWithVueCLICourseContents from './components/vuejs/DevelopingFasterWithTheVueCLICourseContents.vue'
import VueJSFundamentalsCourseContents from './components/vuejs/VueJSFundamentalsCourseContents.vue'
import VuejsEssentialsCourseContents from './components/vuejs/VuejsEssentialsCourseContents.vue'

import Webpack from './components/webpack/Webpack.vue'
import WebpackRemoveAutomaticLoaderModuleNameExtension from './components/webpack/WebpackRemoveAutomaticLoaderModuleNameExtension.vue'
import Webpack2TheCompleteDevelopersGuideCourseContents from './components/webpack/Webpack2TheCompleteDevelopersGuideCourseContents.vue'

import WPF from './components/wpf/WPF.vue'
import WPFDatabindingInDepthCourseContents from './components/wpf/WPFDatabindingInDepthCourseContents.vue'
import WPFMVVMInDepthCourseContents from './components/wpf/WPFMVVMInDepthCourseContents.vue'

import MVVMLight from './components/mvvmlight/MVVMLight.vue'
import MVVMLightToolkitFundamentalsCourseContents from './components/mvvmlight/MVVMLightCourseContents.vue'

import Xamarin from './components/xamarin/Xamarin.vue'
import XamarinFormsCrossPlatformCourseContents from './components/xamarin/XamarinFormsCrossPlatformCourseContents.vue'

import SQLite from './components/sqlite/SQLite.vue'

import Editors from './components/editors/Editors.vue'
import VisualStudio from './components/editors/visual-studio/VisualStudio.vue'
import VisualStudioCode from './components/editors/visual-studio-code/VisualStudioCode.vue'

// I think this loads the route at application startup
// const User = resolve => {
//     require.ensure(['./components/user/User.vue'], () => {
//         resolve(require('./components/xamarin/Xamarin.vue'));
//     }, 'user');
// };

export const routes = [
  {
    path: '',
    name: 'home',
    components: {
      default: Home,
      'header-top': Header
    }
  },
  {
    path: '/nodejs',
    components: {
      default: Nodejs,
      'header-top': Header
    }
  },
  {
    path: '/nodejsthecompleteguidetobuildrestfulapis-course-contents',
    components: {
      default: NodejsTheCompleteGuidetoBuildRESTfulAPIsCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/vuejs',
    components: {
      default: Vuejs,
      'header-top': Header
    }
  },
  {
    path: '/vuejsdeployingtoheroku',
    components: {
      default: VuejsDeployingToHeroku,
      'header-top': Header
    }
  },

  {
    path: '/vuejsbigpicture-course-contents',
    components: {
      default: VuejsBigPictureCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/vuejsplaybook-course-contents',
    components: {
      default: VuejsPlaybookCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/developingfasterwithvuecli-course-contents',
    components: {
      default: DevelopingFasterWithVueCLICourseContents,
      'header-top': Header
    }
  },
  {
    path: '/vuejsfundamentals-course-contents',
    components: {
      default: VueJSFundamentalsCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-course-contents',
    components: {
      default: VuejsEssentialsCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/webpack',
    components: {
      default: Webpack,
      'header-top': Header
    }
  },
  {
    path: '/webpackremoveautomaticloadermodulenameextension',
    components: {
      default: WebpackRemoveAutomaticLoaderModuleNameExtension,
      'header-top': Header
    }
  },
  {
    path: '/webpack2thecompletedevelopersguide-course-contents',
    components: {
      default: Webpack2TheCompleteDevelopersGuideCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/wpf',
    components: {
      default: WPF,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-course-contents',
    components: {
      default: WPFDatabindingInDepthCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-course-contents',
    components: {
      default: WPFMVVMInDepthCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/mvvmlight',
    components: {
      default: MVVMLight,
      'header-top': Header
    }
  },
  {
    path: '/mvvmlighttoolkitfundamentals-course-contents',
    components: {
      default: MVVMLightToolkitFundamentalsCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/xamarin',
    components: {
      default: Xamarin,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-course-contents',
    components: {
      default: XamarinFormsCrossPlatformCourseContents,
      'header-top': Header
    }
  },
  {
    path: '/sqlite',
    components: {
      default: SQLite,
      'header-top': Header
    }
  },
  {
    path: '/editors',
    components: {
      default: Editors,
      'header-top': Header
    }
  },
  {
    path: '/editors/visual-studio',
    components: {
      default: VisualStudio,
      'header-top': Header
    }
  },
  {
    path: '/editors/visual-studio-code',
    components: {
      default: VisualStudioCode,
      'header-top': Header
    }
  },

  {path: '/redirect-me', redirect: {name: 'home'}},
  {path: '*', redirect: '/'}
]
