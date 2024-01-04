import Component from '../core/component.js';

export default class Router extends Component {
  _setupInitialState() {
    this._setState({
      routes: [],
    });
  }

  /**
   * 라우트를 추가합니다.
   * @param {string} fragment - 추가할 라우트의 URL
   * @param {function} component - 해당 라우트에 대한 컴포넌트 클래스 생성자 함수
   */

  /**
   * 라우트를 추가합니다.
   * @param {string} path - 추가할 라우트의 URL 입니다.
   * @param {Function} callback - 해당 라우트에 대한 콜백 함수로, 특정 컴포넌트의 인스턴스를 생성합니다.
   * @returns {Router} - 현재 Router 인스턴스 입니다.
   */
  addRoute(path, callback) {
    const params = [];

    const parsedPath = path
      .replace(/:(\w+)/g, (match, paramName) => {
        params.push(paramName);
        return '([^/]+)';
      })
      .replace(/\//g, '\\/');

    this._$state.routes.push({
      testRegExp: new RegExp(`^${parsedPath}$`),
      callback,
      params,
    });

    return this;
  }

  /**
   * 특정 경로로 이동합니다.
   * @param {string} path - 이동할 경로 입니다.
   */
  navigate(path) {
    window.history.pushState(null, null, path);
    // 이동 후 교체할 인스턴스를 생성합니다.
    this.checkRoutes();
  }

  /**
   * 현재 웹 페이지의 경로를 확인하고, 해당하는 라우트의 컴포넌트를 렌더링합니다.
   * 라우트가 없는 경우, 아무 동작도 수행하지 않습니다.
   * @returns {void} - 이 메소드는 반환값이 없습니다.
   */
  checkRoutes() {
    const { pathname } = window.location;

    const currentRoute = this._$state.routes.find((route) => {
      const { testRegExp } = route;

      return testRegExp.test(pathname);
    });

    // 라우트가 없는 경우 (추후 404)
    if (!currentRoute) {
      return;
    }

    // 현재 라우트에 해당하는 컴포넌트 렌더링 (인스턴스 생성)
    currentRoute.callback();
  }

  /**
   * 페이지 로딩 시 초기 라우팅을 수행하고,
   * 클릭 이벤트에 대한 리스너를 등록합니다.
   * 클릭 이벤트가 'a[data-navigation]' 요소 또는 그 하위 요소에서 발생한 경우,
   * 해당 요소의 href 속성을 이용하여 이동합니다.
   * @returns {void} - 이 메소드는 반환값이 없습니다.
   */
  start() {
    // 초기 라우팅 체크
    this.checkRoutes();

    document.body.addEventListener('click', (e) => {
      // closest 메소드를 사용하여 가장 가까운 'a[data-navigation]' 상위 요소를 찾을 수 있습니다.
      const closestLink = e.target.closest('a[data-navigation]');

      if (closestLink) {
        e.preventDefault();
        this.navigate(closestLink.href);
      }
    });
  }
}
