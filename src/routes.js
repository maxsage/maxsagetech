import Home from './components/Home.vue';
import Header from './components/Header.vue';
import WPF from './components/wpf/WPF.vue';
import WPFDatabindingInDepth00CourseContent from './components/wpf/WPFDatabindingInDepth00CourseContent.vue';

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
        path: '/wpf-databinding-in-depth-00-course-content', components: {
            default: WPFDatabindingInDepth00CourseContent
        }
    },


    {path: '/redirect-me', redirect: {name: 'home'}},
    {path: '*', redirect: '/'}
];