import Home from './components/Home.vue'
import Header from './components/Header.vue'

import Vuejs from './components/vuejs/Vuejs.vue'
import VuejsEssentials00CourseContents from './components/vuejs/VuejsEssentials00CourseContents.vue'
import VuejsEssentials01AnIntroductionToVue from './components/vuejs/VuejsEssentials01AnIntroductionToVue.vue'
import VuejsEssentials02MovingOnWithVueCLI from './components/vuejs/VuejsEssentials02MovingOnWithVueCLI.vue'
import VuejsEssentials03WritingEffectiveApps from './components/vuejs/VuejsEssentials03WritingEffectiveApps.vue'
import VuejsEssentials04HandlingStateWithVuex from './components/vuejs/VuejsEssentials04HandlingStateWithVuex.vue'
import VuejsEssentials05AuthenticationinVuewithOAuth2 from './components/vuejs/VuejsEssentials05AuthenticationinVuewithOAuth2.vue'
import VuejsEssentials06NavigationwithVueRouter from './components/vuejs/VuejsEssentials06NavigationwithVueRouter.vue'
import VuejsEssentials07DesignOfVuexModules from './components/vuejs/VuejsEssentials07DesignOfVuexModules.vue'
import VuejsEssentials08HandlingImageUpload from './components/vuejs/VuejsEssentials08HandlingImageUpload.vue'

import WPF from './components/wpf/WPF.vue'

import WPFDatabindingInDepth00CourseContents from './components/wpf/WPFDatabindingInDepth00CourseContents.vue'
import WPFDatabindingInDepth01CourseOverview from './components/wpf/WPFDatabindingInDepth01CourseOverview.vue'
import WPFDatabindingInDepth02DataBindingOverview from './components/wpf/WPFDatabindingInDepth02DataBindingOverview.vue'
import WPFDatabindingInDepth03DataSources from './components/wpf/WPFDatabindingInDepth03DataSources.vue'
import WPFDatabindingInDepth04BindingCoreConcepts from './components/wpf/WPFDatabindingInDepth04BindingCoreConcepts.vue'
import WPFDatabindingInDepth05UnleashingTheFullPowerOfBindings from './components/wpf/WPFDatabindingInDepth05UnleashingTheFullPowerOfBindings.vue'
import WPFDatabindingInDepth06DeepDiveIntoDataTemplates from './components/wpf/WPFDataBindingInDepth06DeepDiveIntoDataTemplates.vue'
import WPFDatabindingInDepth07DesignTimeDatabinding from './components/wpf/WPFDataBindingInDepth07DesignTimeDatabinding.vue'
import WPFDatabindingInDepth08ContainersAndCollectionsControls from './components/wpf/WPFDataBindingInDepth08ContainersAndCollectionsControls.vue'
import WPFDatabindingInDepth09DataInputValidation from './components/wpf/WPFDataBindingInDepth09DataInputValidation.vue'

import WPFMVVMInDepth00CourseContents from './components/wpf/WPFMVVMInDepth00CourseContents.vue'
import WPFMVVMInDepth01MVVMPatternFundamentals from './components/wpf/WPFMVVMInDepth01MVVMPatternFundamentals.vue'
import WPFMVVMInDepth02FirstTasteOfMVVM from './components/wpf/WPFMVVMInDepth02FirstTasteOfMVVM.vue'
import WPFMVVMInDepth03HookingUpViewsAndViewModelsInMVVM from './components/wpf/WPFMVVMInDepth03HookingUpViewsAndViewModelsInMVVM.vue'
import WPFMVVMInDepth04ViewViewModelCommunicationInWPF from './components/wpf/WPFMVVMInDepth04ViewViewModelCommunicationInWPF.vue'
import WPFMVVMInDepth05AppliedMVVMPart1HierarchiesAndNavigation from './components/wpf/WPFMVVMInDepth05AppliedMVVMPart1HierarchiesAndNavigation.vue'
import WPFMVVMInDepth06AppliedMVVMPart2ValidationAndDependencyInjection from './components/wpf/WPFMVVMInDepth06AppliedMVVMPart2ValidationAQndDependencyInjection.vue'

import Xamarin from './components/xamarin/Xamarin.vue'

import XamarinFormsCrossPlatform00CourseContents from './components/xamarin/XamarinFormsCrossPlatform00CourseContents.vue'
import XamarinFormsCrossPlatform01GettingStarted from './components/xamarin/XamarinFormsCrossPlatform01GettingStarted.vue'
import XamarinFormsCrossPlatform02XamlEssentials from './components/xamarin/XamarinFormsCrossPlatform02XamlEssentials.vue'
import XamarinFormsCrossPlatform03Layouts from './components/xamarin/XamarinFormsCrossPlatform03Layouts.vue'
import XamarinFormsCrossPlatform04Images from './components/xamarin/XamarinFormsCrossPlatform04Images.vue'
import XamarinFormsCrossPlatform05Lists from './components/xamarin/XamarinFormsCrossPlatform05Lists.vue'
import XamarinFormsCrossPlatform06Navigation from './components/xamarin/XamarinFormsCrossPlatform06Navigation.vue'
import XamarinFormsCrossPlatform07FormsAndSettingsPages from './components/xamarin/XamarinFormsCrossPlatform07FormsAndSettingsPages.vue'
import XamarinFormsCrossPlatform08DataAccess from './components/xamarin/XamarinFormsCrossPlatform08DataAccess.vue'
import XamarinFormsCrossPlatform09ModelViewViewModelArchitecturalPattern from './components/xamarin/XamarinFormsCrossPlatform09ModelViewViewModelArchitecturalPattern.vue'
import XamarinFormsCrossPlatform10BeyondTheBasics from './components/xamarin/XamarinFormsCrossPlatform10BeyondTheBasics.vue'

