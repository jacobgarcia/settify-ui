import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { keys, Icon } from '@credijusto/ui-components';
import MenuItem from './MenuItem';

import {
  StyledDropDown,
  DropDownContent,
  DropDownText,
  DropDownItems,
} from './styled';

export const config = {
  testId: 'navbar-dropdown-menu',
  labelTestId: 'navbar-dropdown-menu-label',
  menuTestId: 'navbar-dropdown-menu-menu',
};

const { ENTER, SPACE, ESC } = keys;

class DropdownMenu extends Component {
  state = {
    isOpen: false,
  };

  mainDiv = React.createRef();

  componentDidMount() {
    // Track clicks outside the dropdown
    document.addEventListener('mousedown', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
  }

  /**
   * Validates whether the user clicked outside and close the dropdown
   * if it is necessary
   */
  handleDocumentClick = (e) => {
    const { isOpen } = this.state;

    if (isOpen && !this.mainDiv.current.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  };

  /**
   * Toggles between the isOpen state
   */
  toggleOpen = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  /**
   * Validates which key has been pressed
   * if it is enter or space, the toggle is open
   * if it is scape the toggle is close
   */
  onKeyDown = (e) => {
    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      this.toggleOpen();
    } else if (e.keyCode === ESC) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { isOpen } = this.state;
    const { text, icon, menuStartsFrom, items, isAccount } = this.props;

    return (
      <StyledDropDown
        isAccount={isAccount}
        data-testid={config.testId}
        tabIndex="0"
        role="button"
        onClick={this.toggleOpen}
        onKeyDown={this.onKeyDown}
      >
        <DropDownContent ref={this.mainDiv}>
          <Icon icon={icon} className="credijusto_navbar--dropdown-icon" />
          <DropDownText data-testid={config.labelTestId}>{text}</DropDownText>
          <Icon
            icon={`chevron-${isOpen ? 'up' : 'down'}`}
            className="credijusto_navbar--dropdown-toggle"
          />
          <DropDownItems
            isOpen={isOpen}
            menuStartsFrom={menuStartsFrom}
            data-testid={config.menuTestId}
            aria-hidden={!isOpen}
          >
            {items.map((menuItem) => (
              <MenuItem key={menuItem.id} {...menuItem} />
            ))}
          </DropDownItems>
        </DropDownContent>
      </StyledDropDown>
    );
  }
}

DropdownMenu.defaultProps = {
  className: '',
  items: [],
  menuStartsFrom: 'left',
  isAccount: false,
};

DropdownMenu.propTypes = {
  isAccount: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  menuStartsFrom: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};

export default DropdownMenu;
