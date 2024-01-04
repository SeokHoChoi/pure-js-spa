import { get } from '../api/mockApi.js';
import Component from '../core/component.js';

export default class TechDetailPage extends Component {
  _setupInitialState() {
    const id = window.location.href.split('/tech/')[1];

    // 웹 브라우저의 현재 위치를 기준으로 리소스를 찾기에 상대 경로를 입력하면 안됩니다.
    get(`/src/data/mockDataDetail${id}.json`).then((data) => {
      this._setState(data);
    });
  }

  _template() {
    const tech = this._$state;

    return `
      <div>
        <img src=${tech.src} alt="${tech.alt}" />
        <div>
          <h2>${tech.title}</h2>
          <p>${tech.desc}</p>
          <time datetime=${tech.date}>${tech.date.replace(/-/g, '. ')}</time>
        </div>
      </div>
    `;
  }
}
