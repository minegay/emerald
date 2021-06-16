import React from 'react';
import PropTypes from 'prop-types';

import { Panel, Button, Group, PanelHeaderBack, Avatar, PanelHeader, Header, Banner } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';
import Icon28CheckShieldOutline from '@vkontakte/icons/dist/28/check_shield_outline';
import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
// <Icon28DoneOutline fill="green"/> <Icon28CancelOutline fill="red"/>
const Missions = props => (
  <Panel id={props.id}>
  <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='morelist' />}>  
Задания
  </PanelHeader>  
    <Group header={<Header mode="secondary">Обычные</Header>}>
      <Banner
        before={<Avatar size={40}> {!props.account.clickMission[1] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Новичок"
        subheader={`${props.account.allclick}/1.500 Кликов. +4.000 EC`}
        actions={
          <React.Fragment>
          {!props.account.clickMission[1] ? <Button mode="commerce" onClick={()=>props.clickMission(1)}>Выполнить</Button>:"" }
          </React.Fragment>     
        }
      />
      <Banner
        before={<Avatar size={40}> {!props.account.clickMission[2] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Просто люблю кликать" 
        subheader={`${props.account.allclick}/5.000 Кликов. +7.500 EC`}
        actions={
          <React.Fragment>
          {!props.account.clickMission[2] ? <Button mode="commerce" onClick={()=>props.clickMission(2)}>Выполнить</Button>:"" }
          </React.Fragment> 
        }
      />
      <Banner
        before={<Avatar size={40}> {!props.account.clickMission[3] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Первая десяточка"
        subheader={`${props.account.allclick}/10.000 Кликов. +15.000 EC`}
        actions={
          <React.Fragment>
          {!props.account.clickMission[3] ? <Button mode="commerce" onClick={()=>props.clickMission(3)}>Выполнить</Button>:"" }
          </React.Fragment> 
        }
      />
      <Banner
        before={<Avatar size={40}> {!props.account.clickMission[4] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Пора бы отдохнуть..."
        subheader={`${props.account.allclick}/20.000 Кликов. +25.000 EC`}
        actions={
          <React.Fragment>
          {!props.account.clickMission[4] ? <Button mode="commerce" onClick={()=>props.clickMission(4)}>Выполнить</Button>:"" }
          </React.Fragment> 
        }
      />
      <Banner
        before={<Avatar size={40}> {!props.account.clickMission[5] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Бесконечность не предел"
        subheader={`${props.account.allclick}/50.000 Кликов. +100.000 EC`}
        actions={<React.Fragment>
          {!props.account.clickMission[5] ? <Button mode="commerce" onClick={()=>props.clickMission(5)}>Выполнить</Button>:"" }
          </React.Fragment> 
        }
      />

      <Banner
        before={<Avatar size={40}> {!props.account.clickMission[6] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Это конец?"
        subheader={`${props.account.allclick}/100.000 Кликов. +30 Эм.`}
        actions={
          <React.Fragment>
          {!props.account.clickMission[6] ? <Button mode="commerce" onClick={()=>props.clickMission(6)}>Выполнить</Button>:"" }
          </React.Fragment> 
        }
      /> <br/>




      <Banner
        before={<Avatar size={40}>  {!props.account.timeMission[1] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Первая минута"
        subheader={`${props.account.playedsec}/60 сек. +15 EC`}
        actions={
          <React.Fragment>
          {!props.account.timeMission[1] ?  <Button mode="commerce" onClick={()=>props.timeMission(1)}>Выполнить</Button> :""}
          </React.Fragment>
        }
      />

      <Banner
        before={<Avatar size={40}> {!props.account.timeMission[2] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="По пути в топ..."
        subheader={`${parseFloat(props.account.playedsec/60).toFixed(1)}/45 мин. +150 EC`}
        actions={
          <React.Fragment>
          {!props.account.timeMission[2] ?  <Button mode="commerce" onClick={()=>props.timeMission(2)}>Выполнить</Button> :""}
          </React.Fragment>
        }
      />

      <Banner
        before={<Avatar size={40}> {!props.account.timeMission[3] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Чуть больше минуты"
        subheader={`${parseFloat(props.account.playedsec/60).toFixed(1)}/60 мин. +200 EC`}
        actions={
          <React.Fragment>
          {!props.account.timeMission[3] ?  <Button mode="commerce" onClick={()=>props.timeMission(3)}>Выполнить</Button> :""}
          </React.Fragment>
        }
      />

      <Banner
        before={<Avatar size={40}> {!props.account.timeMission[4] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="60... и ещё 60.. и ещё..."
        subheader={`${parseFloat(props.account.playedsec/3600).toFixed(1)}/3 часа +1.000 EC`}
        actions={
          <React.Fragment>
          {!props.account.timeMission[4] ?  <Button mode="commerce" onClick={()=>props.timeMission(4)}>Выполнить</Button> :""}
          </React.Fragment>
        }
      />

      <Banner
        before={<Avatar size={40}> {!props.account.timeMission[5] ? <Icon28CancelOutline fill="red"/> :<Icon28DoneOutline fill="green"/>} </Avatar> }
        header="Лучшие сутки"
        subheader={`${parseFloat(props.account.playedsec/3600).toFixed(1)}/24 часа +10.000 EC`}
        actions={
          <React.Fragment>
          {!props.account.timeMission[5] ?  <Button mode="commerce" onClick={()=>props.timeMission(5)}>Выполнить</Button> :""}
          </React.Fragment>
        }
      />

</Group>

{/* <Group header={<Header mode="secondary">VIP</Header>}>
      <Banner
        before={<Avatar size={40}> <Icon28CheckShieldOutline /> </Avatar> }

        header="Тут будут VIP задания"
        subheader={`Но VIP ещё в разработке =(`}
      />

</Group> */}
  </Panel>
);

Missions.propTypes = {
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
export default Missions;
