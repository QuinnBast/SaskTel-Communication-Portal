import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import AuthButton from "../auth/authbutton"

export default class NavBar extends Component {
  state = { activeItem: 'TelPort' }

  render() {
    const { activeItem } = this.state

    return (
      <Menu attached inverted>
        <Menu.Item name='telPort' active={activeItem === 'TelPort'} />
            <AuthButton/>
      </Menu>
    )
  }
}