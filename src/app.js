import Header from './components/header.js';
import Component from './core/component.js';
import createPages from './pages/index.js';
import Router from './routes/router.js';

export default class App extends Component {
  _template() {
    return `
      <div>
        <header data-component="header"></header>
        <main data-component="app"></main>
        <footer>tech lab</footer>
      </div>
      `;
  }

  _componentDidUpdate() {
    const $header = this._$target.querySelector('[data-component="header"]');
    new Header($header);
    const $app = this._$target.querySelector('[data-component="app"]');
    const pages = createPages($app);

    const router = new Router($app);
    router
      .addRoute('/', pages.home)
      .addRoute('/tech', pages.tech)
      .addRoute('/tech/:id', pages.detail)
      .start();
  }
}
