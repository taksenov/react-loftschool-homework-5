import React from 'react';
import App from '../App';
import Auth from '../Auth';
import Home from '../Home';
import Private from '../Private';
import {mount, shallow} from 'enzyme';
import {MemoryRouter, Link, Route} from 'react-router-dom';

describe('Компонент App:', () => {
  describe('Редиректы:', () => {
    it('Приложение должно делать редирект с /private на /auth если state.isAuthorized === false', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/private']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Private)).toHaveLength(0);
      expect(wrapper.find(Auth)).toHaveLength(1);
    });
    it('Приложение должно делать редирект с рандомного url /randomadsfadf на / если state.isAuthorized === false', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/randomadsfadf']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(Home)).toHaveLength(1);
    });
  });
  describe('Методы класса:', () => {
    describe('render:', () => {
      describe('jsx:', () => {
        describe('Содержит ссылку на:', () => {
          const wrapper = mount(
            <MemoryRouter>
              <App />
            </MemoryRouter>
          );

          ['/private', '/auth', '/public', '/'].forEach(path => {
            it(path, () => {
              expect(
                wrapper.findWhere(el => el.type() === Link && el.props().to === path)
              ).toHaveLength(1);
            });
          });
        });
        const wrapper = shallow(<App />);

        it('Если state.isAuthorized === false, то отсутствует Route к /private', () => {
          wrapper.setState({isAuthorized: false});
          wrapper.update();
          expect(
            wrapper.findWhere(el => el.type() === Route && el.props().path === '/private')
          ).toHaveLength(0);
        });

        it('Если state.isAuthorized === true, то присутствует Route к /private', () => {
          wrapper.setState({isAuthorized: true});
          wrapper.update();
          expect(
            wrapper.findWhere(el => el.type() === Route && el.props().path === '/private')
          ).toHaveLength(1);
        });
      });
    });
  });
});
