const serialNum = document.getElementById("serial-num");
const validBtn = document.getElementById("valid-btn");
const sNumFeedback = document.getElementById("s-num-feedback");
validBtn.disabled = true;
function enableValidBtn() {
    let serialNumValue = serialNum.value;
    for (let i=0; i<serialNumValue.length; i++) {
        if ((i==4 || i==9 || i==14) && (serialNumValue[i]!="-")) {
            serialNumValue = serialNumValue.slice(0, i)+"-"+serialNumValue.slice(i);
        }
        else if (isNaN(serialNumValue[i]) && serialNumValue[i]!="-") {
        serialNumValue = serialNumValue.slice(0,i);
        }
    }
    serialNum.value = serialNumValue;
    if (serialNum.value.length == 19) validBtn.disabled = false;
    else validBtn.disabled = true;
}

function validNum() {
    const serialNumValue=serialNum.value;
    if (verifCondition2(serialNumValue) && verifCondition3(serialNumValue) && verifCondition4(serialNumValue)) sNumFeedback.textContent="numero de série valide";
    else sNumFeedback.textContent="numero de série non-valide";
    
}
function verifCondition2(num) {
    for (i=0; i<4; i++) {
        if (num[i] != num[13-i]) {
            console.log("etape2 non validée")
            return false;
        }
    }
    console.log("etape2 validée")
    return true;
}
function verifCondition3(num) {
    let g3 = parseFloat(num[10] + num[11] + num[12] + num[13]);
    let g37 = g3*7;
    let st37 = String(g37);
    for (i=0; i<4; i++) {
        if (num[8-i] != st37[st37.length - 1 - i]) {
            console.log("etape3 non validée")
            return false;
        }
    }
    console.log("etape3 validée")
    return true;
}
function verifCondition4(num) {
    let g1 = parseFloat(num[0] + num[1] + num[2] + num[3]);
    let g2 = parseFloat(num[5] + num[6] + num[7] + num[8]);
    let g3 = parseFloat(num[10] + num[11] + num[12] + num[13]);
    let g4 = parseFloat(num[15] + num[16] + num[17] + num[18]);
    let gresult = (g1 + g2 + g3 + g4) / 10000;
    if (!Number.isInteger(gresult)) {
        console.log("etape4 non validée")
        return false;
    }
    console.log("etape4 validée")
    return true;
}

serialNum.addEventListener("input", enableValidBtn);
validBtn.addEventListener("click", validNum);
