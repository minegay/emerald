import React from 'react';
import PropTypes from 'prop-types';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import { Panel, Tabs,TabsItem, Group,  PanelHeaderBack, Avatar,  PanelHeader,  Cell, Banner,Div } from '@vkontakte/vkui';
import Icon28KeyOutline from '@vkontakte/icons/dist/28/key_outline';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
import Icon28DiamondOutline from '@vkontakte/icons/dist/36/diamond_outline';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28ComputerOutline from '@vkontakte/icons/dist/28/computer_outline';

import "../assets/css/shop.css"

const clickShop = props =>{
  let content = []; 
  content.push(
    <Group>
<Banner
        before={<Avatar size={40}> <Icon28PrivacyOutline fill="#ccc1bf" /> </Avatar> }
        header="Дедовская мышка"
        subheader={`+0.0001/клик. • Цена: ${parseFloat(0.001*(Math.pow(1.8, props.account.click1+1))).toFixed(4)} EC `}//parseFloat().toFixed(4)
        onClick={()=>props.buyClickUpgrade(1)}
        />
       
        <Banner
        before={<Avatar size={40}> <Icon28PrivacyOutline fill="#ccc1bf" /> </Avatar> }
        header="Беспроводная мышка"
        subheader={`+0.0002/клик. • Цена: ${parseFloat(0.005*(Math.pow(1.8, props.account.click2+1))).toFixed(4)} EC `}
        onClick={()=>props.buyClickUpgrade(2)}
      />
        <Banner
        before={<Avatar size={40}> <Icon28PrivacyOutline fill="#ccc1bf" /> </Avatar> }
        header="Мышка из будущего"
        subheader={`+0.0010/клик. • Цена: ${parseFloat(0.0075*(Math.pow(1.8, props.account.click3+1))).toFixed(4)} EC `}
        onClick={()=>props.buyClickUpgrade(3)}
      />
        <Banner
        before={<Avatar size={40}> <Icon28PrivacyOutline fill="#ccc1bf" /> </Avatar> }
        onClick={()=>props.buyClickUpgrade(4)}
        header="Квантовая мышка"
        subheader={`+0.0500/клик. • Цена: 8 Эм.`}//=8+(1*props.account.click3)/2
      />
        <Banner
        before={<Avatar size={40}> <Icon28PrivacyOutline fill="#ccc1bf" /> </Avatar> }
        onClick={()=>props.buyClickUpgrade(5)}
        header="Магическая мышка"
        subheader={`+0.0700/клик. • Цена: 10  Эм.`}
      />
    </Group>
  )
  return content;
}
const autoClick = props =>{
  let content = []; 
  content.push(
    <Group>
      <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Старый ноутбук"
        subheader={`+0.0001/сек. • Цена: ${parseFloat(0.001*(Math.pow(1.8, props.account.mine1+1))).toFixed(4)} EC `}
        onClick={()=>props.buyAutoUpgrade(1)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Компьютер деда"
        subheader={`+0.0005/сек. • Цена: ${parseFloat(0.005*(Math.pow(1.8, props.account.mine2+1))).toFixed(4)} EC `}
        onClick={()=>props.buyAutoUpgrade(2)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Игровой компьютер"
        subheader={`+0.0010/сек. • Цена: ${parseFloat(0.0075*(Math.pow(1.8, props.account.mine3+1))).toFixed(4)} EC `}
        onClick={()=>props.buyAutoUpgrade(3)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Супер компьютер"
        subheader={`+0.0015/сек. • Цена: ${parseFloat(0.01*(Math.pow(1.8, props.account.mine4+1))).toFixed(4)} EC `}
        onClick={()=>props.buyAutoUpgrade(4)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Инопланетный компьютер"
        subheader={`+0.0025/сек. • Цена: ${parseFloat(0.025*(Math.pow(1.8, props.account.mine5+1))).toFixed(4)} EC `}
        onClick={()=>props.buyAutoUpgrade(5)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Компьютерная сеть"
        subheader={`+0.0050/сек. • Цена: ${parseFloat(0.045*(Math.pow(1.8, props.account.mine6+1))).toFixed(4)} EC `}
        onClick={()=>props.buyAutoUpgrade(6)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Компьютер Билла Гейтса"
        subheader={`+0.0075/сек. • Цена: ${parseFloat(0.75*(Math.pow(1.8, props.account.mine7+1))).toFixed(4)} EC`}
        onClick={()=>props.buyAutoUpgrade(7)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Майнеры"
        subheader={`+0.0500/сек. • Цена: 5 Эм. `}
        onClick={()=>props.buyAutoUpgrade(8)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28ComputerOutline fill="#ffbcff"/> </Avatar> }
        header="Майнинг-ферма"
        subheader={`+0.1200/сек. • Цена: 10 Эм. `}
        onClick={()=>props.buyAutoUpgrade(9)}
      />
    </Group>
  )
  return content;
}
const otherShop = props =>{
  let content = []; 
  content.push(
    <Group>
      <Banner
        before={<Avatar size={40}> <Icon28UserOutline fill="#ef4b4c"/> </Avatar> }
        header="Опыт"
        subheader={`+10 ES • Цена: 2 Эм. `}
        onClick={props.buyES}
      />
      <Banner
        before={<Avatar size={40}> <Icon28KeyOutline fill="#ccc1bf"/> </Avatar> }
        header="Обычный ключ"
        subheader={`+1 обычный ключ • Цена: 2 Эм. `}
        onClick={()=>props.buyKey(0)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28KeyOutline /> </Avatar> }
        header="Редкий ключ"
        subheader={`+1 редкий ключ • Цена: 4 Эм. `}
        onClick={()=>props.buyKey(1)}
      />
       <Banner
        before={<Avatar size={40}> <Icon28KeyOutline fill="#bc7837"/> </Avatar> }
        header="Эпический ключ"
        subheader={`+1 эпический ключ • Цена: 6 Эм. `}
        onClick={()=>props.buyKey(2)}
      />
    </Group>
  )
  return content;
}
const Shop = props => (
  <Panel id={props.id}>
   <PanelHeader class="headerShop" left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
Ускорители
  </PanelHeader> 
    <Tabs>
            <TabsItem
                selected={props.tab === 'clickShop'}
                onClick={props.set}
                data-to='clickShop'
            >Клик</TabsItem>
            
            <TabsItem 
                selected={props.tab === 'autoClick'}
                onClick={props.set}
                data-to='autoClick'
            >Автоматически</TabsItem>
           
            <TabsItem
                selected={props.tab === 'otherShop'}
                onClick={props.set}
                data-to='otherShop'
            >Другое</TabsItem>       
    </Tabs>
    <div class="subtitle"><small>У вас </small><span style={{color:"#CC9933"}}>{parseFloat(props.account.emeralds).toFixed(4)}</span><small> ЭМеральдов</small></div>
    
    {/* <Cell before={<Icon28DiamondOutline fill="#ccc1bf"/>}>У вас {parseFloat(props.account.emeralds).toFixed(4)} ЭМеральдов</Cell> */}
    
    {props.tab === 'clickShop' && clickShop(props)}
    {props.tab === 'autoClick' && autoClick(props)}
    {props.tab === 'otherShop' && otherShop(props)}  
  </Panel>
);

Shop.propTypes = {
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
export default Shop;
