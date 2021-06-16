import React from 'react';
import PropTypes from 'prop-types';
import {PullToRefresh, Panel,Div, SimpleCell,Group,RichCell,Avatar, Cell,Banner,  PanelHeaderBack, Tabs,  PanelHeader,  Header, TabsItem, Input, Button } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
import { Icon24Linked,Icon28LinkCircleOutline } from '@vkontakte/icons';
import "../assets/css/transfer.css"
// const openLink = url=> {
// 	const link = document.createElement('a')
// 	link.href = url
// 	link.setAttribute('target', '_blank')
// 	link.click()
// }
const TransferDo = props =>{
    let content = []; 
    content.push(
        <Group>
            <Group header={<Header mode="secondary">ID пользователя или ссылка</Header>}>
				<Div><Input  id="transfer_id" onChange={props.idTransferChange} placeholder="https://vk.com/vladimir_pytin_molodec"/></Div>
			</Group>
            <Group header={<Header mode="secondary">Сумма для перевода</Header>}>
				<Div><Input type="number" id="transfer_sum" placeholder="0"/></Div>
			</Group>
            <Div><Button size="xl" stretched mode="secondary" before={<Icon28MoneyTransfer/>} onClick={()=>props.sendMoney(document.getElementById("transfer_id").value,document.getElementById("transfer_sum").value)}>Перевести</Button></Div>
            
            <Div><Button size="xl" stretched mode="secondary" before={<Icon28LinkCircleOutline/>} onClick={props.modal} data-to="hrefToPay">Ссылка на оплату</Button></Div>
			
        </Group>
    )
    return content;
}
function isInteger(num) {
    return Number.isInteger(num)
}
const TransferHistory = props =>{
    let content = []; 
    let sum=0;
    props.transfer_history.forEach(function(item, i, arr) {
        if (isInteger(parseFloat(item.sum))){
            sum = new Intl.NumberFormat('ru-RU').format(parseFloat(item.sum).toFixed(4)).replace(",",".")
        }else{
            sum = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 4 }).format(parseFloat(item.sum).toFixed(4)).replace(",",".")
        }
        if (item.operation===1){
            content.push (<SimpleCell 
                before={<Avatar size={48} src={item.photo} />} 
                description={<span><span className="withdrawalMoney">-{sum} EC</span><span className="dateTransfer">{item.time}</span></span>}>Перевод {item.name}
          </SimpleCell>)
        }else{
            content.push (<SimpleCell 
                before={<Avatar size={48} src={item.photo} />} 
                description={<span><span className="addMoney">+{sum} EC</span><span className="dateTransfer">{item.time}</span></span>}>Перевод от {item.name}
          </SimpleCell>)
        }
      
    })
          
//   content.push(</Group>)
  return content;
}




const Transfer = props => (
    <Panel id={props.id}>
        <PullToRefresh onRefresh={() => props.updateTransferHistory("fetching") } isFetching={props.fetching}>
        <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>  
            Перевод
        </PanelHeader>     
        <Tabs>
            
            <TabsItem
                selected={props.tab === 'TransferDo'}
                onClick={props.set}
                data-to='TransferDo'
            >Перевести</TabsItem>
            
            <TabsItem 
                selected={props.tab === 'TransferHistory'}
                onClick={props.set}
                data-to='TransferHistory'
            >История</TabsItem>
            
        </Tabs>
        </PullToRefresh>
        {props.tab === 'TransferDo' && TransferDo(props)}
        {props.tab === 'TransferHistory' && TransferHistory(props)} 
            
    </Panel>
);

Transfer.propTypes = {
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
export default Transfer;
