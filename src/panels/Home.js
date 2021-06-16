import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';
import { Icon28Menu } from '@vkontakte/icons';
import "../assets/css/home.css"
import COIN from './COIN.png'
const Home = props => (
	<Panel id={props.id}>
		<PanelHeader left={<Div><Icon28Menu onClick={props.go} data-to="morelist" /></Div> }>Emerald Coin</PanelHeader>
		{/* <div className="snow"></div> */}
		<div className="balance">Баланс:</div>
		<div className="coins_sum">{parseFloat(props.account.ec).toFixed(4)} EC</div>
		<div className="score_sum">{parseFloat(props.account.es).toFixed(4)} ES</div>
		<div className="speed_title">
			<div className="subtitle_clicks">+ {parseFloat(props.account.click).toFixed(4)}/клик</div>
			<div className="subtitle_clicks">+ {parseFloat(props.account.mine).toFixed(4)}/сек</div>
		</div>
		{/* <Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
			<Div>
			<Banner
        		header="Больше интересных подкастов в каталоге"
        		subheader="Найдите интересующие именно Вас подкасты!"
        		asideMode="expand"
        		onClick={() => console.log('[Podcast banner] onClick')}
      		/>
			</Div>
		</Group> */}
		<div className="MainPage__navigation" >
  <div className="MainPage__navigation-item">
    <div className="MainPage__navigation-button MainPage__navigation-button--top" onClick={props.go} data-to="top">
      <div className="MainPage__star"></div>
    </div>
    <div className="MainPage__navigation-description">Топ</div>
  </div>
  <div className="MainPage__navigation-item" >
    <div className="MainPage__navigation-button MainPage__navigation-button--transfer" onClick={() => props.openMarket()}>
      <div className="MainPage__wallet"></div>
    </div>
    <div className="MainPage__navigation-description">Биржа</div>
  </div>
  <div className="MainPage__navigation-item">
    <div className="MainPage__navigation-button MainPage__navigation-button--shop"  onClick={props.go} data-to="shop">
      <div className="MainPage__bag"></div>
    </div>
    <div className="MainPage__navigation-description">Магазин</div>
  </div>
</div>
		
		<FixedLayout vertical="bottom">
          	<Div id="coinWraper">
			
       		<img src={COIN} alt="coin.png" onClick={props.click} className='ClckBut' />
     		</Div>
        </FixedLayout>
	</Panel>
);

Home.propTypes = {
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

export default Home;
