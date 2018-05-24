import Home from './components/Home.vue';
import Header from './components/Header.vue';
import WPF from './components/wpf/WPF.vue';
import WPFDatabindingInDepth00CourseContents from './components/wpf/WPFDatabindingInDepth00CourseContents.vue';
import WPFDatabindingInDepth01CourseOverview from './components/wpf/WPFDatabindingInDepth01CourseOverview.vue';
import WPFDatabindingInDepth02DataBindingOverview from './components/wpf/WPFDatabindingInDepth02DataBindingOverview.vue';

// I think this loads the route at application startup
const User = resolve => {
    require.ensure(['./components/user/User.vue'], () => {
        resolve(require('./components/user/User.vue'));
    }, 'user');
};

export const routes = [
    {
        path: '', name: 'home', components: {
            default: Home,
            'header-top': Header
        }
    },
    {
        path: '/user', components: {
            default: User,
            'header-top': Header
        }
    },
    {
        path: '/wpf', components: {
            default: WPF,
            'header-top': Header
        }
    },
    {
        path: '/wpf-databinding-in-depth-00-course-contents', components: {
            default: WPFDatabindingInDepth00CourseContents
        }
    },
    {
        path: '/wpf-databinding-in-depth-01-course-overview', components: {
            default: WPFDatabindingInDepth01CourseOverview
        }
    },
    {
        path: '/wpf-databinding-in-depth-02-databinding-overview', components: {
            default: WPFDatabindingInDepth02DataBindingOverview
        }
    },




    {path: '/redirect-me', redirect: {name: 'home'}},
    {path: '*', redirect: '/'}
];