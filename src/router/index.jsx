import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import AboutUs from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Services from "../pages/Services.jsx";
import Preference from "../pages/Formulaire_Preference.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layouts/layout.jsx";
import CategoryPage from "../pages/CategoryPage.jsx"; 
import LocationPage from "../pages/LocationPage.jsx"; 
import SiteDetails from "../pages/SiteDetails.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/AboutUs',
        element: <AboutUs />
      },
      {
        path: '/Contact',
        element: <Contact />
      },
      {
        path: '/Services',
        element: <Services />
      },
      {
        path: '/preferences',
        element: <Preference />
      },
      {
        path: '/category/:category',
        element: <CategoryPage />
      },
      {
        path: '/location/:location',
        element: <LocationPage />
      },
      {
        path: '/site-details/:siteId', // Add siteId as a URL parameter
        element: <SiteDetails />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
]);
