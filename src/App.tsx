import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PopularPage from "./pages/PopularPage";
import TopRatedPage from "./pages/TopRatedPage";
import SearchDetail from "./pages/SearchDetail";
import MovieDetail from "./pages/MovieDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/LoginPage";
import Watchlist from "./pages/WatchList";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/popular",
          element: <PopularPage />,
        },
        {
          path: "/topRated",
          element: <TopRatedPage />,
        },
        {
          path: "/serachDetail/:input",
          element: <SearchDetail />,
        },
        {
          path: "/movieDetail/:type/:id",
          element: <MovieDetail />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/watchlist",
          element: <Watchlist />,
        },
      ],
    },
  ],
  {
    basename: "/MovieDatabase",
  },
);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
