import React from 'react';
import PropTypes from 'prop-types';

import { Panel,CardGrid,SimpleCell,CardScroll, Button,Div,Card, Group, PanelHeaderBack, Avatar, PanelHeader, Header, Banner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
// import "../assets/css/roulette.css"
import WHEEL from "../img/round.png"
const Roulette = props => (
  <Panel id={props.id}>
    <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
    Рулетка
  </PanelHeader> 
 {/* <img src={WHEEL} className="wheel"/> */}
  </Panel>
  
);

Roulette.propTypes = {
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
export default Roulette;