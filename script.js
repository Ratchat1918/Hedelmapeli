const panos = document.getElementById("panos_input");
let nykyinen_saldo = 50;
const h1_saldo = document.getElementById("h1_saldo");
h1_saldo.textContent = `RAHAA: ${nykyinen_saldo}€`;
let ensimainen_pyöräytys = true;
let symboli_lista = [];
let voitto_var = 0;
let slot1_islocked=false; 
let slot2_islocked=false;
let slot3_islocked=false;
let slot4_islocked=false;
let slot5_islocked=false;
let slot_list=[slot1_islocked,slot2_islocked,slot3_islocked,slot4_islocked,slot5_islocked];
console.log(slot_list);
let slot1_value;
let slot2_value;
let slot3_value;
let slot4_value;
let slot5_value;
let slot_value_list=[slot1_value,slot2_value,slot3_value,slot4_value,slot5_value];

//1="7" 2="omena" 3="meloni" 4="päärymä" 5="kirsikka"

//main function
function Pelata() {
    console.log(ensimainen_pyöräytys);
    let nykyinen_panos2 = parseFloat(panos.value);
    if (nykyinen_panos2 > nykyinen_saldo) {
        document.getElementById("huomio").textContent = "Panos ei saa olla isompi kuin saldo, paina 'Restart alottamaan uudelleen'";
        return;
    } else {
        document.getElementById("huomio").textContent="";
    }
//generating indexes of images
    function generateSlots() {
        if (ensimainen_pyöräytys===false) {
            symboli_lista.length = 0;
        }
        for (let x = 0; x < 5; x++) {
            let number = Math.floor((Math.random() * 5) + 1);
            symboli_lista.push(number);
        }
//checking if any of the reels are locked and adding those into a new list
        for(let x=0; x<5;x++){
            if(slot_list[x]===true){
                symboli_lista[x]=slot_value_list[x];
            }
        }
        console.log(symboli_lista);
    }
//adding images according to ther index
    function calculateWin() {
        let nykyinen_panos = parseFloat(panos.value);
        let numero1_maara = 0;
        let numero2_maara = 0;
        let numero3_maara = 0;
        let numero4_maara = 0;
        let numero5_maara = 0;

        for (let x = 0; x < symboli_lista.length; x++) {
            if (symboli_lista[x] === 1) {
                document.getElementById(`slot${x}`).innerHTML = `<img src=kuvat/seitseman.png>`;
                numero1_maara += 1;
            }
            else if (symboli_lista[x] === 2) {
                document.getElementById(`slot${x}`).innerHTML = `<img src=kuvat/omena.png>`;
                numero2_maara += 1;
            }
            else if (symboli_lista[x] === 3) {
                document.getElementById(`slot${x}`).innerHTML = `<img src=kuvat/meloni.png>`;
                numero3_maara += 1;
            }
            else if (symboli_lista[x] === 4) {
                document.getElementById(`slot${x}`).innerHTML = `<img src=kuvat/päärymää.png>`;
                numero4_maara += 1;
            }
            else if (symboli_lista[x] === 5) {
                document.getElementById(`slot${x}`).innerHTML = `<img src=kuvat/kirsikka.png>`;
                numero5_maara += 1;
            }
        }
//counting the amount of specific imagers and calculating win or lose
        if (numero1_maara === 4) {
            voitto_var += nykyinen_panos * 10;
            document.getElementById("voitto").textContent = `Voitto: ${voitto_var}€`;
        }
        else if (numero1_maara === 3) {
            voitto_var += nykyinen_panos * 5;
            document.getElementById("voitto").textContent = `Voitto: ${voitto_var}€`;
        }
        if (numero2_maara === 4) {
            voitto_var += nykyinen_panos * 6;
            document.getElementById("voitto").textContent = `Voitto: ${voitto_var}€`;
        }
        if (numero3_maara === 4) {
            voitto_var += nykyinen_panos * 5;
            document.getElementById("voitto").textContent = `Voitto: ${voitto_var}€`;
        }
        if (numero4_maara === 4) {
            voitto_var += nykyinen_panos * 4;
            document.getElementById("voitto").textContent = `Voitto: ${voitto_var}€`;
        }
        if (numero5_maara === 4) {
            voitto_var += nykyinen_panos * 3;
            document.getElementById("voitto").textContent = `Voitto: ${voitto_var}€`;
        }
        else {
            nykyinen_saldo -= nykyinen_panos;
            document.getElementById("h1_saldo").textContent = `RAHAA: ${nykyinen_saldo}€`;
        }
    }

    ensimainen_pyöräytys = false;
    function lukitaRulla(){
        if(ensimainen_pyöräytys===false  && voitto_var===0){
            document.getElementById("lock_viesti").textContent="valitse haluamasi lukita rullat";
            for(let x=1;x<6;x++){
                document.getElementById(`lukitse${x}`).innerHTML=`<button id="lock${x}">Lukitse</button>`;
            }
            document.getElementById('lock1').onclick = function() {
                slot1_islocked=true;
                slot1_value=symboli_lista[0];
                console.log(slot1_value);
            }
            document.getElementById('lock2').onclick = function() {
                slot2_islocked=true;
                slot2_value=symboli_lista[1];
            }
            document.getElementById('lock3').onclick = function() {
                slot3_islocked=true;
                slot3_value=symboli_lista[2];
            }
            document.getElementById('lock4').onclick = function() {
                slot4_islocked=true;
                slot4_value=symboli_lista[3];
            }
            document.getElementById('lock5').onclick = function() {
                slot5_islocked=true;
                slot5_value=symboli_lista[4];
                console.log(slot5_value);
            }
        }
    }
    generateSlots();
    calculateWin();
    lukitaRulla()
    console.log(slot_list);
}

function stopKierros() {
    ensimainen_pyöräytys=true;
    symboli_lista.length = 0;
    nykyinen_saldo += voitto_var;
    document.getElementById("voitto").textContent = "";
    document.getElementById("h1_saldo").textContent = `RAHAA: ${nykyinen_saldo}€`;
    for (let x = 0; x < 5; x++) {
        document.getElementById(`slot${x}`).innerHTML = "";
    }
    voitto_var = 0;
}

function restartPeli() {
    window.location.reload();
}

document.getElementById("playBtn").addEventListener("click", Pelata);
document.getElementById("restartBtn").addEventListener("click", restartPeli);
document.getElementById("stopBtn").addEventListener("click", stopKierros);
