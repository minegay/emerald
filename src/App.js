import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import connect from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel,Avatar,Snackbar,Group,Header,Headline,SimpleCell,Counter,Banner,List,Cell,Textarea,Alert,Div,Button,Input,FormLayout,FormLayoutGroup,ModalPage,ModalRoot,ModalPageHeader} from '@vkontakte/vkui'
import Home from './panels/Home';
import bad from './bad.png';
import good from './good.png';
 
import Shop from './panels/Shop'
import GamesList from './panels/GamesList'
import Wheel from './panels/Wheel'
import Error from './panels/Error'
import Top from './panels/Top'
import Market from './panels/Market'
import Dice from './panels/Dice'
import Ban from './panels/Ban'
import MoreList from './panels/MoreList';
import Missions from './panels/Missions';
import Chests from './panels/Chests';
import Transfer from './panels/Transfer';
import Promo from './panels/Promo';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
// import Icon28KeyOutline from '@vkontakte/icons/dist/28/key_outline';
import Icon28DiamondOutline from '@vkontakte/icons/dist/36/diamond_outline';
// import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
// import { Icon28KeyOutline } from '@vkontakte/icons';
import { Icon24Linked,Icon28KeyOutline } from '@vkontakte/icons';
import { Icon16Cancel, Icon16Done } from '@vkontakte/icons';
import VERIFIEED from "./assets/svg/verified.svg"
import "./assets/css/top.css"
var socket = new WebSocket('wss://slavesapp.online:8443'); // СЮДА СЕРВЕР
var st = 0;
var gh = "";
var th=0;
var bidOp_s= {
	red: "красное",
	black: "черное",
	zero: "ноль",
	even: "четное",
	odd: "нечетное",
	fhalf: "1-18",
	shalf: "19-36",
	num: "число"
}
class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activePanel: 'home',   
			activeModal: null,
			UserInfo: null,
			activeTopTab :'balance',
			activeTopTab2: 'buyCoins',
			activeTopTab4: 'TransferDo',
			popout: null,
			error_code:0,
			idTranfer:0,
			sumTransfer:0,
			myBids: [],
			transfer_history:[],
			mult: 0,
			bidNum: -1, 
			bidOp: "",
			win_num: -1,
			userBids: {},
			start_timeWheel: 0,
			durationWheel: -1,
			isRollFinish: false,
			historyfetching:false,
			promo:"",
			fetchedUser: {
                id: 1,
                first_name: 'Никто'
			},
			top_ec:[],
			top_mine:[],
			top_click:[],
			fBid:"outline",
			sBid:"commerce",
			tBid:"outline",
			diceBid: {},
			dice_win: "",
			dice_factors:[],
			dice_start_roll: false,
			market_fetching: false,
			market_update_data: {
				traders: [{
					ava: "",
				}],
				history: [],
				me_is_celling: false,
				id: 0},
			market_searchID: 0,
			market_i: 0,
			sumRub: 0,
			activeTopTab3:"clickShop",
			api_access:false,
			snackbar: null,
			userPromo: [],
			account:{
				"keys":[0,0,0],
				"ec": 0.0000,
				"es":0.0000,
				"emeralds": 0.0000,
				"mine": 0,
				"click": 0.0000,
				"click1": 0,
				"click2": 0,
				"click3": 0,
				"click4": 0,
				"click5": 0,
				"mine1": 0,
				"mine2":0,
				"mine3": 0,
				"mine4": 0,
				"mine5":0,
				"mine6": 0,
				"mine7": 0,
				"mine8": 0,
				"mine9": 0,
				"mine10": 0,
				"reason": "",
				"ban": false,
				"ref": null,
				"transfers": [],
				"photo": '',
				"name":'',
				"online": false,
				"apikey": "api_rand",
				"admin": false,
				"containers": 0,
				"donepmiss1": 0,
				"donepmiss2": 0,
				"donepmiss3": 0,
				"donepmiss4": 0,
				"donepmiss5": 0,
				"donemiss1": 0,
				"donemiss2": 0,
				"donemiss3": 0,
				"donemiss4": 0,
				"donemiss5": 0,
				"donemiss6": 0,
				"playedsec": 0,
				"vip": false,
				"allclick": 0
		} 
		};
		// this. = this..bind(this)
		this.tab3 = this.tab3.bind(this)
		this.depositMoney = this.depositMoney.bind(this)
		this.withdrawMoney = this.withdrawMoney.bind(this)
		this.buyCoins = this.buyCoins.bind(this)
		this.reCheck = this.reCheck.bind(this);
		this.activatePromo = this.activatePromo.bind(this);
		this.promoChange = this.promoChange.bind(this);
		this.closePopout = this.closePopout.bind(this);
		this.go = this.go.bind(this);
		this.tab = this.tab.bind(this);
		this.tab2 = this.tab2.bind(this);
		this.tab4 = this.tab4.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.start = this.start.bind(this);
		this.wsSend = this.wsSend.bind(this);
		this.idChange = this.idChange.bind(this);
		this.sumChange = this.sumChange.bind(this);
		this.sendMoney = this.sendMoney.bind(this);
		this.defBid = this.defBid.bind(this);
		this.setBid = this.setBid.bind(this);
		this.openWheel = this.openWheel.bind(this);
		this.diceClick = this.diceClick.bind(this);
		this.searchTrader = this.searchTrader.bind(this)
		this.marketUpdate = this.marketUpdate.bind(this)
		this.buyRubChange = this.buyRubChange.bind(this)
		this.costUpdate = this.costUpdate.bind(this)
		this.saveWallet = this.saveWallet.bind(this)
		this.marketStateChange = this.marketStateChange.bind(this)
		this.marketBuyCoins = this.marketBuyCoins.bind(this)
		this.openMarket = this.openMarket.bind(this)
		this.goTransfer = this.goTransfer.bind(this)
		this.updateTransferHistory = this.updateTransferHistory.bind(this)
		this.generateToken = this.generateToken.bind(this)
		this.setPromo = this.setPromo.bind(this);
		this.openBase = this.openBase.bind(this);
		this.deletePromo = this.deletePromo.bind(this);
		this.goPromo = this.goPromo.bind(this);
	}
	wsSend = function(data) {
		if(!socket.readyState){
			setTimeout(function (){
				this.wsSend(data);
			},100);
		}else{
			socket.send(data);
		}
	};

	randomString(i) {
		var rnd = '';
		while (rnd.length < i) 
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, i);
	};
	start() {
		//Ожидание получения данных
		if (st) return;
		console.log(1);
		this.setState({ popout: <ScreenSpinner /> });
		//if (navigator.appVersion.toLowerCase().indexOf("windows") != -1) return;
		console.log(socket.readyState);
        socket.onopen = () => {
			console.log('ws connected');
			if (window.location.href.match(/#(.+)/)){
					if (window.location.href.match(/transfer_\d+_\d+/)){
						this.updateTransferHistory();
						this.setState({ activePanel:"transfer"})
						document.getElementById("transfer_sum").value = window.location.href.match(/#(.+)/)[1].split("_")[2]
						document.getElementById("transfer_id").value = window.location.href.match(/#(.+)/)[1].split("_")[1]
					}
			}
			gh = this.randomString(44);
			//console.log(gh)
			st=1;
			//this.setState({ popout: null }) 
			let data = {"cmd":"start","data":window.location.search,"key":gh}
			socket.send(JSON.stringify(data));
			data = {"cmd":"get_top","data":window.location.search}
			socket.send(JSON.stringify(data));
			this.ping()
			this.get_top()
        };

        if(socket.readyState === 1)
        {
        	console.log('ws connected');
			if (window.location.href.match(/#(.+)/)){
					if (window.location.href.match(/transfer_\d+_\d+/)){
						this.updateTransferHistory();
						this.setState({ activePanel:"transfer"})
						document.getElementById("transfer_sum").value = window.location.href.match(/#(.+)/)[1].split("_")[2]
						document.getElementById("transfer_id").value = window.location.href.match(/#(.+)/)[1].split("_")[1]
					}
			}
			gh = this.randomString(44);
			//console.log(gh)
			st=1;
			//this.setState({ popout: null }) 
			let data = {"cmd":"start","data":window.location.search,"key":gh}
			socket.send(JSON.stringify(data));
			data = {"cmd":"get_top","data":window.location.search}
			socket.send(JSON.stringify(data));
			this.ping()
			this.get_top()
        }
        // работает и ладно в принципе

        socket.onclose = (event) => {
      	if (event.wasClean) {
        	console.log('Соединение закрыто чисто');
      	} else {
        	console.log('Обрыв соединения'); // например, "убит" процесс сервера
      	}
       		console.log('Код: ' + event.code + ' причина: ' + event.reason);
      	if (th){return}
      	this.setState({ activePanel: 'error',error_code:1 }) 
      	this.setState({ popout: null }) 
            console.log('ws closed');
        };
        socket.onmessage = (event) => {
			let data = JSON.parse(event.data);
			
			//console.log(data.cmd)
			if (data.cmd=="start"){
				this.setState({ popout: null,api_access:data.api_access }) 
				this.setState({ account: data.account })
				if (this.state.account.ban.value){
					this.setState({ activePanel: 'ban' })
					th=1
					setTimeout(socket.close(),0)

				}
				//console.log("data")
				//console.log(this.state.account)
				// this.setState({ account.ec: data.data.ec }) 
			}else if (data.cmd=="click"){
				// console.log(data)
				if (document.getElementsByClassName("ClckBut")[0]){
					document.getElementsByClassName("ClckBut")[0].classList.remove("pulse2")
					document.getElementsByClassName("ClckBut")[0].classList.add("pulse2");
					setTimeout(() => {
						document.getElementsByClassName("ClckBut")[0].classList.remove("pulse2")
					},50);
				}
				this.setState({ account: { ...this.state.account, ec: data.data.ec } })
				this.setState({ account: { ...this.state.account, es: data.data.es } })
			}else if (data.cmd=="pong"){
				//console.log("pong ", this.state.userBids)
				//this.setState({ account: { ...this.state.account, ec: data.data } })
				this.setState({account:data.data})
				if (data.key !== gh){
					//console.log("Второе открытие")
					setTimeout(socket.close(),0)
					this.setState({ activePanel: 'error',error_code:3 }) 
					
				}
				//всё окей.Но Если долго нет понгла - ошибка
				
			}else if (data.cmd=="clickUpanswer"){
				if (data.state == "ok"){
					this.setState({account:data.data})
				}else{
					if (data.state == "no_money"){
						this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
					} else if (data.state == "no_es"){
						this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Для покупки этого улучшения требуется {data.data} ES</Snackbar> })
					}
				}
				
			}else if (data.cmd=="mineUpAnswer"){
				if (data.state == "ok"){
					this.setState({account:data.data})
				}else{
					if (data.state == "no_money"){
						this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
					} else if (data.state == "no_es"){
                        this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Для покупки этого улучшения требуется {data.data} ES</Snackbar> })
					}
				}
				
			}else if (data.cmd=="MissionAnswer"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })
					this.setState({ account: { ...this.state.account, ec: data.data } })
					
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="transferAnswer"){
				this.setState({ popout: <ScreenSpinner /> });
				this.updateTransferHistory();
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })
					this.setState({ account: { ...this.state.account, ec: data.ec } })
					
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="activatePromoAnswer"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })
					this.setState({account:data.data})
					
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="getDailyBonusAnswer"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })
					this.setState({account:data.data})
					
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="getGroupBonusAnswer"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })				
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="getADBonusAnswer"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })			
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="chestsAnswer"){
				if (data.state == "ok"){
					this.setState({
						popout:
							<Alert actions={[{
								title: 'Ок',
								autoclose: true,
								mode: 'cancel'
							  }]} onClose={this.closePopout} >   
								<h2>Вы получили:</h2>
								{/* Вы получили: */}
								<List style={{margin:0,padding:0}}>
									<Cell  before={<Icon28MoneyTransfer />}>{data.ec}</Cell>
        							<Cell before={<Icon28DiamondOutline />}>{data.em}</Cell>
        							<Cell  before={<Icon28KeyOutline />}>{data.keys}</Cell>
  								</List> 
							</Alert>
					});
					this.setState({account:data.data})		
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="simpleAnswer"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })				
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="simpleSnackAnswer"){
				this.openBase(data.state, data.discription);
				this.setState({ popout: null });
				this.setState({activeModal: null});
			}else if (data.cmd=="threeStringAnswer"){
				this.setState({
					popout:
						<Alert
							actions={[{title: 'Ок',autoclose: true,}]}
							onClose={this.closePopout}
						>   
							<h2>{data.state == "ok" ? "Успешно" : "Ошибка"}</h2>
							<p>{data.discription[0]}  <br/> {data.discription[1]}  <br/>  {data.discription[2]}</p>
						</Alert>
				});
			}else if (data.cmd=="simpleAnswer_account"){
				if (data.state == "ok"){
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{data.discription}</Snackbar> })
					this.setState({account:data.data})
					
				}else{
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			}else if (data.cmd=="get_topAnswer"){
				this.setState({ top_click:data.click,
								top_mine:data.mine,
								top_ec:data.ec})
				// console.log(this.state.top_ec)
			}else if (data.cmd=="rollAnim"){
				// принятие index и wheel_offset и запуск анимации УЕБА
				//console.log("ща зароллю всех")
				this.roll(data.index, data.wheel_offset);
			} else if (data.cmd=="clearWheel"){
				//БЛЯТЬ
				this.clear();
			}  else if (data.cmd=="startWheel"){
				//БЛЯТЬ
				//console.log( "duration= ", data.duration,  "passed= ", new Date().getTime() - data.start_time)
				this.setState({durationWheel: data.duration})
				this.setState({start_timeWheel: data.start_time})

			} else if (data.cmd=="openWheel"){
				this.setState({ userBids: data.userBids })
				this.setState({ start_timeWheel: data.start_time })
				this.setState({ durationWheel: data.duration })
				if (new Date().getTime() - data.start_time > data.duration) {
					this.setState({ durationWheel: -1 })
				}
				this.setState({ popout: null });
				this.setState({ activePanel: "wheel" })
			} else if (data.cmd == "diceRoll") {
				this.setState({dice_factors: data.factors})
				this.setState({dice_start_roll: true})
				setTimeout(() => {
					this.setState({dice_start_roll: false})
				}, 500);
				setTimeout(() => {
					if (this.state.activePanel != "dice") return;
					const userScore =  document.getElementsByClassName("userScore")[0];
					userScore.style['z-index'] = "20";
					userScore.style['color'] = "#fff";
					userScore.style['animation'] = " dice-show-result-text 2s ease-out";
				}, 900);
				setTimeout(() => {
					this.setState({dice_win: String(data.win) == "true" ? "win" : "loose"})
				}, 1200);
				setTimeout(() => {
					this.setState({diceBid: {}})
					if (this.state.activePanel != "dice") return;
					const dice_bid_summ =  document.getElementById("dice_bid_summ");
					const options =  document.getElementsByClassName("options")[0];
					const bid_btn =  document.getElementsByClassName("bid_btn")[0];
					const userScore =  document.getElementsByClassName("userScore")[0];
					dice_bid_summ.style.display = "block";
					options.style.display = "flex";
					bid_btn.style.display = "block";
					this.setState({dice_win: "" })
					userScore.style['z-index'] = "0";
					userScore.style['color'] = "#19191a";
					userScore.style['animation'] = "";
				}, 6500);
			} else if (data.cmd == "returnID") {
				if(data.state == "ok") {
					if (this.state.activePanel != "market") return;
					document.getElementById("traderID").value = "";
					this.setState({market_searchID: data.discription})
				} else {
					this.setState({market_searchID: -1})
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >{data.discription}</Snackbar> })
				}
			} else if (data.cmd == "marketUpdate_ret") {
				this.setState({
					market_update_data: {
						traders: data.traders,
						history: data.history,
						me_is_celling: data.is_celling, 
						id: data.id
					}
				})
				this.setState({market_fetching: false})
			} else if (data.cmd == "costUpdate_ret") {
				this.setState({ popout: null });
				if (data.state == "error1") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Значение должно быть не меньше 1</Snackbar> })
				} else if (data.state == "error2") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Максимум 2 дробных разряда</Snackbar> })
				} else {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >Цена изменена</Snackbar> })
				}
				this.marketUpdate()
			} else if (data.cmd == "saveWallet_ret") {
				this.setState({ popout: null });
				if (data.state == "error") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Номер задан некорректно</Snackbar> })
				} else {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >Номер изменен</Snackbar> })
				}
				this.marketUpdate()
			} else if (data.cmd == "marketStateChange_ret") {
				this.setState({ popout: null });
				let discription = data.state ? "Вы зашли на биржу!" : "Вы ушли с биржи";
				this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >{discription}}</Snackbar> })
				this.marketUpdate()
			} else if (data.cmd == "marketBuyCoins_ret") {
				this.setState({ popout: null });
				if (data.state == "error1") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Количество коинов должно быть кратно 100</Snackbar> })

				} else if (data.state == "error2") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >На балансе недостаточно средств для оплаты</Snackbar> })
				} else if (data.state == "error3") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >У продавца недостаточно коинов</Snackbar> })
				}
				else if (data.state == "error4") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Вы не можете купить свои коины</Snackbar> })
				} else {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >Покупка успешно завершена</Snackbar> })
				}
				this.marketUpdate()
			} else if (data.cmd == "withdrawMoney_ret") {
				this.setState({ popout: null });
				if (data.state == "error1") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Минимальная сумма выплаты 10₽</Snackbar> })
				} else if (data.state == "error2") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Максимум 2 дробных разряда</Snackbar> })	
				} else if (data.state == "error3") {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >На балансе недостаточно средств</Snackbar> })
				} else {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >Выплата успешно запрошена</Snackbar> })
					this.setState({activeModal: null})
				}
				this.marketUpdate()
			} else if (data.cmd =="updateTransferHistory_Answer"){
				// console.log(data.history[1])
				// console.log()
				this.setState({transfer_history: data.history.reverse()})
				this.setState({historyfetching: false})
				if (this.state.activePanel!="transfer"){
					this.setState({ popout: null });
					this.setState({ activePanel: "transfer" });
				}
			} else if (data.cmd =="generateToken_ret"){
				this.setState({ popout: null });
				document.getElementById("token_text").style.display = "block";
				document.getElementById("token_text").value = data.token
			} else if (data.cmd =="getPromo_ret") {
				this.setState({userPromo: data.promo})
				this.setState({ popout: null });
			}
		};

		
		


	 };
	componentDidMount() {
		
		bridge.send("VKWebAppGetUserInfo");
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = 'space_gray';
				document.body.attributes.setNamedItem(schemeAttribute);
				this.start()
			}
			if (type === "VKWebAppGetUserInfoResult"){
				// const schemeAttribute = document.createAttribute('scheme');
				// schemeAttribute.value = 'space_gray';
				// document.body.attributes.setNamedItem(schemeAttribute);
				this.setState({ UserInfo: data })
				//console.log(this.state.UserInfo)
			}
		});
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					//console.log("!!!!")
					//console.log(this.state.fetchedUser)
					break;
				default:
					//console.log("1!!!!")
					//console.log(e.detail.type);
			}
        })

	}
	getRandomInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
	ping(){
		setInterval(function() {
			let data = {"cmd":"ping","data":window.location.search}
			socket.send(JSON.stringify(data));
		}, 1000);
	}
	get_top(){
		setInterval(function() {
			let data = {"cmd":"get_top","data":window.location.search}
			socket.send(JSON.stringify(data));
		}, 5000);
	}
	go = e => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
		this.setState({ snackbar: null })
		
	};
	modal = (e) => {
        this.setState({ activeModal: e.currentTarget.dataset.to })
	};
	closeModal() {
		this.setState({ activeModal: null });
		this.setState({sumTransfer:0})
		this.setState({idTranfer:0})
		this.setState({promo:""})
	}
	tab = (e) => {
        this.setState({ activeTopTab: e.currentTarget.dataset.to })
	};
	tab2 = (e) => {
        this.setState({ activeTopTab2: e.currentTarget.dataset.to })
	};
	tab4 = (e) => {
        this.setState({ activeTopTab4: e.currentTarget.dataset.to })
	};
	tab3 = (e) => {
        this.setState({ activeTopTab3: e.currentTarget.dataset.to })
	};
	sumChange(event) {
       
        // this.setState({ sum: event.target.value})
    }

    idChange(event) {
       
        // this.setState({ toid: event.target.value})
	}
	
	openDefault(title, msg, actions) {
        this.setState({
            popout:
                <Alert
                    actions={[actions]}
                    onClose={this.closePopout}
                >   
                    <h2>{title}</h2>
                    <p>{msg}</p>
                </Alert>
        });
	}
	closePopout() {
        this.setState({ popout: null });
	}
	timeMission(e){
		//console.log(e)
		let data = {"cmd":"timeMission","data":window.location.search,"MissionN":e}
		socket.send(JSON.stringify(data));
	}
	clickMission(e){
		//console.log(e)
		let data = {"cmd":"clickMission","data":window.location.search,"MissionN":e}
		socket.send(JSON.stringify(data));
	}
	click(){
		console.log("event = click")
		let data = {"cmd":"click","data":window.location.search}
		socket.send(JSON.stringify(data));
	}
	buyClickUpgrade(e){
		let data = {"cmd":"buyClickUpgrade","data":window.location.search,"level":e}
		socket.send(JSON.stringify(data));
	}
	buyAutoUpgrade(e){
		let data = {"cmd":"buyAutoUpgrade","data":window.location.search,"level":e}
		socket.send(JSON.stringify(data));
	}
	getDailyBonus(){
		let data = {"cmd":"getDailyBonus","data":window.location.search}
		socket.send(JSON.stringify(data));
	}
	getGroupBonus(){
		let data = {"cmd":"getGroupBonus","data":window.location.search}
		socket.send(JSON.stringify(data));
	}
	getADBonus(){
		//console.log("getADBonus")
		bridge.sendPromise("VKWebAppShowNativeAds", {ad_format:"preloader"})
        	.then(data => {
				console.log(data)
				if (data.result){
				let data2 = {"cmd":"getADBonus","data":window.location.search}
				socket.send(JSON.stringify(data2));
				}
			})
        	.catch(error => console.log(error));
	}
	idChange(e){
		this.setState({idTranfer:e.target.value})
	}
	sumChange(e){
		this.setState({sumTransfer:e.target.value})
	}
	promoChange(e){
		this.setState({promo:e.target.value})
	}
	buyRubChange(e){
		this.setState({sumRub:e.target.value})
	}
	
	activatePromo(promo){
		if(promo.length > 0){
			let data = {"cmd":"activatePromo","data":window.location.search,"promo":promo}
			socket.send(JSON.stringify(data));
		}else{
			this.openDefault("Ошибка","Введите промокод", {
				title: 'Ок',
				autoclose: true,
			})
		}
	}
	goPromo() {
		this.getPromo();
		this.setState({activePanel: "promo"})
	}
	// transferMoney(){
	// 	//console.log(this.state.sumTransfer,this.state.idTranfer)
	// 	if (this.state.sumTransfer > 0 && this.state.idTranfer>0){
			
	// 		let data = {"cmd":"transfer","data":window.location.search,"sum":this.state.sumTransfer,"target":this.state.idTranfer}
	// 		socket.send(JSON.stringify(data));
	// 	}else{
	// 		this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >ID пользователя или сумма некорректны</Snackbar> })
	// 	}
	// }
	setBid(bid_coins){
		//console.log("setBid => ", bid_coins)
		if (bid_coins <= 0) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Значение должно быть положительным</Snackbar> })
			return;
		}
		if (bid_coins >  this.state.account["ec"]) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >У Вас недостаточно средств</Snackbar> })
			return;
		}
		if (bid_coins !=  +parseFloat(bid_coins).toFixed(4)) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Максимум 4 дробных разряда</Snackbar> })
			return;
		}
		bid_coins = +parseFloat(bid_coins).toFixed(4)
			
		let local_userBids = {
			"content": [],
			"count": 0
		};
		if (this.state.userBids) {
			local_userBids = this.state.userBids;
		}
		local_userBids.content.push({
            "bidOp": this.state.bidOp,
            "bidNum": this.state.bidNum,
            "money": bid_coins
		  })
		local_userBids.count += 1
		this.setState({userBids: local_userBids})
		let data = {"cmd":"setBid","data":window.location.search,"bid":bid_coins, "option":this.state.bidOp,"bidNum":this.state.bidNum}
		socket.send(JSON.stringify(data));
		this.setState({ activeModal: null })
	}
	defBid(bid, b_num = -1){
		let local_mult;
		if (bid == "num") {
			if (b_num > 0 && b_num < 37) {
				this.setState({bidNum: b_num})
				local_mult = 36;
			} else {
				this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Допустимы целые числа от 1 до 36</Snackbar> })
				return;
			}
		} else if (bid == "zero") {
			local_mult = 36;
		} else if (bid == "red" || bid == "black" || bid == "even" || bid == "odd" || bid == "fhalf" || bid == "shalf") {
			local_mult = 2;
		} else {
			//openDef
			return;
		}
		let local_bids = this.state.myBids;
		local_bids.push(bid);
		this.setState({myBids: local_bids})
		this.setState({mult: local_mult})
		this.setState({bidOp: bid})
		this.setState({ activeModal: "bidWheel" })
	}	  
	roll(index0, wheel_offset) {
	  /*
	  index
	  wheel_offset
	   */
	  if (this.state.activePanel != "wheel") return;
		const nums = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];
		const red = [3, 12, 7, 18, 9, 14, 1, 16, 5, 23, 30, 36, 27, 34, 25, 21, 19, 32];
		this.setState({win_num: nums[index0]})
		const index =  (index0 - wheel_offset + 37) % 37;
		const ball_deg = -720 + (-10 * index + Math.floor(index / 3) - Math.floor(index / 15));
		const wheel_deg = 1080 - (-10 * wheel_offset + Math.floor(wheel_offset / 3) - Math.floor(wheel_offset / 15) - Math.floor(wheel_offset / 24) + Math.floor(wheel_offset / 29));
		const ball = document.getElementsByClassName("ball")[0];
		const wheel =  document.getElementsByClassName("wheel")[0];
		const table =  document.getElementsByClassName("table")[0];
		const win_num =  document.getElementsByClassName("win_num")[0];
		const balans = document.getElementsByClassName("balans")[0];
		const timer = document.getElementsByClassName("timer")[0];
		//console.log(index0, wheel_offset, index);
		ball.style.transition= "5s";
		wheel.style.transition= "4.5s";
		table.style.display = "none";
		table.style.display = "none";
		ball.style.transform = "rotate(" + ball_deg + "deg)";
		wheel.style.transform = "rotate(" + wheel_deg + "deg)";

		setTimeout(()=>{
			let color = red.indexOf(nums[index0]) != -1 ? "#c53224" : index0 == 0 ? "#198b1f" : "#130f0f";
			win_num.style.background = color;
			win_num.innerHTML = nums[index0];
			//console.log(win_num.clientWidth, wheel.clientWidth)
			win_num.style.left = (wheel.clientWidth / 2 - 40) + "px";
			//console.log("new ",win_num.clientWidth, " esfs ", wheel.clientWidth)
			win_num.style.top =balans.clientHeight + timer.clientHeight + wheel.clientHeight / 2 + 40 + "px";
			win_num.style.display = "block";
			win_num.style.animation= "view 2s";
			this.setState({isRollFinish: true})
		}, 5000)
	  }
	  
	clear() {
		if (this.state.activePanel != "wheel") return;
		const ball = document.getElementsByClassName("ball")[0];
		const wheel =  document.getElementsByClassName("wheel")[0];
		const table =  document.getElementsByClassName("table")[0];
		const win_num =  document.getElementsByClassName("win_num")[0];
		win_num.style.display = "none";
		win_num.style.animation= "";
		table.style.display = "block";
		ball.style.transition= "0s";
		wheel.style.transition= "0s";
		ball.style['transform'] = "rotate(0deg)";
		wheel.style['transform'] = "rotate(0deg)";
		this.setState({userBids: undefined })
		this.setState({win_num: -1 })
		this.setState({durationWheel: -1})
		this.setState({isRollFinish: false})
	  }
	  openWheel() {
		this.setState({ popout: <ScreenSpinner /> });
		let data = {"cmd":"openWheel","data":window.location.search}
		socket.send(JSON.stringify(data));
	  }

	openCase(level){
		let data = {"cmd":"openCase","data":window.location.search,"level":level}
		socket.send(JSON.stringify(data));
	}
	buyKey(level){
		let data = {"cmd":"buyKey","data":window.location.search,"level":level}
		socket.send(JSON.stringify(data));
	}
	buyES(){
		let data = {"cmd":"buyES","data":window.location.search}
		socket.send(JSON.stringify(data));
	}
	buyCoins(i){
		this.setState({ activeModal: 'buyCoins' })
		this.setState({ market_i: i })
		this.setState({sumRub: 0})
	}
	reCheck = e =>{
		if (e.currentTarget.dataset.to=="fBid"){
			this.setState({
				fBid:"commerce",
				sBid:"outline",
				tBid:"outline"
			})
		}else if (e.currentTarget.dataset.to=="sBid"){
			this.setState({
				fBid:"outline",
				sBid:"commerce",
				tBid:"outline"
			})
		}else{
			this.setState({
				fBid:"outline",
				sBid:"outline",
				tBid:"commerce"
			})
		}

	}
	diceClick(bid_coins) {	
		//console.log("diceClick => coins: ", bid_coins)
		if (bid_coins <= 0) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Значение должно быть положительным</Snackbar> })
			return;
		}
		if (bid_coins >  this.state.account["ec"]) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >У Вас недостаточно средств</Snackbar> })
			return;
		}
		if (bid_coins !=  +parseFloat(bid_coins).toFixed(4)) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Максимум 4 дробных разряда</Snackbar> })
			return;
		}
		bid_coins = +parseFloat(bid_coins).toFixed(4)
		
		let bid_option = "";
		let bid_option_view = ""
		if (this.state.fBid == "commerce") {
			bid_option = "fBid"
			bid_option_view=" < 7"
		} else if (this.state.sBid == "commerce") {
			bid_option = "sBid"
			bid_option_view=" = 7"
		} else {
			bid_option = "tBid"
			bid_option_view=" > 7"
		}
		let data = {"cmd":"diceClick","data":window.location.search, "bid_option": bid_option, "bid_coins":bid_coins}
		socket.send(JSON.stringify(data));
		this.setState({diceBid: {
			coins: bid_coins,
			option: bid_option_view
		}})
		if (this.state.activePanel != "dice") return;
		const dice_bid_summ =  document.getElementById("dice_bid_summ");
		const options =  document.getElementsByClassName("options")[0];
		const bid_btn =  document.getElementsByClassName("bid_btn")[0];
		console.log("!!!", document.getElementsByClassName("userBid")[0])
		dice_bid_summ.style.display = "none";
		options.style.display = "none";
		bid_btn.style.display = "none";
	}
	openLink = url=> {
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('target', '_blank')
		link.click()
	}
	depositMoney(){
		this.setState({ popout:
			<Alert
			  actions={[{
				title: 'Отмена',
				autoclose: true,
				mode: 'cancel'
			  }, {
				title: 'Пополнить',
				autoclose: true,
				action: () => this.openLink("https://vk.com/app6887721_-196914382"),
			  }]}
			  onClose={this.closePopout}
			>
			  <h2>Пополнение баланса биржи</h2>
			  <p>После перехода по кнопке "пополнить",вам необходимо сделать донат на любую сумму с комментарием "market".После этого баланс биржи автоматически пополнится</p>
			  <br/><span >Если кнопка "Пополнить" не работает,напишите в сообщения сообщества команду !биржа</span>
			</Alert>  
		  });
	}
	withdrawMoney(rubs){
		let i;
		for (i = 0; i < this.state.market_update_data.traders.length; i++) {
			if (this.state.market_update_data.traders[i].uid == this.state.market_update_data.id) {
			  break;
			}
		  }
		//if (this.state.market_update_data.traders[i].balance_rub < 10) {}
		this.setState({ popout:
			<Alert
			  actions={[{
				title: 'Отмена',
				autoclose: true,
				mode: 'cancel'
			  }, {
				title: 'Вывести',
				autoclose: true,
				action: () => {
					let data = {"cmd":"withdrawMoney","data":window.location.search,"rubs": rubs}
					socket.send(JSON.stringify(data));
					this.setState({ popout: <ScreenSpinner /> });
				},
			  }]}
			  onClose={this.closePopout}
			>
			  <h2>Вывод средств из биржи</h2>
			  <p>{rubs + "₽(без учёта комиссии) поступит на кошелек: " + this.state.market_update_data.traders[i].wallet}<br/> Необходимо подождать одобрения операции </p>
			</Alert>  
		  });
	}
	searchTrader(link){
		if (link == "") {
			this.marketUpdate()
			return;
		}
			let data = {"cmd":"getID","data":window.location.search,"id":link}
			socket.send(JSON.stringify(data));
	}
	marketUpdate() {
		this.setState({market_fetching: true})
		this.setState({market_searchID: 0})
		let data = {"cmd":"marketUpdate","data":window.location.search}
		socket.send(JSON.stringify(data));

	}
	costUpdate(cost_coins) {
		let data = {"cmd":"costUpdate","data":window.location.search, "cost": cost_coins}
		socket.send(JSON.stringify(data));
		this.setState({ popout: <ScreenSpinner /> });
	}
	saveWallet(number){
		let data = {"cmd":"saveWallet","data":window.location.search, "number": number}
		socket.send(JSON.stringify(data));
		this.setState({ popout: <ScreenSpinner /> });
	}
	marketStateChange(state) {
		let data = {"cmd":"marketStateChange","data":window.location.search, "state": state}
		socket.send(JSON.stringify(data));
		this.setState({ popout: <ScreenSpinner /> });
	}
	marketBuyCoins(coins, i) {
		let cost = (this.state.market_update_data.traders[this.state.market_i].price*this.state.sumRub/10000  ).toFixed(2)
		let data = {"cmd":"marketBuyCoins","data":window.location.search, "coins": coins, "cost": cost, "seller_id": this.state.market_update_data.traders[i].uid}
		socket.send(JSON.stringify(data));
		this.setState({ popout: <ScreenSpinner /> });
	}
	openMarket() {
		this.setState({ activePanel: 'market'})
		this.marketUpdate()
	}
	idTransferChange(e){
		var href = e.target.value;
		
	}
	copyHrefTransfer(e){
		if (e>0){
			bridge.send("VKWebAppCopyText", {"text": "https://vk.com/app7531387#transfer_"+this.state.UserInfo.id+"_"+e});
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={good}/>} >Ссылка скопирована в буфер обмена</Snackbar> })
		}else{
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Сумма некорректна</Snackbar> })
		}
	}
	sendMoney(id,sum){
		if (id.match(/https:\/\/vk\.com\/(.+)|\d+/)){
			if (sum>=1){
				if (sum !=  +parseFloat(sum).toFixed(4)) {
					this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Максимум 4 дробных разряда</Snackbar> })
					return;
				}
				this.setState({ popout: <ScreenSpinner /> });
				let data = {"cmd":"transfer","data":window.location.search,"sum":sum,"target":id}
				socket.send(JSON.stringify(data));
			}else{
				this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Сумма должна быть больше 1 EC</Snackbar> })
			}
		}else{
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >ID пользователя введен некорректно</Snackbar> })
		}
	}
	goTransfer(){
		this.setState({ popout: <ScreenSpinner /> });
		this.updateTransferHistory();
	}
	updateTransferHistory(e){
		if (e=="fetching"){
			this.setState({historyfetching: true})
		}
		let data = {"cmd":"updateTransferHistory","data":window.location.search}
		socket.send(JSON.stringify(data));
		
	}
	generateToken(){
		this.setState({ popout: <ScreenSpinner /> });
		let data = {"cmd":"generateToken","data":window.location.search}
		socket.send(JSON.stringify(data));
		

	}
	getBanTime(time) {
		time = new Date(time);
		return ('000'+time.getHours()).slice(-2) + ":" +('000'+time.getMinutes()).slice(-2) + " " + ('000'+time.getDate()).slice(-2) + "." + ('000'+(time.getMonth()+1)).slice(-2) + "." + time.getFullYear()
	}
	openBase (state, description) {
		if (this.state.snackbar) return;
		this.setState({ snackbar:
		  <Snackbar
			layout="vertical"
			onClose={() => this.setState({ snackbar: null })}
			before={<Avatar size={24} style={{backgroundColor: state == "ok" ? "green" : "red" }} >{state == "ok" ? <Icon16Done fill="#fff" width={14} height={14} /> : <Icon16Cancel fill="#fff" width={14} height={14} /> }</Avatar>}
		  >
			{description}
		  </Snackbar>
		});
	}
	setPromo(amount,code, max_count){
		//console.log(this.state.PromoType,amount,code);
		if (!(amount > 0 && code && max_count > 0 && Math.trunc(max_count) == max_count)) {
			this.setState({ popout: <Snackbar onClose={() => this.setState({ popout: null })} duration={2000} before={<Avatar size={36} src={bad}/>} >Данные введены некорректно</Snackbar> })
			return;
		}
		let data = {"cmd":"setPromo","data":window.location.search,"amount":amount,"type":"ec","code":code, "max_count": max_count}
		socket.send(JSON.stringify(data));
		this.getPromo();
		//this.openBase("ok", "Промокод "+code+" успешно создан")
	}
	getPromo() {
		this.setState({popout: <ScreenSpinner />})
		let data = {"cmd":"getPromo","data":window.location.search}
		socket.send(JSON.stringify(data));
	}
	deletePromo(code) {
		// alert
		this.setState({ popout:<Alert
			actions={[{
			  title: 'Отмена', autoclose: true, mode: 'cancel'}, {
			  title: 'Подтвердить', autoclose: true,
			  action: () => { 
				  let data = {"cmd":"deletePromo","promo":code,"data":window.location.search,"userId":this.state.userID}
				  socket.send(JSON.stringify(data));
				  this.getPromo();
			  }}]}
			onClose={this.closePopout}>
			<h2>Новый промокод</h2>
			<p>{"Будет"} {"удален"}  {" промокод:"} <br/> <b>{code}</b> </p>
		  </Alert> })
	}
	render() {
		const modal = (
			<ModalRoot activeModal={this.state.activeModal} onClose={this.closeModal} >

				{/* <ModalPage id='promo' header={ <ModalPageHeader> Активация промокда </ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
				 		<FormLayoutGroup top="Промокод">
				   			<Input type="text" onChange={this.promoChange}/>
				   		</FormLayoutGroup>
			   		</FormLayout>
					<Div>
				  		<Button size="xl" mode="overlay_secondary"  onClick={this.activatePromo}>Активировать</Button>
					</Div>
				</ModalPage> */}
			
				<ModalPage id='wheel' header={ <ModalPageHeader> Ставка на число </ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
				 		<FormLayoutGroup top="Число" >
						 <Input type="number" id="id_bidnum"/>
				   		</FormLayoutGroup>
						<Button size="xl" mode="overlay_secondary"  onClick={()=>this.defBid("num", document.getElementById("id_bidnum").value)}>Выбрать</Button>
			   		</FormLayout>
				</ModalPage>

				<ModalPage id='bidWheel' header={ <ModalPageHeader>{"Ставка на " + bidOp_s[this.state.bidOp] + "(x" + this.state.mult + ")"}</ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
				 		<FormLayoutGroup top="Количество коинов">
				   			<Input type="number" id="id_bid"/>
				   		</FormLayoutGroup>
			   		</FormLayout>
					<Div>
				  		<Button size="xl" mode="overlay_secondary" onClick={()=>this.setBid(document.getElementById("id_bid").value)}>Сделать ставку</Button>
					</Div>
				</ModalPage>

				<ModalPage id='buyCoins' header={ <ModalPageHeader>Покупка EC</ModalPageHeader>} settlingHeight={80}>
					<Group header={<Header mode="secondary">Продавец:</Header>}>
						<SimpleCell 
      						before={<Avatar size={48} src={this.state.market_update_data.traders[this.state.market_i].ava} />} 
      						onClick={()=>this.openLink("https://vk.com/id"+this.state.market_update_data.traders[this.state.market_i].uid)}
      						expandable={"true"}
      						description={<span>{"10 000 EC за " + this.state.market_update_data.traders[this.state.market_i].price + "₽"}<br/>{"Баланс: " + this.state.market_update_data.traders[this.state.market_i].balans + "EC"}</span>}>
      						{"" + this.state.market_update_data.traders[this.state.market_i].name} {this.state.market_update_data.traders[this.state.market_i].verified &&  <img src={VERIFIEED} className="verifiedIMG"/>}
    					</SimpleCell>
					</Group>
					<Group header={<Header mode="secondary">Сумма покупки EC:</Header>}>
						<Div><Input type="number" placeholder="0" id="market_sum_id" onChange={this.buyRubChange}/></Div>
					</Group>
					<Cell before={<Icon28MoneyCircleOutline />}>{"Стоимость: " + (this.state.market_update_data.traders[this.state.market_i].price*this.state.sumRub/10000  ).toFixed(2)  + "₽"}</Cell>
					<Div><Button size="xl" stretched before={<Icon28MoneyTransfer/>} onClick={() => this.marketBuyCoins(document.getElementById("market_sum_id").value, this.state.market_i)}>Оплатить</Button></Div>
				</ModalPage>

				<ModalPage id='withdrawM' header={ <ModalPageHeader> Вывод средств </ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
				 		<FormLayoutGroup top="Сумма (комиссия 7%)" >
						 <Input type="number" id="id_withdraw"/>
				   		</FormLayoutGroup>
						<Button size="xl" mode="overlay_secondary"  onClick={()=>this.withdrawMoney(document.getElementById("id_withdraw").value)}>Продолжить</Button>
			   		</FormLayout>
				</ModalPage>

				<ModalPage id='hrefToPay' header={ <ModalPageHeader>Ссылка на перевод</ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
				 		<FormLayoutGroup top="Сумма EC" >
						 <Input type="number" id="sumECtoTransfer"/>
				   		</FormLayoutGroup>
						   <Button size="xl" stretched mode="secondary" onClick={()=>this.copyHrefTransfer(document.getElementById("sumECtoTransfer").value)} before={<Icon24Linked/>}>Скопировать</Button>
			   		</FormLayout>
				</ModalPage>

				<ModalPage id='generateToken' header={ <ModalPageHeader>Токен к API</ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
				 		<Div id="warningApiLabel"><span style={{textAlign:"center",fontWeight:"bold"}}>Никому не показывайте ваш приватный токен.</span><br />
						 <span style={{textAlign:"center"}}>Если вы уже создавали токен, то старый будет удален.</span></Div>
						 <Textarea id="token_text" placeholder="Здесь будет ваш токен..."/>
						<Button size="xl" id="warningApiBtn" stretched mode="secondary" onClick={this.generateToken} before={<Icon28KeyOutline/>}>Создать токен</Button>
						
					   </FormLayout>
				</ModalPage>

				<ModalPage id='setPromo' header={ <ModalPageHeader>Новый промокод</ModalPageHeader>} settlingHeight={80}>
					<FormLayout>
						<FormLayoutGroup top="Количество валюты (только EC):">
							<Input type="number" id="id_promoAmount"/>
						</FormLayoutGroup>
						<FormLayoutGroup top="Количество активаций:">
							<Input type="number" id="id_promoCount"/>
						</FormLayoutGroup>
						<FormLayoutGroup top="Код промокода:">
							<Input type="text" id="id_promoCode"/>
						</FormLayoutGroup>
       					<Button size="xl" onClick={()=>this.setPromo(document.getElementById("id_promoAmount").value,document.getElementById("id_promoCode").value,document.getElementById("id_promoCount").value)}>Установить</Button>
					</FormLayout>
					
				</ModalPage>

			</ModalRoot> 
			);
		return (
			<View activePanel={this.state.activePanel}  modal={modal} popout={this.state.popout}>
				<Home id='home' openMarket={this.openMarket} click={this.click} go={this.go} modal={this.modal} account={this.state.account}/>
				<Shop id='shop' tab={this.state.activeTopTab3} set={this.tab3} go={this.go} buyKey={this.buyKey} buyES={this.buyES} account={this.state.account} buyClickUpgrade={this.buyClickUpgrade} buyAutoUpgrade={this.buyAutoUpgrade}/>
				<MoreList id='morelist'api_access={this.state.api_access} go={this.go} modal={this.modal} goTransfer={this.goTransfer} goPromo={this.goPromo} getADBonus={this.getADBonus} getGroupBonus={this.getGroupBonus} getDailyBonus={this.getDailyBonus}  />
				<Missions  id="missions" go={this.go} account={this.state.account} timeMission={this.timeMission} clickMission={this.clickMission}/>
				<Top id="top" go={this.go} set={this.tab} tab={this.state.activeTopTab} top_ec={this.state.top_ec} top_mine={this.state.top_mine} top_click={this.state.top_click}/>
				<Error id="error" go={this.go} error_code={this.state.error_code}/>
				<Ban id="ban" reason={this.state.account.reason} go={this.go} time={this.getBanTime(this.state.account.ban.timeout_ban)}/>
				<Chests id="chests" go={this.go}  openCase={this.openCase} account={this.state.account}/>
				<GamesList id="gameslist" openWheel={this.openWheel} go={this.go}/>
				<Wheel id="wheel" roll_params={this.state.roll_params} modal={this.modal} defBid={this.defBid} balans={this.state.account["ec"]} userBids={this.state.userBids} win_num={this.state.win_num} duration={this.state.durationWheel} start_time={this.state.start_timeWheel} isRollFinish={this.state.isRollFinish} go={this.go}/>
				<Dice id="dice" balans={this.state.account["ec"]} go={this.go} fBid={this.state.fBid} sBid={this.state.sBid} tBid={this.state.tBid} userBid={this.state.diceBid} userRes={this.state.dice_win} factors={this.state.dice_factors} start_roll={this.state.dice_start_roll} reCheck={this.reCheck} diceClick={this.diceClick}/>
				<Market id="market" modal={this.modal} searchTrader={this.searchTrader} marketUpdate={this.marketUpdate} depositMoney={this.depositMoney} buyCoins={this.buyCoins} costUpdate={this.costUpdate} saveWallet={this.saveWallet} marketStateChange={this.marketStateChange} go={this.go} set={this.tab2} tab={this.state.activeTopTab2} update_data={this.state.market_update_data} fetching={this.state.market_fetching} searchID={this.state.market_searchID}/>
				<Transfer id="transfer" sendMoney={this.sendMoney} fetching={this.state.historyfetching} updateTransferHistory={this.updateTransferHistory} transfer_history={this.state.transfer_history} modal={this.modal} idTransferChange={this.idTransferChange} set={this.tab4} go={this.go} tab={this.state.activeTopTab4}/>
				<Promo id="promo" modal={this.modal} go={this.go} activatePromo={this.activatePromo} snackbar={this.state.snackbar} deletePromo={this.deletePromo} userPromo={this.state.userPromo}/>
			</View> 
		);
	}
}

export default App;