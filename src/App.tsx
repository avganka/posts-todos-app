import {Navigate, Route, Routes} from 'react-router-dom';
import AlbumsPage from './pages/AlbumsPage';
import PostsPage from './pages/PostsPage';
import TodosPage from './pages/TodosPage';
import Header from './components/Header';

import {Box, Container} from '@chakra-ui/react';

function App() {
  return (
    <Box padding={4}>
      <Container maxWidth={'container.xl'} border={'1px'} px={6}>
        <Routes>
          <Route path='posts' element={<PostsPage />} />
          <Route path='tasks' element={<AlbumsPage />} />
          <Route path='albums' element={<TodosPage />} />
          <Route path='*' element={<Navigate to='/posts' replace />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
