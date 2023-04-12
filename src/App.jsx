import './styles/reset.css';
import './styles/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ConactPage';
import Header from './components/layout/Header';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import SinglePostPage from './pages/SinglePostPage';
import { useAuthContext } from './store/AuthProvider';
import NotAllowed from './pages/NotAllowed';
import Alert from './components/ui/Alert';
import { useSelector } from 'react-redux';

function App() {
  // App.jsx prideti dinamini route SinglePostPage
  const show = useSelector((state) => state.ui.show);
  const type = useSelector((state) => state.ui.type);
  const msg = useSelector((state) => state.ui.msg);

  const authCtx = useAuthContext();
  return (
    <div className="">
      <Header />
      {show && <Alert type={type}>{msg}</Alert>}

      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route
          path={'/login'}
          element={
            <>
              {!authCtx.isLoggedIn && <LoginPage />}
              {authCtx.isLoggedIn && <Navigate to="/posts" />}
            </>
          }
        />
        <Route path={'/contacts'} element={<ContactPage />} />
        <Route
          path={'/posts'}
          element={
            <>
              {authCtx.isLoggedIn && <PostsPage />}
              {!authCtx.isLoggedIn && <Navigate to="/not-allowed" />}
            </>
          }
        />
        <Route
          path={'/posts/:postId'}
          element={
            <>
              {authCtx.isLoggedIn && <SinglePostPage />}
              {!authCtx.isLoggedIn && <Navigate to="/not-allowed" />}
            </>
          }
        />
        <Route
          path={'/posts/new'}
          element={
            <>
              {authCtx.isLoggedIn && <NewPostPage />}
              {!authCtx.isLoggedIn && <Navigate to="/not-allowed" />}
            </>
          }
        />
        <Route path={'/not-allowed'} element={<NotAllowed />} />
      </Routes>
    </div>
  );
}
export default App;
