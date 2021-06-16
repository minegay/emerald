import React from 'react';
import PropTypes from 'prop-types';
import {PullToRefresh, Panel,Div, SimpleCell,Group,RichCell,Avatar, Cell,Banner,  PanelHeaderBack, Tabs,  PanelHeader,  Header, TabsItem, Input, Button } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import Icon28MoneySendOutline from '@vkontakte/icons/dist/28/money_send_outline';
import Icon28MoneyRequestOutline from '@vkontakte/icons/dist/28/money_request_outline';
import Icon28RefreshOutline from '@vkontakte/icons/dist/28/refresh_outline';
import Icon28DoorArrowLeftOutline from '@vkontakte/icons/dist/28/door_arrow_left_outline';
import Icon28DoorArrowRightOutline from '@vkontakte/icons/dist/28/door_arrow_right_outline';
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';
import Icon28UserIncomingOutline from '@vkontakte/icons/dist/28/user_incoming_outline';
import Icon28UserOutgoingOutline from '@vkontakte/icons/dist/28/user_outgoing_outline';

import { Icon28SearchOutline,Icon28MoneyCircleOutline } from '@vkontakte/icons';
import "../assets/css/market.css"
import VERIFIEED from "../assets/svg/verified.svg"
// const openLink = url=> {
// 	const link = document.createElement('a')
// 	link.href = url
// 	link.setAttribute('target', '_blank')
// 	link.click()
// }

function indexOfTrader(id, traders) {

  for (let i = 0; i < traders.length; i++) {
    if (traders[i].uid == id) {
      return i;
    }
  }
  return -1;
}

const buyCoins = props =>{
  let content = []; //= return
  content.push(
  <PullToRefresh onRefresh={() => props.marketUpdate() } isFetching={props.fetching}>
    <Group>
      <Div className="search">
        <Input id="traderID" placeholder="Введите ссылку/id продавца" />
        <Button stretched className="searchBtn" style={{marginLeft:"8px"}} onClick={() => props.searchTrader(document.getElementById("traderID").value)}><Icon28SearchOutline/></Button>
      </Div>
    </Group>
  </PullToRefresh> 
  )
  if (!props.searchID && props.searchID != -1) {
    for(let i = 0; i < props.update_data.traders.length; i++) {
      if (props.update_data.traders[i].state) {
        content.push(
          <SimpleCell 
            before={<Avatar size={48} src={props.update_data.traders[i].ava} />} 
            after={<Icon28MoneySendOutline />} 
            onClick={()=>props.buyCoins(i)}
            expandable={"true"}
            description={<span>{"10 000 EC за " + props.update_data.traders[i].price + "₽"}<br/> {"Баланс: " + props.update_data.traders[i].balans + "EC"}</span>}>
            {"" + props.update_data.traders[i].name} {props.update_data.traders[i].verified && <img src={VERIFIEED} className="verifiedIMG"/>}
          </SimpleCell>
          
        ); 
      }
    }
  } else if (props.searchID != -1) {
    let i = indexOfTrader(props.searchID, props.update_data.traders)
    content.push(
      <SimpleCell 
        before={<Avatar size={48} src={props.update_data.traders[i].ava} />} 
        after={<Icon28MoneySendOutline />} 
        onClick={()=>props.buyCoins(1111111)}
        expandable={"true"}
        description={<span>{"10 000 EC за" + props.update_data.traders[i].price + "₽"}<br/> {"Баланс: " + props.update_data.traders[i].balans + "EC"}</span>}>
        {"" + props.update_data.traders[i].name} {props.update_data.traders[i].verified && <img src={VERIFIEED} className="verifiedIMG"/>}
      </SimpleCell>
      
    );
  }

  // content.push(
  //   <Banner
  //       before={<Avatar size={48} src="https://sun1-89.userapi.com/impg/WBvScxxz06ij1T04ClUJnMDKY-OYHVbExF6azA/3hcJvKrBQmQ.jpg?size=50x0&quality=96&crop=561,0,718,718&sign=9c73c43254a376cfa571bc2f692fea1e&c_uniq_tag=2ZtMKNcAWAs8BMAVcb6EEnMvchEiLDKm-RUkKYGCqFg&ava=1" />}
  //       header="Игорь Фёдоров"
  //       subheader={<span>10 000 EC за 1₽<br/>Баланс: 100000 EC</span>}
  //       asideMode="expand"
  //       onClick={console.log(2)}
  //       // actions={<Button>Подробнее</Button>}
  //     />
    
  // );
  return content;
}


const sellCoins = props =>{
  let content = [];
  let id = indexOfTrader(props.update_data.id, props.update_data.traders)
  console.log(id)
  content.push(
    <Group >
      <PullToRefresh onRefresh={() => props.marketUpdate() } isFetching={props.fetching}>
      <Group header={<Header mode="secondary">Цена за 10 000 EC:</Header>}>
        <Div><Input type="number" defaultValue={props.update_data.traders[id].price} id="coin_cost_id"/></Div>
      </Group>
      <Div><Button size="xl" before={<Icon28MoneyRequestOutline/>} stretched mode="overlay_secondary">{"Приблизительный доход:" + (props.update_data.traders[id].price*props.update_data.traders[id].balans/10000).toFixed(2) + "₽"}</Button></Div>
      <Div><Button size="xl" stretched before={<Icon28RefreshOutline/>} mode="commerce"  onClick={() => props.costUpdate(document.getElementById("coin_cost_id").value)} >Обновить цену</Button></Div>
      </PullToRefresh>
      {/* <Div>Участие на бирже:</Div> */}
      <Group header={<Header mode="secondary">Участие на бирже: <span style={{color:"white"}}>{props.update_data.traders[id].state ? "вы торгуете!" : "вы не торгуете!"}</span></Header>}>
      <Div style={{display:"flex"}}>
      <Button size="xl" stretched before={<Icon28DoorArrowLeftOutline/>} disabled={props.update_data.traders[id].state} style={{marginRight:8}} mode="commerce" onClick={() => props.marketStateChange(true)}>Зайти на биржу</Button>
      <Button size="xl" stretched before={<Icon28DoorArrowRightOutline/>} disabled={!props.update_data.traders[id].state} mode="destructive" onClick={() => props.marketStateChange(false)}>Уйти с биржи</Button>
      </Div>
      </Group>
      
      </Group>

  );
  return content;
}

