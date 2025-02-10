const panos = document.getElementById("panos_input");
let nykyinen_saldo = 50;
const h1_saldo = document.getElementById("h1_saldo");
h1_saldo.textContent = `RAHAA: ${nykyinen_saldo}€`;
let ensimainen_pyöräytys = true;
let symboli_lista = [];
let voitto_var = 0;
let slot_value_list = [null, null, null, null, null];
let is_lukitaRulla_executed = false;
let stopKierros_isused=false;

// 1="7" 2="omena" 3="meloni" 4="päärymä" 5="kirsikka"
    
// Main function
function Pelata() {
    if (is_lukitaRulla_executed === true) {
        console.log(is_lukitaRulla_executed, "LOCK");
        for (let x = 1; x < 6; x++) {
            document.getElementById(`lukitse${x}`).innerHTML = `<a id="slot${x}"></a>`;
        }
        document.getElementById("lock_viesti").textContent='';
    }

    console.log(symboli_lista);
    let nykyinen_panos2 = parseFloat(panos.value);
    if (nykyinen_panos2 > nykyinen_saldo) {
        document.getElementById("huomio").textContent = "Panos ei saa olla isompi kuin saldo, paina 'Restart alottamaan uudelleen'";
        return;
    } else {
        document.getElementById("huomio").textContent = "";
    }

    // Generating indexes of images
    function generateSlots() {
        if (ensimainen_pyöräytys === false) {
            symboli_lista.length = 0;
        }
        for (let x = 0; x < 5; x++) {
            if (slot_value_list[x] !== null) {
                symboli_lista[x] = slot_value_list[x];
            } else {
                let number = Math.floor((Math.random() * 5) + 1);
                symboli_lista.push(number);
            }
        }
        slot_value_list = [null, null, null, null, null];
    }

    // Adding images according to their index
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

        // Counting the amount of specific images and calculating win or lose
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

    // Function for locking the slots
    function lukitaRulla() {
        if (ensimainen_pyöräytys === false && voitto_var === 0 && stopKierros_isused===false && is_lukitaRulla_executed===false) {
            document.getElementById("lock_viesti").textContent = "valitse haluamasi lukita rullat";
            //creating lock buttons
            for (let x = 1; x < 6; x++) {
                document.getElementById(`lukitse${x}`).innerHTML = `<button id="lock${x}">Lukitse</button>`;
            }
            // Assigning click handlers to lock buttons
            document.getElementById('lock1').onclick = function () {
                document.getElementById('lock1').style.backgroundColor = "aquamarine";
                is_lukitaRulla_executed = true;
                slot_value_list[0] = symboli_lista[0];
            };
            document.getElementById('lock2').onclick = function () {
                document.getElementById('lock2').style.backgroundColor = "aquamarine";
                is_lukitaRulla_executed = true;
                slot_value_list[1] = symboli_lista[1];
            };
            document.getElementById('lock3').onclick = function () {
                document.getElementById('lock3').style.backgroundColor = "aquamarine";
                is_lukitaRulla_executed = true;
                slot_value_list[2] = symboli_lista[2];
            };
            document.getElementById('lock4').onclick = function () {
                document.getElementById('lock4').style.backgroundColor = "aquamarine";
                is_lukitaRulla_executed = true;
                slot_value_list[3] = symboli_lista[3];
                is_lukitaRulla_executed2=true;
            };
            document.getElementById('lock5').onclick = function () {
                document.getElementById('lock5').style.backgroundColor = "aquamarine";
                is_lukitaRulla_executed = true;
                slot_value_list[4] = symboli_lista[4];
                is_lukitaRulla_executed2=true;
            };
        }
    }

    generateSlots();
    calculateWin();
    lukitaRulla();
}

function stopKierros() {
    stopKierros_isused=true;
    ensimainen_pyöräytys = true;
    for (let x = 1; x < 6; x++) {
        document.getElementById(`lukitse${x}`).innerHTML = `<a id="slot${x}"></a>`;
    }
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

// Event listeners for buttons
document.getElementById("playBtn").addEventListener("click", Pelata);
document.getElementById("restartBtn").addEventListener("click", restartPeli);
document.getElementById("stopBtn").addEventListener("click", stopKierros);
