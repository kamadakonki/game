document.onkeydown = typeGame; //キー押下時に関数を呼び出す



//配列(文字を格納)
let moji = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");

//配列(キーコードを格納)
let kcode = new Array(65, 66, 67, 68, 69, 70, 71, 72, 73,
    74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90);

//配列(乱数を格納する)
let rnd = new Array();





//グローバル変数群
let mondai = ""; //問題の文字列を格納
let cnt = 0; //何問目か格納
let typStart, typEnd; //開始時と終了時の時刻を格納





//関数(乱数を100個作成して配列rndに格納する)
function ransu() {
    for (let i = 0; i < 100; i++) {
        rnd[i] = Math.floor(Math.random() * 26);
    }
}


//関数(タイピングゲームの問題をセットする)
function gameSet() {
    //問題文とカウント数をクリアする
    mondai = "";
    cnt = 0;

    //乱数作成関数の呼び出し
    ransu();

    //問題文の作成（配列mojiの要素をランダムに100文字繋げる）
    //mondai= "" + moji[rnd[0]] + moji[rnd[1]] + … + moji[rnd[199]]となる
    for (let i = 0; i < 100; i++) {
        mondai = mondai + moji[rnd[i]];
    }

    //問題枠に表示する
    document.getElementById("flame").innerHTML = mondai;
}


//関数(キー入力を受け取る)
function typeGame(evt) {
    let kc; //入力されたキーコードを格納する変数

    //入力されたキーのキーコードを取得
    if (document.all) {
        kc = event.keyCode;
    } else {
        kc = evt.which;
    }
    //入力されたキーコードと、問題文のキーコードを比較
    if (kc == kcode[rnd[cnt]]) {
        //以下、キーコードが一致した時の処理

        //最初の1文字が入力された時間を記録する
        if (cnt == 0) {
            typStart = new Date();
        }

        cnt++; //カウント数を＋１にする

        //全文字入力したか確認
        if (cnt < 100) {
            //問題文の頭の一文字を切り取る
            mondai = mondai.substring(1, mondai.Length);

            //問題枠に表示する
            document.getElementById("flame").innerHTML = mondai;
        } else {
            //全文字入力していたら、終了時間を記録する
            typEnd = new Date();

            //終了時間－開始時間で掛かったミリ秒を取得する
            let keika = typEnd - typStart;

            //1000で割って「切捨て」、秒数を取得
            let sec = Math.floor(keika / 1000);

            //1000で割った「余り(%で取得できる）」でミリ秒を取得
            let msec = keika % 1000;

            //問題終了を告げる文字列を作成
            let fin = "GAME終了　時間：" + sec + "秒" + msec;

            //問題枠にゲーム終了を表示
            document.getElementById("flame").innerHTML = fin;
        }
    }
}