import TechBlogPage from './tech-blog-page.js';
import TechDetailPage from './tech-detail-page.js';

export default (app) => {
  const home = () => new TechBlogPage(app);
  const tech = () => new TechBlogPage(app);
  const detail = () => new TechDetailPage(app);

  return {
    home,
    tech,
    detail,
  };
};
