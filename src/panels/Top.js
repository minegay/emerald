import React from 'react';
import PropTypes from 'prop-types';
import { Panel,Div, FixedLayout,HorizontalScroll,RichCell,Avatar, Separator,  PanelHeaderBack, Tabs,  PanelHeader,  Header, TabsItem } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import "../assets/css/top.css"
import CAT from '../img/cat-_1.png'
const openLink = url=> {
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('target', '_blank')
	link.click()
}

const getECtop = props => {
    let content = [];
    for (let i = 0; i < props.top_ec.length; i++) {
        const item = props.top_ec[i];
        content.push(
            <RichCell
                before={<Avatar className="ava" size={48} src={item[2]}/>}
                caption={"Баланс: "+new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 4 }).format(parseFloat(item[1]).toFixed(4)).replace(",",".")}
                after={i+1}
                onClick={() => openLink(`https://vk.com/id${Number(item[0])}`)}
            ><div style={{ display: 'inline-block' }}>
                {item[3]}
            </div>{item[0]==="346472831" ? <div className="prefix_admin">Админ</div> : ""}
            </RichCell>
        )
    }
    return content;
};
const getMINEtop = props => {
    let content = [];
    for (let i = 0; i < props.top_mine.length; i++) {
        const item = props.top_mine[i];
        content.push(
            <RichCell
                before={<Avatar size={48} src={item[2]}/>}
                caption={"Скорость автодобычи: +"+parseFloat(item[1]).toFixed(4)+" EC/сек"}
                after={i+1}
                onClick={() => openLink(`https://vk.com/id${Number(item[0])}`)}
            ><div style={{ display: 'inline-block' }}>
                {item[3]}
            </div>{item[0]==="346472831" ? <div className="prefix_admin">Админ</div> : ""}
            </RichCell>
        )
    }
    return content;
};
const getCLICKtop = props => {
    let content = [];
    for (let i = 0; i < props.top_click.length; i++) {
        const item = props.top_click[i];
        content.push(
            <RichCell
                before={<Avatar size={48} src={item[2]}/>}
                caption={"Скорость клика: +"+parseFloat(item[1]).toFixed(4)+" EC/клик"}
                after={i+1}
                onClick={() => openLink(`https://vk.com/id${Number(item[0])}`)}
            ><div style={{ display: 'inline-block' }}>
                {item[3]}
            </div>{item[0]==="346472831" ? <div className="prefix_admin">Админ</div> : ""}
            </RichCell>
        )
    }
    return content;
};
const Top = props => (
    <Panel id={props.id}>
        <PanelHeader class="headerShop" left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
            Топ игроков
        </PanelHeader> 

        <Tabs>
            <TabsItem
                selected={props.tab === 'balance'}
                onClick={props.set}
                data-to='balance'
                class="tabIt"
            >Баланс</TabsItem>
            <TabsItem 
                class="tabIt"
                selected={props.tab === 'auto'}
                onClick={props.set}
                data-to='auto'
            >Авто</TabsItem>
           
            <TabsItem
                selected={props.tab === 'click'}
                onClick={props.set}
                data-to='click'
                class="tabIt"
            >Клик</TabsItem>
        </Tabs>

    {props.tab === 'balance' && getECtop(props)}
    {props.tab === 'auto' && getMINEtop(props)}
    {props.tab === 'click' && getCLICKtop(props)}    
    </Panel>
);

Top.propTypes = {
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
export default Top;
