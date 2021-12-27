import { useEffect, useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import styles from "./Post.module.css"
import spreadsheetID from "../data/spreadsheetID";
import apiEmail from "../data/apiEmail";
import privateKey from "../data/privateKey";

export default function Post() {

    const [repeat, setRepeat] = useState(true);

    const [to1, setTo1] = useState("N/A");
    const [post1, setPost1] = useState("");

    const [to2, setTo2] = useState("N/A");
    const [post2, setPost2] = useState("");

    const [to3, setTo3] = useState("N/A");
    const [post3, setPost3] = useState("");

    const [to4, setTo4] = useState("N/A");
    const [post4, setPost4] = useState("");

    const [from, setFrom] = useState("N/A");

    const [names, setNames] = useState([]);

    const [able, setAble] = useState(false);

    const SPREADSHEET_ID = spreadsheetID;
    const CLIENT_EMAIL = apiEmail;
    const PRIVATE_KEY = privateKey;
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const sendPost = async () => {
        if (!able) {
            alert("You need to fill in all the forms before submitting")
            return
        }
        alert("Sending your messages")
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });

            await doc.loadInfo();

            const sheet = doc.sheetsById[703195283]
            await sheet.addRow({ sender: from, text: post1, reciever: to1 });
            await sheet.addRow({ sender: from, text: post2, reciever: to2 });
            await sheet.addRow({ sender: from, text: post3, reciever: to3 });
            await sheet.addRow({ sender: from, text: post4, reciever: to4 });
            alert("Messages have been sent")
        } catch (e) {
            console.error('Error: ', e);
        }
    }

    const fetchName = async () => {
        console.log('start')
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });

            await doc.loadInfo();

            const nameSheet = doc.sheetsById[1367631636]

            const row = await nameSheet.getRows();
            const rowcount = nameSheet.rowCount;

            for (let i = 0; i < rowcount-1; i++){
                try {
                    if (row[i] !== undefined) {
                        setNames(names => [...names, {name: row[i].name, key: i}])
                    } else {
                        break
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            
        } catch (e) {
            console.log(e)
        }
    }
    // eslint-disable-next-line
    useEffect(() => {
        if (repeat) {
            fetchName()
            setRepeat(false)
        }
    });
    useEffect(() => {
        if (to1 !== "N/A" && post1 !== "" && 
        to2 !== "N/A" && post2 !== "" &&
        to3 !== "N/A" && post3 !== "" &&
        to4 !== "N/A" && post4 !== "" &&
        from !== "N/A" ){
            setAble(true)
        }
        else {
            setAble(false)
        }
    },[to1, post1, to2, post2, to3, post3, to4, post4, from])

    return (
        <div class={styles.background}>
            <div class={styles.container}>
                <text class={styles.title}>
                    Write Your Messages
                </text>
                <div class={styles.postContainer}>
                    <div class={styles.msgContainer}>
                        <text class={styles.subtitle}>
                            To:
                        </text>
                        <select 
                        onChange={(e) => setTo1(e.target.value)}
                        class ={styles.sender}>
                            <option value='N/A'>Pick one</option>
                            {names.map(({name,key}) => (
                                <option value={name} key={key}>{name}</option>
                            ))}
                        </select>
                        <text class={styles.subtitle}>
                            Message:
                        </text>
                        <textarea class={styles.message}
                        maxLength= "500"
                        onChange={(e) => setPost1(e.target.value)}>
                        </textarea>
                    </div>
                    <div class={styles.msgContainer}>
                        <text class={styles.subtitle}>
                            To:
                        </text>
                        <select 
                        onChange={(e) => setTo2(e.target.value)}
                        class ={styles.sender}>
                            <option value='N/A'>Pick one</option>
                            {names.map(({name,key}) => (
                                <option value={name} key={key}>{name}</option>
                            ))}
                        </select>
                        <text class={styles.subtitle}>
                            Message:
                        </text>
                        <textarea class={styles.message} maxLength= "500" onChange={(e) => setPost2(e.target.value)}>
                        </textarea>
                    </div>
                    <div class={styles.msgContainer}>
                        <text class={styles.subtitle}>
                            To:
                        </text>
                        <select 
                        onChange={(e) => setTo3(e.target.value)}
                        class ={styles.sender}>
                            <option value='N/A'>Pick one</option>
                            {names.map(({name,key}) => (
                                <option value={name} key={key}>{name}</option>
                            ))}
                        </select>
                        <text class={styles.subtitle}>
                            Message:
                        </text>
                        <textarea class={styles.message} maxLength= "500"
                        onChange={(e) => setPost3(e.target.value)}>
                        </textarea>
                    </div>

                    <div class={styles.msgContainer}>
                        <text class={styles.subtitle}>
                            To:
                        </text>
                        <select 
                        onChange={(e) => setTo4(e.target.value)}
                        class ={styles.sender}>
                            <option value='N/A'>Pick one</option>
                            {names.map(({name,key}) => (
                                <option value={name} key={key}>{name}</option>
                            ))}
                        </select>
                        <text class={styles.subtitle}>
                            Message:
                        </text>
                        <textarea class={styles.message} maxLength= "500" 
                        onChange={(e) => setPost4(e.target.value)}>
                        </textarea>
                    </div>
                    <div class={styles.msgContainer}>
                        <text class={styles.subtitle}>
                            From:
                        </text>
                        <select 
                        onChange={(e) => setFrom(e.target.value)}
                        class ={styles.sender}>
                            <option value='N/A'>Pick one</option>
                            {names.map(({name,key}) => (
                                <option value={name} key={key}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div class={styles.msgContainer}>
                        <button
                        onClick={sendPost}
                        class={styles.button}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {/* <text>
                Welcome to the posting screen
            </text>

            <text> Sender: </text>
            <select onClick={getData} onChange={(e) => setSender(e.target.value)}>
                <option value='N/A'>Pick one</option>
                {data.map(({name,key}) => (
                    <option value={name} key={key}>{name}</option>
                ))}
            </select>

            <text> Text: </text>
            <input
            type='text'
            value = {msg}
            onChange={(e) => setMessage(e.target.value)} />

            <text> Reciever: </text>
            <select onClick={getData} onChange={(e) => setReciever(e.target.value)}>
                <option value='N/A'>Pick one</option>
                {data.map(({name,key}) => (
                    <option value={name} key={key}>{name}</option>
                ))}
            </select>

            <button
            onClick = {sendData}>
                submit
            </button> */}

        </div>
    )
}