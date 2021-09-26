//画面起動時
//変数定義
let turn = 0 // 🔵1,🔴-1
    //盤面状況を二次元配列で定義
let ban_ar = new Array(8)
for (let x = 0; x < ban_ar.length; x++) {
    ban_ar[x] = new Array(8)
}

//テーブル取得
let ban = document.getElementById('field')

//取得したテーブルに盤面生成
ban_new()

//盤面の初期化
for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
        let select_cell = ban.rows[x].cells[y];
        select_cell.onclick = function() {
            //クリックしたら石がないかを確認。ターン側の石が置けるかをチェック。おける場合は盤面を更新。相手のターンに移る
            if (ban_ar[this.parentNode.rowIndex][this.cellIndex] == 0) {
                if (check_reverse(this.parentNode.rowIndex, this.cellIndex) > 0) {
                    ban_set()
                    cheng_turn()
                }
            }
        }
    }
}

//テーブルで盤面を作成
function ban_new() {
    for (let x = 0; x < 8; x++) {
        let tr = document.createElement("tr")
        ban.appendChild(tr)
        for (let y = 0; y < 8; y++) {
            let td = document.createElement("td")
            tr.appendChild(td)
        }
    }
};

//盤面を初期化する処理
function ban_init() {
    //全てをクリア
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            ban_ar[x][y] = 0
        }
    }
    //真ん中に🔴🔵を配列(スタート時)
    ban_ar[3][3] = -1
    ban_ar[4][3] = 1
    ban_ar[3][4] = 1
    ban_ar[4][4] = -1
    ban_set()

    //ターン初期化
    turn = 0
    cheng_turn()
};

//配列の状態を実際の盤面へ反映
function ban_set() {
    let stone = ""
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            switch (ban_ar[x][y]) {
                case 0:
                    stone = "";
                    break;
                case -1:
                    stone = "🔴";
                    break;
                case 1:
                    stone = "🔵";
                    break;
            }
            ban.rows[x].cells[y].innerText = stone;
        }
    }
    return true
};
/*
let img1 = document.write('<img src="./white.png" alt="">');
let img2 = document.write('<img src="./black.png" alt="">');
*/
// ターンを変更する処理
function cheng_turn() {
    let tarn_msg = document.getElementById('view_tarn')
    if (turn == 0) {
        // 0は最初として、メッセージのみで処理終了
        turn = 1
        tarn_msg.textContent = "🔵の番です。"
        return
    }
    // ターンを変更
    turn = turn * -1
        // ターンを交代して、置けるところがあるか確認する
        // 現状の配置をバックアップ
    let ban_bak = new Array(8)
    let check_reverse_cnt = 0
    for (let i = 0; i < ban_ar.length; i++) {
        ban_bak[i] = new Array(8)
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            ban_bak[x][y] = ban_ar[x][y]
        }
    }

    // 左端からすべてのマスの確認を行う
    let white_cnt = 0
    let black_cnt = 0
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            // 空🔴マスのみおけるのでチェック
            // それ以外は石の数を加算
            switch (ban_ar[x][y]) {
                case 0:
                    check_reverse_cnt = check_reverse_cnt + check_reverse(x, y)
                        // バックアップから元に戻す
                    for (let i = 0; i < 8; i++) {
                        for (let ii = 0; ii < 8; ii++) {
                            ban_ar[i][ii] = ban_bak[i][ii]
                        }
                    }
                    break;
                case -1:
                    white_cnt++
                    break
                case 1:
                    black_cnt++
                    break
            }
        }
    }
    // 🔴と🔵の合計が8*8=64の場合は処理終了
    if (white_cnt + black_cnt == 64 || white_cnt == 0 || black_cnt == 0) {
        if (white_cnt == black_cnt) {
            alert("勝負は引分です。")
        } else if (white_cnt > black_cnt) {
            alert("勝負は、🔵：" + black_cnt + "対、🔴：" + white_cnt + "で、🔴の勝ちです。")
        } else {
            alert("勝負は、🔵：" + black_cnt + "対、🔴：" + white_cnt + "で、🔵の勝ちです。")
        }

    } else {
        // 置ける場所がない場合は、ターンを相手に戻す
        if (check_reverse_cnt == 0) {
            switch (turn) {
                case -1:
                    alert("🔴の置ける場所がありません。続けて🔵の番となります。")
                    turn = turn * -1
                    break;
                case 1:
                    alert("🔵の置ける場所がありません。続けて🔴の番となります。")
                    turn = turn * -1
                    break;
            }
        }
    }

    // ターンを表示する
    switch (turn) {
        case -1:
            tarn_msg.textContent = "🔴の番です。";
            break;
        case 1:
            tarn_msg.textContent = "🔵の番です。";
            break;
    }
};

