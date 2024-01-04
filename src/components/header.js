import Component from '../core/component.js';

export default class Header extends Component {
  _template() {
    return `
      <div>
        <h1>
          <a data-navigation href="/">tech blog</a>
        </h1>
        <nav>
          <a data-navigation href="/design">디자인</a>
          <a data-navigation href="/tech">개발</a>
        </nav>
      </div>
    `;
  }
}
