let prezzoOrarioBE = 20.50;
let prezzoOrarioFE = 15.30;
let prezzoOrarioAP = 33.60;
let prezzoTot;
let res = '';
let errMsg = '';
let error = {nome: '', cognome: '', email: '', tipoLavoro: '', codiceProm: '', condition: ''};
let dati = {nome: '', cognome: '', email: '', tipoLavoro: '', codiceProm: '', condition: ''};
let arrCodiciProm = ['YHDNU32','JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];
let btnSubmit = document.querySelector("#btnCalcola");
let btnSpinner = document.querySelector("#btnSpinner");
//////////// BONUS //////////////////////
let objLavoro = {
    'sviluppo backend' : 'sviluppo backend',
    'sviluppo frontend' : 'sviluppo frontend',
    'analisi progettuale' : 'analisi progettuale',
};
let select = document.getElementById("selectLavoro");
for(let x in objLavoro) {
    select.options[select.options.length] = new Option(objLavoro[x], x); // dove x sono le proprietà sviluppo backend, ecc...
}
//////////////////////////////////////////
function convalidaNomeCognome(str){
    return (str.length > 1 && str.length < 20);
}

function convalidaEmail(email){
    let reg =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
}

function convalidaPassword(password){    // minimo 8 caratteri e deve contenere almeno 1 carattere maiuscolo, 1 carattere minuscolo, una cifra, un carattere speciale di quelli menzionati.
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/; 
	if(reg.test(password)){
		return true;
	}else{
		return false;
	}
}

function applicaTipoLavoro(lavoro){
    lavoro = document.querySelector("select").value;
    if(lavoro == "sviluppo backend"){
        prezzoTot = (prezzoOrarioBE * 10);                 
        res = '€ '+prezzoTot.toFixed(2).replace(".", ",");
    }
    if(lavoro == "sviluppo frontend"){
        prezzoTot =  (prezzoOrarioFE * 10); 
        res = '€ '+prezzoTot.toFixed(2).replace(".", ",");
    }
    if(lavoro== "analisi progettuale"){
        prezzoTot =  (prezzoOrarioAP * 10);
        res = '€ '+prezzoTot.toFixed(2).replace(".", ",");
    }
    return lavoro;
}

function convalidaCodice(arr, codice){
    if(codice !== '' && arr.includes(codice)){
       prezzoTot =  prezzoTot - ((25 * (prezzoTot)) / 100);
       res = '€ '+prezzoTot.toFixed(2).replace(".", ",");
       return true;
    }else if(codice == ''){
        res = '€ '+prezzoTot.toFixed(2).replace(".", ",");
        return true;
    }else{
        return false;
    }
}

function showSpinner(){
    btnSpinner.style.display = 'block';
    btnSubmit.style.display = 'none';
}
function showCalcola(){
    btnSpinner.style.display = 'none';
    btnSubmit.style.display = 'block';
}
btnSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    showSpinner();
    dati.nome = document.querySelector('#nome').value;
    dati.cognome = document.forms[0].elements[1].value; 
    dati.email = document.querySelector("#email").value;
    dati.tipoLavoro = document.querySelector("select").value;
    dati.codiceProm = document.querySelector("#codiceProm").value;
    dati.condition = document.querySelector("#ckbx");
    dati.password = document.querySelector("#password").value;
    // Gestione errori
    error.nome = convalidaNomeCognome(dati.nome) ? '' : 'Devi inserire un nome valido di min 2 e max 20 lettere';
    document.querySelector("form > div > #errorSpanNome").innerHTML = error.nome;
    error.cognome = convalidaNomeCognome(dati.cognome) ? '' : 'Devi inserire un cognome valido di min 2 e max 20 lettere';
    document.querySelector("form > div > #errorSpanCognome").innerHTML = error.cognome;
    error.email = convalidaEmail(dati.email) ? '' : 'Devi inserire una email valida';
    document.querySelector("form > div > #errorSpanEmail").innerHTML = error.email;
    error.password = convalidaPassword(dati.password) ? '' : 'Password deve contenere minimo 8 caratteri, un numero, un carattere maiuscolo ed un carattere speciale';
    document.querySelector("#errorSpanPsw").innerHTML = error.password;
    error.tipoLavoro = applicaTipoLavoro(dati.tipoLavoro) ? '' : 'Devi inserire una tipologia di lavoro';
    document.querySelector("form > div > #errorSpanSelect").innerHTML = error.tipoLavoro;
    error.condition = (dati.condition).checked ? '' : 'Devi accettare le condizioni per continuare';
    document.querySelector("#errorSpanCondition").innerHTML = error.condition;
    error.codiceProm = convalidaCodice(arrCodiciProm, dati.codiceProm) ? '' : 'Il codice inserito non è valido';
    document.querySelector("form > div > #errorSpanCodice").innerHTML = error.codiceProm;
    errMsg+=error.nome+' '+error.cognome+' '+error.email+' '+error.tipoLavoro+' '+error.condition+' '+error.codiceProm;
    if(!(errMsg.trim()).length){
        setTimeout( ()=>{
            document.getElementById("nomeUtente").innerHTML = 'Nome e cognome utente <strong>'+dati.nome+'</strong><strong>'+' '+dati.cognome+'</strong>';           
            document.querySelector('#prezzoFinale > p').innerHTML = '<h3 class="text-danger">'+res+'</h3>';          
            document.getElementById("tipoLavoro").innerHTML = 'Tipo di lavoro '+'<strong>'+dati.tipoLavoro+'</strong>';
            document.getElementById("oreDiLavoro").innerHTML = 'Ore di lavoro: <strong>10</strong>';
            document.getElementById("sconto").innerHTML = 'Sconto applicato '+(arrCodiciProm.includes(dati.codiceProm) ? '<strong>25%</strong>' : '<strong>0%</strong>');           
        }, 2000);
        setTimeout(showCalcola, 3000);
    }
});
