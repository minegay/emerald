import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader,Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import BAN_IMG from '../assets/svg/stop.svg'
import "../assets/css/ban.css"
const Ban = props => (
  <Panel id={props.id}>
   <PanelHeader> Вас забанили :(</PanelHeader> 
    <div id="wraper">
    <img src={BAN_IMG}></img>
    <div class="reason_ban">Причина бана:<br/> {props.reason}</div>
    <div class="reason_ban">Вы заблокированы до:<br/> {props.time}</div>
    </div>
  </Panel>
);

Ban.propTypes = {
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
export default Ban;
