import React from 'react'
import {Menu, Item, Separator, Submenu} from 'react-contexify'
// import 'react-contexify/dist/ReactContexify.min.css'

const onClick = () => console.log('event, props')

const EditMenu = () => (
  <Menu id="menu_id">
    <Submenu label="Add" arrow={<i className="fas fa-caret-right" />}>
      <Item onClick={onClick}>div</Item>
      <Item onClick={onClick}>p</Item>
      <Item onClick={onClick}>img</Item>
    </Submenu>
    <Item onClick={onClick}>Delete</Item>
    <Separator />
    <Item onClick={onClick}>Copy Style</Item>
  </Menu>
)

export default EditMenu
