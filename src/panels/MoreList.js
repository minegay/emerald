import React from 'react';
import PropTypes from 'prop-types';

import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import { Panel,CardGrid,SimpleCell,CardScroll, Button,Div,Card, Group, PanelHeaderBack, Avatar, PanelHeader, Header, Banner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Icon24Privacy from '@vkontakte/icons/dist/24/privacy';
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';
import Icon24UserAdd from '@vkontakte/icons/dist/24/user_add';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
import Icon28CubeBoxOutline from '@vkontakte/icons/dist/28/cube_box_outline';
import Icon24Game from '@vkontakte/icons/dist/24/game';
import { Icon28WalletOutline,Icon28SettingsOutline } from '@vkontakte/icons';
// import { Icon28SettingsOutline } from '@vkontakte/icons';
// const osName = platform();
import Icon24ChevronCompactRight from '@vkontakte/icons/dist/24/chevron_compact_right';
import "../assets/css/morelist.css"
const MoreList = props => (
  <Panel id={props.id}>
    <PanelHeader class="headerShop" left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
    Другое
  </PanelHeader> 
  {/* <Div class="cards"> */}
  {/* <br/> */}
  {/* <CardGrid >
    <Card size="m" >
      <div class="outcard">
        <div style={{ height: 96 }} class="card">
          <span>Текст</span>
        </div>
      </div>
    </Card>
    <Card size="m">
      <div style={{ height: 96 }} />
    </Card>
  </CardGrid>
  <CardGrid>
    <Card size="m">
      <div style={{ height: 96 }} />
    </Card>
    <Card size="m">
      <div style={{ height: 96 }} />
    </Card>
  </CardGrid>
  <CardGrid>
    <Card size="m">
      <div style={{ height: 96 }} />
    </Card>
    <Card size="m">
      <div style={{ height: 96 }} />
    </Card>
  </CardGrid> */}
        {/* </Div>    */}
    
    <Group header={<Header mode="secondary">Бонусы</Header>}>
    {/* <SimpleCell before={<Icon28CameraOutline fill="white"/>} after={<Icon24ChevronCompactRight />} description="Команда ВКонтакте">Игорь Фёдоров</SimpleCell> */}
    <div class="NowAva">
      <Banner before={<Avatar size={40}> <Icon28CameraOutline fill="white"/> </Avatar> }
        header="Бонусная реклама"
        subheader={`Вы получите бонус после просмотра.`}
        onClick={props.getADBonus}
      />
      <Banner before={<Avatar size={40}> <Icon24UserAdd fill="white"/> </Avatar> }
        header="Бонус за подписку"
        subheader={`Вы получите бонус, если подпишитесь на группу.`}
        onClick={props.getGroupBonus}
      />
      <Banner before={<Avatar size={40}> <Icon24Replay fill="white"/> </Avatar> }
        header="Ежедневный бонус"
        subheader={`Каждые 24 часа вы можете получить бонус.`}
        onClick={props.getDailyBonus}
      />
      <Banner
        before={<Avatar size={40}> <Icon28ListCheckOutline fill="white"/> </Avatar> }
        header="Задания"
        subheader={`Выполняй задания и получай коины.`}
        onClick={props.go} data-to="missions"
        asideMode="expand"
        // actions={onClick={props.go} data-to="missions"}
      />
      </div>

</Group>
<Group header={<Header mode="secondary">Другое</Header>}>
<div class="NowAva">
      <Banner
        before={<Avatar size={40}> <Icon28CubeBoxOutline fill="white"/> </Avatar> }
        header="Сундуки"
        subheader={`Открой сундук и получи большую награду (возможно)`}
        asideMode="expand"
        onClick={props.go} data-to="chests"
      />
      <Banner
        before={<Avatar size={40}> <Icon28WalletOutline fill="white"/> </Avatar> }
        header="Перевод"
        subheader={`Переведи коины другому игроку`}
        asideMode="expand"
        onClick={()=>props.goTransfer()}  
      />
      <Banner
        before={<Avatar size={40}> <Icon28MoneyCircleOutline fill="white"/> </Avatar> }
        header="Промокод"
        subheader={`Вводи промокоды и становись богатым.`}
        asideMode="expand"
        onClick={()=>props.goPromo()}
      />

      <Banner
        before={<Avatar size={40}> <Icon24Game fill="white"/> </Avatar> }
        header="Игры"
        subheader={`Игрулечки`}
        onClick={props.go} data-to="gameslist"
        asideMode="expand"
      />

      {props.api_access ? <Banner
        before={<Avatar size={40}> <Icon28SettingsOutline fill="white"/> </Avatar> }
        header="API"
        subheader={`Генерация токена`}
        onClick={props.modal} data-to="generateToken"
        asideMode="expand"
      /> : ""}

      
      </div>
</Group>
  </Panel>
);

MoreList.propTypes = {
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
export default MoreList;