import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Group,  PanelHeaderBack, Cell,  PanelHeader,  Banner, Card,Div, Input } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import "../assets/css/dice.css"
import Icon28CoinsOutline from '@vkontakte/icons/dist/28/coins_outline';

const ANGLE = {
    1: {
      x: -10,
      y: -10,
      z: 0
    },
  
    2: {
      x: -10,
      y: 260,
      z: 0
    },
  
    3: {
      x: 80,
      y: 0,
      z: 10
    },
  
    4: {
      x: 260,
      y: 0,
      z: -10
    },
  
    5: {
      x: 260,
      y: 0,
      z: 80
    },
  
    6: {
      x: -10,
      y: 170,
      z: 90
    }
  };
  
  let dices = Array.prototype.slice.call(document.querySelectorAll(".cubic"));
var angleGenerator = (factor) => {
    let { x, y, z } = ANGLE[factor];
    return {
      x: x + 360*2,
      y: y + 360*2,
      z: z + 360*2
    };
  };
  
  let roll = (factors) => {
    let i = 0;
    dices = Array.prototype.slice.call(document.querySelectorAll(".cubic"));
    dices.forEach((dice) => {
      let factor = Math.floor(1 + Math.random() * 6);
      console.log(factor)
      let { x, y, z } = angleGenerator(factors[i]); 
      i += 1
  
      dice.style.cssText = `
              -webkit-transform: none;
                      transform: none;
          `;
  
      setTimeout(() => {
        // request render
        dice.style.cssText = `
                  -webkit-transition-duration: 1000ms;
                          transition-duration: 1000ms;
                  -webkit-transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
                          transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
              `;
      }, 10);
    });
  };

  //server ret: factors = [factor1, factor2]
  //on server ret: gg(factors)
 /* var gg= () =>{
    let factors = [1, 2]
      roll(factors);

  }*/
const Dice = props => (
    <Panel id={props.id}>
    <Banner id="empty" className={props.start_roll && roll(props.factors)}/>
    <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='gameslist' />}>  
        Кости
    </PanelHeader> 
    <Cell className="balans"  before={<Icon28CoinsOutline fill="#ccc1bf"/>}  indicator={parseFloat(props.balans).toFixed(4) + " EC"}>Ваш баланс:</Cell>
    <div className="PanelDice">
    <div className="userScore">{props.factors[0] + props.factors[1]}</div>
        <div className="dice-wrapper">
    <div className="cubic">
        <div className="front">
            <span></span> 
        </div>
        <div className="right">
            <span></span>
            <span></span>
        </div>
        <div className="bottom">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="top">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="left">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="back">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> 
    </div>
    <div className="cubic">
        <div className="front">
            <span></span> 
        </div>
        <div className="right">
            <span></span>
            <span></span>
        </div>
        <div className="bottom">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="top">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="left">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="back">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> 
    </div>
</div>
    
    </div>
<Div><Input id="dice_bid_summ" type="number" placeholder="Сумма ставки"/></Div>
<Div> {props.userBid.coins && <Cell className={"userBid" + " " + props.userRes}
    size="l"
    description={props.userBid.coins + " EC"}
    asideContent={props.userBid.option}>
    Ваша ставка
</Cell>}</Div>
<Div className="options" style={{display: 'flex'}}>
    <Button size="l" onClick={props.reCheck} data-to="fBid" stretched mode={props.fBid} style={{ marginRight: 8 }}>{"< 7 (x2.3)"}</Button>
    <Button size="l" onClick={props.reCheck} data-to="sBid" stretched mode={props.sBid} style={{ marginRight: 8 }}>{"= 7 (x5.8)"}</Button>
    <Button size="l" onClick={props.reCheck} data-to="tBid" stretched mode={props.tBid}>{"> 7 (x2.3)"}</Button>
</Div>
<Div><Button className="bid_btn" size="xl" mode="overlay_secondary" onClick={()=> props.diceClick(document.getElementById("dice_bid_summ").value)}>Поставить</Button></Div>
  </Panel>
);

Dice.propTypes = {
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
export default Dice;