// 指定したセルにターン側の石が置けるか確認
function check_reverse(row_index, cell_indx) {
    let reverse_cnt = 0
        // 各方向へリーバース出来るか確認
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, -1, 0) //上
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, -1, 1) //右上
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 0, 1) //右
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 1, 1) //右下
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 1, 0) //下
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 1, -1) //左下
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 0, -1) //左
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, -1, -1) //左上

    return reverse_cnt
}

// 指定したセルから指定した方向へreverseを行う
function line_reverse(row_index, cell_indx, add_x, add_y) {
    // 最初に今の盤状況を退避する
    let ban_bak = new Array(8)
    for (let i = 0; i < ban_ar.length; i++) {
        ban_bak[i] = new Array(8)
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            ban_bak[x][y] = ban_ar[x][y]
        }
    }
    let line_reverse_cnt = 0 // 裏返した数
    let turn_flg = 0 // 自分の色の石があるのか
    let xx = row_index // 指定したセルの位置(行)
    let yy = cell_indx // 指定したセルの位置(列)
        // 指定したセルから指定された方向へ移動し
        // 完了条件になるまで石を裏返す
    while (true) {
        xx = xx + add_x
        yy = yy + add_y
            // 盤の端に到達したら抜ける
        if (xx < 0 || xx > 7 || yy < 0 || yy > 7) {
            break;
        }
        // 移動先のセルに石がなかったら抜ける
        if (ban_ar[xx][yy] == 0) {
            break;
        }
        // 移動先のセルが自分自身であれば、石があった事を判定し抜ける
        if (ban_ar[xx][yy] == turn) {
            turn_flg = 1
            break;
        }
        // 上記以外は相手の石で有るので、裏返して裏返した件数を加算
        ban_ar[xx][yy] = ban_ar[xx][yy] * -1
        line_reverse_cnt++
    }
    // 裏返しを行ったが、移動先に自分の石がなかった場合は元に戻す
    if (line_reverse_cnt > 0) {
        if (turn_flg == 0) {
            for (let i = 0; i < 8; i++) {
                for (let ii = 0; ii < 8; ii++) {
                    ban_ar[i][ii] = ban_bak[i][ii]
                    line_reverse_cnt = 0
                }
            }
        } else {
            // ちゃんと裏返しが出来たら、置いた所に自分の石を置く
            ban_ar[row_index][cell_indx] = turn
        }
    }

    // 最後に裏返しを行った件数を戻す
    return line_reverse_cnt
}
//
// ターンを変更する処理
function cheng_turn() {
    let tarn_msg = document.getElementById('view_tarn')
    if (turn == 0) {
        // 0は最初として、メッセージのみで処理終了
        turn = 1
        tarn_msg.textContent = "🔵の番です。"
        return
    }
    // ターンを変更
    turn = turn * -1
        // ターンを交代して、置けるところがあるか確認する
        // 現状の配置をバックアップ
    let ban_bak = new Array(8)
    let check_reverse_cnt = 0
    for (let i = 0; i < ban_ar.length; i++) {
        ban_bak[i] = new Array(8)
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            ban_bak[x][y] = ban_ar[x][y]
        }
    }

    // 左端からすべてのマスの確認を行う
    let white_cnt = 0
    let black_cnt = 0
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            // 空🔴マスのみおけるのでチェック
            // それ以外は石の数を加算
            switch (ban_ar[x][y]) {
                case 0:
                    check_reverse_cnt = check_reverse_cnt + check_reverse(x, y)
                        // バックアップから元に戻す
                    for (let i = 0; i < 8; i++) {
                        for (let ii = 0; ii < 8; ii++) {
                            ban_ar[i][ii] = ban_bak[i][ii]
                        }
                    }
                    break;
                case -1:
                    white_cnt++
                    break
                case 1:
                    black_cnt++
                    break
            }
        }
    }
    // 🔴と🔵の合計が8*8=64の場合は処理終了
    if (white_cnt + black_cnt == 64 || white_cnt == 0 || black_cnt == 0) {
        if (white_cnt == black_cnt) {
            alert("勝負は引分です。")
        } else if (white_cnt > black_cnt) {
            alert("勝負は、🔵：" + black_cnt + "対、🔴：" + white_cnt + "で、🔴の勝ちです。")
        } else {
            alert("勝負は、🔵：" + black_cnt + "対、🔴：" + white_cnt + "で、🔵の勝ちです。")
        }

    } else {
        // 置ける場所がない場合は、ターンを相手に戻す
        if (check_reverse_cnt == 0) {
            switch (turn) {
                case -1:
                    alert("🔴の置ける場所がありません。続けて🔵の番となります。")
                    turn = turn * -1
                    break;
                case 1:
                    alert("🔵の置ける場所がありません。続けて🔴の番となります。")
                    turn = turn * -1
                    break;
            }
        }
    }

    // ターンを表示する
    switch (turn) {
        case -1:
            tarn_msg.textContent = "🔴の番です。";
            break;
        case 1:
            tarn_msg.textContent = "🔵の番です。";
            break;
    }
};

