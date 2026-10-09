import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { JournalPage } from "@/pages/JournalPage";
import { ArticleDetailPage } from "@/pages/ArticleDetailPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import { LightboxProvider } from "@/context/LightboxContext";
import { ImageLightbox } from "@/components/lightbox/ImageLightbox";

export function App() {
  return (
    <BrowserRouter>
      <LightboxProvider>
        <ImageLightbox />
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="journal/:slug" element={<ArticleDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </LightboxProvider>
    </BrowserRouter>
  );
}

export default App;
