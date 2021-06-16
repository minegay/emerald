import React from 'react';
import PropTypes from 'prop-types';
import { Panel,Div, FixedLayout,HorizontalScroll,RichCell,Avatar, Separator,  PanelHeaderBack, Tabs,  PanelHeader,  Header, TabsItem } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import "../assets/css/error.css"

const Error = props => (
    <Panel id={props.id}>
        <PanelHeader>  
            Произошла ошибка
        </PanelHeader> 
        <div class="center">
            <div class="svg"></div>
            <div class="discription">Код ошибки: <span>{props.error_code}</span><br/>Очистите кэш  и перезапустите приложение</div>
        </div>
    </Panel>
);

Error.propTypes = {
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
export default Error;
