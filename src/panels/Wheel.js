import React from 'react';
import PropTypes from 'prop-types';
import { Panel,Div, Button, Group,SimpleCell,HorizontalScroll ,Cell, Card,  PanelHeaderBack, Tabs,  PanelHeader,  Header, TabsItem, Banner } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import WHEEL from "../img/round.png"
import BALL from "../img/ball.png"
import "../assets/css/wheel.css"
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';

const red = [3, 12, 7, 18, 9, 14, 1, 16, 5, 23, 30, 36, 27, 34, 25, 21, 19, 32];

const item_class = {
	red: "type-red",
	black: "type-black",
	zero: "type-zero",
	even: "type-even",
	odd: "type-odd",
	fhalf: "type-fhalf",
	shalf: "type-shalf",
	num: "type-num"
}

const item_label = {
	red: "Красн",
	black: "Черн",
	zero: "0",
	even: "Четн",
	odd: "Нечет",
	fhalf: "1-18",
	shalf: "19-36"
}


function Bids(props) {
  let userBids = props.userBids;
  /*
  <div class="itemWrapper">
    <div class="item type-red">
      <div>Красн</div>
      </div>
    <div class="bet">100K</div>
  </div>
  */
  if (userBids) {
    //console.log("props: ", userBids);
  let arr = new Array();
  for (let i = 0; i < userBids.count; i++) {
    let res = ""
    if (props.win_num != -1 && props.isRollFinish) {
      //console.log(red.indexOf(props.win_num), props.win_num)
      if( userBids.content[i].bidOp == "red" && red.indexOf(props.win_num) != -1 ||
      userBids.content[i].bidOp == "black" && red.indexOf(props.win_num) == -1  && props.win_num != 0 || 
      userBids.content[i].bidOp == "even" && props.win_num % 2 == 0 ||
      userBids.content[i].bidOp == "odd" && props.win_num % 2 != 0 ||
      userBids.content[i].bidOp == "fhalf" &&  0 < props.win_num && props.win_num < 19 ||
      userBids.content[i].bidOp == "shalf" &&  18 < props.win_num && props.win_num < 37|| 
      userBids.content[i].bidOp == "num" &&  props.win_num == userBids.content[i].bidNum ||
      userBids.content[i].bidOp == "zero" && props.win_num == 0) {
        res = " win";
      } else if (props.isRollFinish) {
        res = " loose";
      }
    }
    arr.push(<div className="itemWrapper">
    <div className="itemBid">
      <div className={item_class[userBids.content[i].bidOp]}>{userBids.content[i].bidOp == "num" ? userBids.content[i].bidNum :  item_label[userBids.content[i].bidOp] }</div>
      </div>
    <div className={"bet" + res}>{userBids.content[i].money}</div>
  </div>); 
}
  return (   
      arr
  );
  } else {
    return (
      <div className="noBids">Ставок нет</div>
    );
  }
  
}

function Timer(props) {
  let arr = new Array();
  //console.log("passed= ", props.passed, "duration= ", props.duration)
  if (props.passed <= props.duration && props.duration != -1) {
    arr.push(
    <Banner className="timer" style={{'text-align': 'center'}} header={Math.floor((props.duration - props.passed)/1000)} />
    )
  } else if(props.duration == -1) {
    arr.push(
      <Banner className="timer" style={{'text-align': 'center'}} header="Сделай ставку первым!" />
      )
  } else {
    arr.push(
      <Banner className="timer" style={{'text-align': 'center'}} header="Рулетка крутится, удача мутится" />
      )
  }
   
  return (   
    arr
);
}


const Wheel = props => (
    <Panel id={props.id}>
        <PanelHeader className="headerShop" left={<PanelHeaderBack onClick={props.go} data-to='gameslist' />}>  
        Wheel
        </PanelHeader>
        <Cell className="balans"  before={<Icon28CoinsOutline fill="#ccc1bf"/>}  indicator={parseFloat(props.balans).toFixed(4) + " EC"}>Ваш баланс:</Cell>
        <Timer passed={new Date().getTime() - props.start_time} duration={props.duration}></Timer>
        <Div className="win_num"></Div>
    <img src={BALL} className="ball"/>
    <img src={WHEEL} className="wheel"/>


    <div class="itemWrapper2">
      <div class="item2">
        <div>Мои ставки</div>
      </div>
    <div className="bidsScroll" >
    <Bids userBids={props.userBids} win_num={props.win_num} isRollFinish={props.isRollFinish}></Bids>
    </div>
    </div>

    <Div className="table"> 
    <div className="tabelLabel" style={{textAlign:"center"}}>Стол ставок</div>
    <Div style={{display: 'flex'}}>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("red")} style={{background: "#bd3d31"}} className="buy_btn">Красное</Button>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("zero")} style={{background: "#198b1f"}} className="buy_btn">0</Button>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("black")} style={{background: "#130f0f"}} className="buy_btn">Черное</Button>
    </Div>
    <Div style={{display: 'flex'}}>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("even")} style={{background: "#5865d1"}} className="buy_btn">Четное</Button>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("odd")} style={{background: "#bec032"}} className="buy_btn">Нечетное</Button>
    </Div>
    <Div style={{display: 'flex'}}>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("fhalf")} style={{background: "#9832c0"}} className="buy_btn">1-18</Button>
    <Button size="xl" mode="overlay_secondary" onClick={()=> props.defBid("shalf")} style={{background: "#9832c0"}} className="buy_btn">19-36</Button>
    </Div>
    <Div style={{display: 'flex'}}>
    <Button size="xl" mode="overlay_secondary" onClick={props.modal} data-to="wheel" style={{background: "#40bbd1"}} className="buy_btn">Поставить на число</Button>
    </Div>
    </Div>
    </Panel>
    
);

Wheel.propTypes = {
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
export default Wheel;
