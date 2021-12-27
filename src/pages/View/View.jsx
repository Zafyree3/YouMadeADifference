import { GoogleSpreadsheet } from "google-spreadsheet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./View.module.css"
import spreadsheetID from "../data/spreadsheetID";
import apiEmail from "../data/apiEmail";
import privateKey from "../data/privateKey";

export default function View() {

    let location = useLocation()

    const SPREADSHEET_ID = spreadsheetID;
    const CLIENT_EMAIL = apiEmail;
    const PRIVATE_KEY = privateKey;
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    let UserID = location.state
    console.log(UserID)

    const [repeat, setRepeat] = useState(true);
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState();

    const fetchData = async () => {
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });

            await doc.loadInfo();

            const msgSheet = doc.sheetsById[703195283]
            const msgRow = await msgSheet.getRows();
            const msgRowCount = msgSheet.rowCount;
            for (let i = 0; i < msgRowCount-1; i++) {
                if (msgRow[i] !== undefined) {
                    setData(data => [...data, {sender: msgRow[i].sender, text: msgRow[i].text, reciever: msgRow[i].reciever, id: i}])
                } else {
                    console.log('bro your gay')
                    return
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const findName = async () => {
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });

            await doc.loadInfo();

            const dataSheet = doc.sheetsById[1367631636]
            const dataRow = await dataSheet.getRows();
            const dataCount = dataSheet.rowCount;

            for (let i = 0; i < dataCount-1; i ++){
                if (dataRow[i] !== undefined) {
                    if (dataRow[i].ID === UserID) {
                        setUserName(dataRow[i].name)
                    }
                } else {
                    console.log('caught ass lacking')
                    return
                }
            }

        } catch (e) {
            console.error(e)
        }
    }

    function Message(props) {
        return (
            <div key={props.id} class={styles.post}>
                <text>From: {props.sender}</text>
                <text class={styles.subtitle}>
                    Message:
                </text>
                <text class={styles.subtitle}>
                    {props.text}
                </text>
            </div>
        )
    }
    // eslint-disable-next-line
    useEffect(()=> {
        if (repeat) {
            fetchData()
            findName()
            setRepeat(false)
        }
    })

    return(
        <div class={styles.background}>
            <div class={styles.container}>
                <text class={styles.title}>You're loved and appriciated</text>
                <div class={styles.postContainer}>
                    {data.filter(d => d.reciever === userName).map(({sender,text,reciever,id}) => (
                        <Message sender={sender} text={text} reciever={reciever} key={id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}