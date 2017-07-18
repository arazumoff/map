import { eventChannel} from 'redux-saga'
import * as ActionTypes from './actions'
import { call, put, take } from 'redux-saga/effects'

import * as config from './config';

function initWS() {
    return eventChannel(emitter => {
        const wsUrl = `ws://${config.WS_SERVER}`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('opening...');
            ws.send('{"name":"start"}')
        }
        ws.onerror = (error) => {
            console.log('WebSocket error ' + error);
            console.dir(error)
        }
        ws.onmessage = (e) => {
            let msg = null;
            try {
                msg = JSON.parse(e.data)
            } catch(e) {
                console.error(`Error parsing : ${e.data}`);
            }
            if (msg){
                const type = msg.name;
                switch (type) {
                    case 'location':
                        return emitter({type: ActionTypes.CHANGE_LOCATION, data: msg.data});
                    case 'status':
                        return emitter({type: ActionTypes.CHANGE_STATUS, data: msg.data});
                    default:
                    // nothing to do
                }
            }
        }

        return () => {
            console.log('Socket off')
        }
    })
}

function* rootSaga() {
    const channel = yield call(initWS)
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}
export default rootSaga;