function HistoryCells(props) {
  //console.log(props.history[0])
  let content = [];
  let opetation_str = ["", "Продано", "Куплено", "Заказана выплата на", "Отклонена выплата на", "Подтверждена выплата на","Баланс пополнен на"]
  for (let i = props.history.length - 1; i >= 0; i--) {
    let op_code = props.history[i].operation
    let discription = op_code < 3 ? props.history[i].sum + " EC за "+ props.history[i].sum*props.history[i].price/10000 + " ₽" : props.history[i].sum + " ₽";
    content.push(
      <SimpleCell 
      before={op_code < 3 ? <Avatar size={48} src={props.history[i].photo_url}/> :
      op_code == 3 ? <Avatar style={{background:"#4ab34c"}} size={48} ><Icon28MoneyRequestOutline fill="white"/> </Avatar> :
      op_code == 4 ? <Avatar style={{background:"#ff5d5b"}} size={48} ><Icon28MoneySendOutline fill="white"/> </Avatar> :
      op_code == 6 ? <Avatar style={{background:"#4ab34c"}} size={48} ><Icon28MoneyCircleOutline fill="white"/> </Avatar> :
      op_code == 5 ? <Avatar style={{background:"#4ab34c"}} size={48} ><Icon28MoneySendOutline fill="white"/> </Avatar> : null} 
      after={op_code == 1 ? <Icon28UserOutgoingOutline/> : op_code == 2 ? <Icon28UserIncomingOutline/> : null}
      description={props.history[i].time + " " + opetation_str[op_code] + " " + discription}>
      { op_code < 3 ? props.history[i].name :
        op_code == 6 ? "+"+props.history[i].sum+ " ₽" :
        op_code == 4 ? "+"+props.history[i].sum+ " ₽" :
        op_code == 5 ? "Выплата на "+props.history[i].sum+" ₽ подтверждена" :
        op_code == 3 ? "-" + props.history[i].sum + " ₽" : null}
  </SimpleCell>
    );
  }

  if (props.history.length == 0) {
    content.push(
      <Div>Опрации отсутствуют</Div>
    )
  }

  return content;
} 

const walletMarket = props =>{
  let content = [];
  let id = indexOfTrader(props.update_data.id, props.update_data.traders)
  //console.log(id)
  content.push(
    <Group >
      <PullToRefresh onRefresh={() => props.marketUpdate() } isFetching={props.fetching}>
      <SimpleCell 
          before={<Avatar size={48} ><Icon28CoinsOutline/> </Avatar>} 
          
          description={"Игровой баланс: " + props.update_data.traders[id].balans + " EC"}>
          {"Ваш баланс: " + props.update_data.traders[id].rub + "₽"}
      </SimpleCell>
      <Group header={<Header mode="secondary">Действия с балансом:</Header>}>
      <Div style={{display:"flex"}}>
      <Button size="xl" stretched onClick={props.depositMoney} before={<Icon28MoneySendOutline/>} style={{marginRight:8}} mode="commerce">Пополнить</Button>
      <Button size="xl" stretched onClick={props.modal} data-to="withdrawM" before={<Icon28MoneyRequestOutline/>} mode="destructive">Снять</Button>
      </Div>
      </Group>
      <Group header={<Header mode="secondary">QIWI кошелёк для выплат:</Header>}>
      <Div><Input type="number" defaultValue={props.update_data.traders[id].wallet} id="new_wallet_id"/></Div>
      <Div><Button size="xl" stretched mode="outline" onClick={() => props.saveWallet(document.getElementById("new_wallet_id").value)}>Сохранить номер</Button></Div>
      </Group>
      </PullToRefresh>
      <Group header={<Header mode="secondary">История операций:</Header>}>
        <HistoryCells history ={props.update_data.history} ></HistoryCells>
      </Group>
    </Group>
  )
  return content;
}

const Market = props => (
    <Panel id={props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
            Биржа
        </PanelHeader> 
          <PullToRefresh onRefresh={() => props.marketUpdate() } isFetching={props.fetching}>
        <Tabs>
        
            <TabsItem
                selected={props.tab === 'buyCoins'}
                onClick={props.set}
                data-to='buyCoins'
            >Купить</TabsItem>
            
            <TabsItem 
                selected={props.tab === 'sellCoins'}
                onClick={props.set}
                data-to='sellCoins'
            >Продать</TabsItem>
           
            <TabsItem
                selected={props.tab === 'walletMarket'}
                onClick={props.set}
                data-to='walletMarket'
            >Кошелёк</TabsItem>
            
        </Tabs>
        </PullToRefresh>
        {props.tab === 'buyCoins' && buyCoins(props)}
        {props.tab === 'sellCoins' && sellCoins(props)}
        {props.tab === 'walletMarket' && walletMarket(props)}  
            
    </Panel>
);

Market.propTypes = {
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
export default Market;