// 指定したセルにターン側の石が置けるか確認
function check_reverse(row_index, cell_indx) {
    let reverse_cnt = 0
        // 各方向へリーバース出来るか確認
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, -1, 0) //上
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, -1, 1) //右上
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 0, 1) //右
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 1, 1) //右下
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 1, 0) //下
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 1, -1) //左下
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, 0, -1) //左
    reverse_cnt = reverse_cnt + line_reverse(row_index, cell_indx, -1, -1) //左上

    return reverse_cnt
}

// 指定したセルから指定した方向へreverseを行う
function line_reverse(row_index, cell_indx, add_x, add_y) {
    // 最初に今の盤状況を退避する
    let ban_bak = new Array(8)
    for (let i = 0; i < ban_ar.length; i++) {
        ban_bak[i] = new Array(8)
    }
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            ban_bak[x][y] = ban_ar[x][y]
        }
    }
    let line_reverse_cnt = 0 // 裏返した数
    let turn_flg = 0 // 自分の色の石があるのか
    let xx = row_index // 指定したセルの位置(行)
    let yy = cell_indx // 指定したセルの位置(列)
        // 指定したセルから指定された方向へ移動し
        // 完了条件になるまで石を裏返す
    while (true) {
        xx = xx + add_x
        yy = yy + add_y
            // 盤の端に到達したら抜ける
        if (xx < 0 || xx > 7 || yy < 0 || yy > 7) {
            break;
        }
        // 移動先のセルに石がなかったら抜ける
        if (ban_ar[xx][yy] == 0) {
            break;
        }
        // 移動先のセルが自分自身であれば、石があった事を判定し抜ける
        if (ban_ar[xx][yy] == turn) {
            turn_flg = 1
            break;
        }
        // 上記以外は相手の石で有るので、裏返して裏返した件数を加算
        ban_ar[xx][yy] = ban_ar[xx][yy] * -1
        line_reverse_cnt++
    }
    // 裏返しを行ったが、移動先に自分の石がなかった場合は元に戻す
    if (line_reverse_cnt > 0) {
        if (turn_flg == 0) {
            for (let i = 0; i < 8; i++) {
                for (let ii = 0; ii < 8; ii++) {
                    ban_ar[i][ii] = ban_bak[i][ii]
                    line_reverse_cnt = 0
                }
            }
        } else {
            // ちゃんと裏返しが出来たら、置いた所に自分の石を置く
            ban_ar[row_index][cell_indx] = turn
        }
    }

    // 最後に裏返しを行った件数を戻す
    return line_reverse_cnt
}