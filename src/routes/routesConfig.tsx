import AuthoriazationPage from '../containers/AuthorizationPage/';
import ChatPage from '../containers/ChatPage/ChatPage';

const routesConfig = [
    {
        path: '/',
        element: <AuthoriazationPage />,
    },
    {
        path: '/chat',
        element: <ChatPage />,
    },
];

export default routesConfig;