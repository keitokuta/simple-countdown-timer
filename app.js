var hoursInput = document.getElementById("hours");
var minutesInput = document.getElementById("minutes");
var startButton = document.getElementById("start");
var countdownDisplay = document.getElementById("countdown");

let timer = null; // タイマーの参照を保持

startButton.addEventListener("click", function () {
    var hours = parseInt(hoursInput.value) || 0;
    var minutes = parseInt(minutesInput.value) || 0;

    // 時間と分の両方が0の場合はエラー
    if (hours === 0 && minutes === 0) {
        alert("時間または分を入力してください");
        return;
    }

    // 既存のタイマーがあれば停止
    if (timer) {
        clearInterval(timer);
    }

    // カウントダウン開始時間を計算（単位：秒）
    let count = hours * 3600 + minutes * 60;

    // ボタンのテキストを変更
    startButton.textContent = "停止";

    // 1秒ごとにカウントダウンを実行
    timer = setInterval(function () {
        // 残り時間を計算
        let remainingHours = Math.floor(count / 3600);
        let remainingMinutes = Math.floor((count % 3600) / 60);
        let remainingSeconds = count % 60;

        // 残り時間を表示（0埋めフォーマット）
        let timeString = "";
        if (remainingHours > 0) {
            timeString = String(remainingHours).padStart(2, "0") + ":" + String(remainingMinutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
        } else {
            timeString = String(remainingMinutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
        }

        countdownDisplay.innerText = timeString;

        // カウントダウン
        count--;

        // 残り時間が0になったらタイマーを停止
        if (count < 0) {
            clearInterval(timer);
            timer = null;
            countdownDisplay.innerText = "00:00";
            startButton.textContent = "スタート";
            alert("時間になりました！");
        }
    }, 1000);

    // 停止ボタンの機能
    startButton.onclick = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
            startButton.textContent = "スタート";
            countdownDisplay.innerText = "";
            startButton.onclick = arguments.callee.caller;
        }
    };
});
