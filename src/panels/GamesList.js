import React from 'react';
import PropTypes from 'prop-types';

import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import { Panel,CardGrid,SimpleCell,CardScroll, Button,Div,Card, Group, PanelHeaderBack, Avatar, PanelHeader, Header, Banner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Game from '@vkontakte/icons/dist/24/game';
// const osName = platform();
import Icon24ChevronCompactRight from '@vkontakte/icons/dist/24/chevron_compact_right';
import "../assets/css/gameslist.css"
import ROULETTE from "../assets/svg/roulette.svg"
import DICE from "../assets/svg/dices.svg"
import JACKPOT from "../assets/svg/jackpot.svg"
import VK from "../assets/svg/vk.svg"
const GamesList = props => (
  <Panel id={props.id}>
    <PanelHeader class="headerShop" left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
    Игры
  </PanelHeader> 
  <Group>
      <CardGrid>
        <Card size="m" id="roulette" onClick={()=> props.openWheel()}>
          <img src={ROULETTE}/>
          <div>Рулетка</div>
        </Card>
        <Card size="m" id="roulette" onClick={props.go} data-to="dice">
          <img src={DICE}/>
          <div className="gameLable">Кости</div>
        </Card>
      </CardGrid>
      {/* <CardGrid>
        <Card size="m" id="roulette" className="ribbon">
          <img src={JACKPOT}/>
           <div> <br/>
          <div className="label_vk_bot">Казино <img className="game_vk_bot" src={VK}/></div>
          </div> 
        </Card>
      </CardGrid> */}
      </Group>
  </Panel>
  
);

GamesList.propTypes = {
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
export default GamesList;