import SQLite from './components/sqlite/SQLite.vue'

import Editors from './components/editors/Editors.vue'
import VisualStudio from './components/editors/visual-studio/VisualStudio.vue'
import VisualStudioCode from './components/editors/visual-studio-code/VisualStudioCode.vue'
import Webstorm from './components/editors/webstorm/Webstorm.vue'

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
    path: '/vuejs',
    components: {
      default: Vuejs,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-00-course-contents',
    components: {
      default: VuejsEssentials00CourseContents,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-01-an-introduction-to-vue',
    components: {
      default: VuejsEssentials01AnIntroductionToVue,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-02-moving-on-with-vue-cli',
    components: {
      default: VuejsEssentials02MovingOnWithVueCLI,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-03-writing-effective-apps',
    components: {
      default: VuejsEssentials03WritingEffectiveApps,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-04-handling-state-with-vuex',
    components: {
      default: VuejsEssentials04HandlingStateWithVuex,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-05-authentication-in-vue-with-oauth2',
    components: {
      default: VuejsEssentials05AuthenticationinVuewithOAuth2,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-06-navigation-with-vue-router',
    components: {
      default: VuejsEssentials06NavigationwithVueRouter,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-07-design-of-vuex-modules',
    components: {
      default: VuejsEssentials07DesignOfVuexModules,
      'header-top': Header
    }
  },
  {
    path: '/vuejsessentials-08-handling-image-upload',
    components: {
      default: VuejsEssentials08HandlingImageUpload,
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
    path: '/wpf-databinding-in-depth-00-course-contents',
    components: {
      default: WPFDatabindingInDepth00CourseContents,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-01-course-overview',
    components: {
      default: WPFDatabindingInDepth01CourseOverview,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-02-databinding-overview',
    components: {
      default: WPFDatabindingInDepth02DataBindingOverview,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-03-data-sources',
    components: {
      default: WPFDatabindingInDepth03DataSources,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-04-binding-core-concepts',
    components: {
      default: WPFDatabindingInDepth04BindingCoreConcepts,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-05-unleashing-the-full-power-of-bindings',
    components: {
      default: WPFDatabindingInDepth05UnleashingTheFullPowerOfBindings,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-06-deep-dive-into-data-templates',
    components: {
      default: WPFDatabindingInDepth06DeepDiveIntoDataTemplates,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-07-design-time-data-binding',
    components: {
      default: WPFDatabindingInDepth07DesignTimeDatabinding,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-08-containers-and-collection-controls',
    components: {
      default: WPFDatabindingInDepth08ContainersAndCollectionsControls,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-09-data-input-validation',
    components: {
      default: WPFDatabindingInDepth09DataInputValidation,
      'header-top': Header
    }
  },
  {
    path: '/wpf-databinding-in-depth-09-data-input-validation',
    components: {
      default: WPFDatabindingInDepth09DataInputValidation,
      'header-top': Header
    }
  },

  {
    path: '/wpf-mvvm-in-depth-00-course-contents',
    components: {
      default: WPFMVVMInDepth00CourseContents,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-01-mvvm-pattern-fundamentals',
    components: {
      default: WPFMVVMInDepth01MVVMPatternFundamentals,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-02-first-taste-of-mvvm',
    components: {
      default: WPFMVVMInDepth02FirstTasteOfMVVM,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-03-hooking-up-views-and-viewmodels-in-mvvm',
    components: {
      default: WPFMVVMInDepth03HookingUpViewsAndViewModelsInMVVM,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-04-view-viewmodel-communication-in-wpf',
    components: {
      default: WPFMVVMInDepth04ViewViewModelCommunicationInWPF,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-05-applied-mvvm-part-1-hierarchies-and-navigation',
    components: {
      default: WPFMVVMInDepth05AppliedMVVMPart1HierarchiesAndNavigation,
      'header-top': Header
    }
  },
  {
    path: '/wpf-mvvm-in-depth-06-applied-mvvm-part-2-validation-and-dependency-injection',
    components: {
      default: WPFMVVMInDepth06AppliedMVVMPart2ValidationAndDependencyInjection,
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
    path: '/xamarin-forms-cross-platform-00-course-contents',
    components: {
      default: XamarinFormsCrossPlatform00CourseContents,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-01-getting-started',
    components: {
      default: XamarinFormsCrossPlatform01GettingStarted,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-02-xaml-essentials',
    components: {
      default: XamarinFormsCrossPlatform02XamlEssentials,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-03-layouts',
    components: {
      default: XamarinFormsCrossPlatform03Layouts,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-04-images',
    components: {
      default: XamarinFormsCrossPlatform04Images,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-05-lists',
    components: {
      default: XamarinFormsCrossPlatform05Lists,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-06-navigation',
    components: {
      default: XamarinFormsCrossPlatform06Navigation,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-07-forms-and-settings-pages',
    components: {
      default: XamarinFormsCrossPlatform07FormsAndSettingsPages,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-08-data-access',
    components: {
      default: XamarinFormsCrossPlatform08DataAccess,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-09-model-view-viewmodel-architectural-pattern',
    components: {
      default: XamarinFormsCrossPlatform09ModelViewViewModelArchitecturalPattern,
      'header-top': Header
    }
  },
  {
    path: '/xamarin-forms-cross-platform-10-beyond-the-basics',
    components: {
      default: XamarinFormsCrossPlatform10BeyondTheBasics,
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
  {
    path: '/editors/webstorm',
    components: {
      default: Webstorm,
      'header-top': Header
    }
  },

  {path: '/redirect-me', redirect: {name: 'home'}},
  {path: '*', redirect: '/'}
]
