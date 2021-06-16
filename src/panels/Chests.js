import React from 'react';
import PropTypes from 'prop-types';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28DiamondOutline from '@vkontakte/icons/dist/36/diamond_outline';
import { Panel, Button, Group,  PanelHeaderBack, Cell,  PanelHeader,  Header, List,Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28ComputerOutline from '@vkontakte/icons/dist/28/computer_outline';
import Icon28KeyOutline from '@vkontakte/icons/dist/28/key_outline';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
import "../assets/css/chests.css"
import COMMON from '../assets/svg/common_chest.svg'
import RARE from '../assets/svg/rare_chest.svg'
import EPIC from '../assets/svg/epic_chest.svg'
const Chests = props => (
  <Panel id={props.id}>
   <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
    Сундуки
  </PanelHeader> 
  <Group header={<Header mode="primary">У вас:</Header>}>
  <List>
                <Cell before={<Icon28KeyOutline fill="#ccc1bf"/>}  indicator={props.account.keys[0]}>Обычных ключей</Cell>
                <Cell before={<Icon28KeyOutline />} indicator={props.account.keys[1]}>Редких ключей</Cell>
                <Cell before={<Icon28KeyOutline fill="#bc7837"/>} indicator={props.account.keys[2]}>Эпических ключей</Cell>
  </List>
  </Group>
  <Group header={<Header mode="primary">Открыть кейсы:</Header>}>
    <Div>
  <div class="flex">
  <div class="item">
    <img src={COMMON} class="im" alt="За стеклом"/>
    <div class="label">Обычный сундук</div>
    <Button size="xl" mode="overlay_secondary" onClick={()=>props.openCase(0)} class="buy_btn">Открыть</Button>
  </div>
  <div class="item">
    <img src={RARE} class="im" alt="За стеклом"/>
    <div class="label">Редкий<br/> сундук</div>
    <Button size="xl" mode="overlay_secondary" onClick={()=>props.openCase(1)} class="buy_btn">Открыть</Button>
  </div>
  <div class="item">
    <img src={EPIC} class="im" alt="За стеклом"/>
    <div class="label">Эпический сундук</div>
    <Button size="xl" mode="overlay_secondary" onClick={()=>props.openCase(2)} class="buy_btn">Открыть</Button>
  </div>
  </div></Div>
  </Group>
  <Group header={<Header mode="primary">Возможные награды:</Header>}>
  <Div>Обычный сундук:</Div>
  <List>
        <Cell  before={<Icon28MoneyTransfer fill="#ccc1bf"/>}>до 8 000 EC</Cell>
        <Cell before={<Icon28DiamondOutline fill="#ccc1bf"/>}>до 3 ЭМ</Cell>
        <Cell  before={<Icon28KeyOutline fill="#ccc1bf"/>}>до 1 редкого ключа</Cell>
      </List>
  <Div>Редкий сундук:</Div>
  <List>
        <Cell  before={<Icon28MoneyTransfer />}>до 16 000 EC</Cell>
        <Cell before={<Icon28DiamondOutline />}>до 5 ЭМ</Cell>
        <Cell  before={<Icon28KeyOutline />}>до 2х любых ключей</Cell>
  </List>
  <Div>Эпический сундук:</Div>
  <List>
        <Cell  before={<Icon28MoneyTransfer fill="#bc7837"/>}>до 35 000 EC</Cell>
        <Cell before={<Icon28DiamondOutline fill="#bc7837"/>}>до 7 ЭМ</Cell>
        <Cell  before={<Icon28KeyOutline fill="#bc7837"/>}>до 3х любых ключей</Cell>
  </List>
  </Group>
  
  </Panel>
);

Chests.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
export default Chests;
