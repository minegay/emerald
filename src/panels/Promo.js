import React from 'react';
import PropTypes from 'prop-types';
import {Panel,Div,Title, Text,Group,RichCell,Avatar, Cell,Banner,  PanelHeaderBack,  PanelHeader,  Header, Input, Button } from '@vkontakte/vkui';
import { Icon28TagOutline } from '@vkontakte/icons';
import { Icon28DeleteOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

function UserPromo(props) {
  let content = []; 
  let promo = props.userPromo;
  for(let i in promo) {
    content.push(<RichCell
              style = {{borderBottom: i < promo.length - 1 ? "1px solid gray":"", marginTop: i != 0 ? 16 : 0}}
              before={<Icon28TagOutline/>}
              text={
              <Text weight="medium" style={{ marginBottom: 10 }}>
                {"Сумма: " + promo[i].sum + " " + promo[i].value} <br/>
                {"Активаций: " + promo[i].count + "/" + promo[i].max_count } <br/>  
                {"Дата создания: " + "01.01.2021"}
              </Text>
              }
              after={<Icon28DeleteOutline onClick={() => props.deletePromo(promo[i].code)} style={{ marginTop: i == 0 ? 10: 25 }}/>}
          ><div style={{ display: 'inline-block' }}>
              <Title level="2" weight="heavy" style={{ marginBottom: 1, marginLeft: 5 }}>{promo[i].code}</Title>
          </div>
          </RichCell>)
  }
  
  if (promo.length == 0) {
    return <RichCell>Отсутствуют</RichCell>
  }
  return content;
}

function getDate() {
  let date = new Date();
  
}

const Promo = props => (
    <Panel id={props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>
            Промокод
        </PanelHeader>
        <Group>
            <Div><Input id="id_promoInput" placeholder="Промокод"/></Div>
            <Div><Button size="xl" stretched mode="secondary" onClick={() => props.activatePromo(document.getElementById("id_promoInput").value)}>Активировать</Button></Div>
            <Div><Button size="xl" stretched mode="secondary" onClick={props.modal} data-to="setPromo">Создать промокод</Button></Div>
        </Group>
        <Group header={<Header mode="secondary">Мои промокоды</Header>}>
            <UserPromo deletePromo={props.deletePromo} userPromo={props.userPromo}/>
        </Group>
        {props.snackbar}
    </Panel>
);

Promo.propTypes = {
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
export default Promo;
