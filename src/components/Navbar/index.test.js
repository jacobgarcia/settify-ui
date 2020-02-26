import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { config as dropdownConfig } from './DropdownMenu';

import Navbar, { config } from '.';

describe('<Navbar />', () => {
  test('Renders a <Navbar /> component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(getByTestId(config.testId)).toBeTruthy();
  });

  test('Renders a relative navbar', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar isRelative />
      </MemoryRouter>
    );

    expect(getByTestId(config.testId)).toBeTruthy();
  });

  test('Renders the username', () => {
    const username = 'test';

    const { getByText } = render(
      <MemoryRouter>
        <Navbar username={username} />
      </MemoryRouter>
    );

    expect(getByText(username)).toBeTruthy();
  });

  test('Renders the itemdropdown', () => {
    const menuItems = [
      {
        icon: 'bank',
        label: 'Crédito simple',
        to: '/loans',
        id: 'loans',
        color: '#00c1e8',
      },
      {
        icon: 'playlist-check',
        label: 'Líneas de Crédito',
        to: '/credit_lines',
        id: 'creditLines',
        color: '#e6821b',
      },
    ];

    const [bankItem, creditLinesItem] = menuItems;

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Navbar navItems={menuItems} />
      </MemoryRouter>
    );

    const dropdownLabel = getByTestId(dropdownConfig.labelTestId);
    expect(dropdownLabel.textContent).toBe(bankItem.label);
    expect(getByText(creditLinesItem.label)).toBeTruthy();

    // Change label item
    fireEvent.click(getByText(creditLinesItem.label));
    const updatedDropdownLabel = getByTestId(dropdownConfig.labelTestId);
    expect(updatedDropdownLabel.textContent).toBe(creditLinesItem.label);
  });

  test('Render the selected object according to the current route', () => {
    const menuItems = [
      {
        icon: 'bank',
        label: 'Crédito simple',
        to: '/loasn',
        id: 'loans',
        color: '#00c1e8',
      },
      {
        icon: 'playlist-check',
        label: 'Líneas de Crédito',
        to: '/credit_lines',
        id: 'creditLines',
        color: '#e6821b',
      },
    ];

    const [bankItem, creditLinesItem] = menuItems;
    const { getByText, getByTestId, queryAllByText } = render(
      <MemoryRouter initialEntries={[creditLinesItem.to]}>
        <Navbar navItems={menuItems} />
      </MemoryRouter>
    );

    const dropdownLabel = getByTestId(dropdownConfig.labelTestId);
    expect(dropdownLabel.textContent).toBe(creditLinesItem.label);
    expect(queryAllByText(creditLinesItem.label)).toBeTruthy();
    expect(getByText(bankItem.label)).toBeTruthy();
  });

  test('Render the selected object according to the current route in a child route', () => {
    const menuItems = [
      {
        icon: 'bank',
        label: 'Crédito simple',
        to: '/loasn',
        id: 'loans',
        color: '#00c1e8',
      },
      {
        icon: 'playlist-check',
        label: 'Líneas de Crédito',
        to: '/credit_lines',
        id: 'creditLines',
        color: '#e6821b',
      },
    ];

    const [bankItem, creditLinesItem] = menuItems;
    const { getByText, getByTestId, queryAllByText } = render(
      <MemoryRouter initialEntries={[`${creditLinesItem.to}/child`]}>
        <Navbar navItems={menuItems} />
      </MemoryRouter>
    );

    const dropdownLabel = getByTestId(dropdownConfig.labelTestId);
    expect(dropdownLabel.textContent).toBe(creditLinesItem.label);
    expect(queryAllByText(creditLinesItem.label)).toBeTruthy();
    expect(getByText(bankItem.label)).toBeTruthy();
  });
});
