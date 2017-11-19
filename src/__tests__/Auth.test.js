import React from 'react';
import Auth from '../Auth';
import {shallow} from 'enzyme';
import * as Api from '../AuthorizeApi';
import {MemoryRouter, Redirect} from 'react-router-dom';

jest.mock('../AuthorizeApi');

describe('Компонент Auth:', () => {
  describe('Методы класса:', () => {
    it('handleSubmit вызывает метод authorizeUser из модуля AuthorizeApi', () => {
      const mockAuthorizeUser = jest.fn().mockImplementation((e, p) => e === 'ee' && p === 'pp');
      Api.setMockFn(mockAuthorizeUser);

      const wrapper = shallow(<Auth />);
      wrapper.instance().handleSubmit();
      expect(mockAuthorizeUser).toBeCalled();
    });

    describe('render', () => {
      const wrapper = shallow(<Auth />);

      it('Присутствует input с name email', () => {
        expect(
          wrapper.findWhere(el => el.type() === 'input' && el.props().name === 'email')
        ).toHaveLength(1);
      });

      it('Присутствует input с name password', () => {
        expect(
          wrapper.findWhere(el => el.type() === 'input' && el.props().name === 'password')
        ).toHaveLength(1);
      });

      it('Присутствует button с onClick = handleSubmit', () => {
        expect(
          wrapper.findWhere(
            el => el.type() === 'button' && el.props().onClick === wrapper.instance().handleSubmit
          )
        ).toHaveLength(1);
      });

      it('Отсутствует p.error', () => {
        expect(wrapper.find('p.error')).toHaveLength(0);
      });

      it('Если ввести неправильный email, password и нажать button с handleSumbit — появится p.error с информацией о не правильном пароле или почте', () => {
        const emailInput = wrapper.findWhere(
          el => el.type() === 'input' && el.props().name === 'email'
        );
        const passwordInput = wrapper.findWhere(
          el => el.type() === 'input' && el.props().name === 'password'
        );
        const button = wrapper.findWhere(
          el => el.type() === 'button' && el.props().onClick === wrapper.instance().handleSubmit
        );
        emailInput.simulate('change', {target: {value: 'test', name: 'email'}});
        passwordInput.simulate('change', {target: {value: 'test', name: 'password'}});
        button.simulate('click');
        expect(wrapper.find('p.error')).toHaveLength(1);
      });

      it('Если state.isAuthorized === true возвращается Redirect на /', () => {
        const wrapper = shallow(<Auth />);

        wrapper.setState({isAuthorized: true});

        expect(
          wrapper.findWhere(el => el.type() === Redirect && el.props().to === '/')
        ).toHaveLength(1);
      });
    });
  });
});
