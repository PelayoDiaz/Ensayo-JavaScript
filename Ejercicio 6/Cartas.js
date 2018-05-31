"use strict";
class Juego {
    constructor(){
        this.cartas = new Array( 
        {numero: '1', seleccionado: false}, {numero: '2', seleccionado: false}, 
        {numero: '3', seleccionado: false}, {numero: '4', seleccionado: false}, 
        {numero: '5', seleccionado: false}, {numero: '6', seleccionado: false}, 
        {numero: '7', seleccionado: false}, {numero: '8', seleccionado: false}, 
        {numero: '1', seleccionado: false}, {numero: '2', seleccionado: false}, 
        {numero: '3', seleccionado: false}, {numero: '4', seleccionado: false}, 
        {numero: '5', seleccionado: false}, {numero: '6', seleccionado: false}, 
        {numero: '7', seleccionado: false}, {numero: '8', seleccionado: false} );
        this.intentos = 0;
        this.seleccion1 = "";
        this.seleccion2 = "";
        this.idJ1 = "";
        this.idJ2 = "";
        this.acierto=true;
        this.borrar=false;
    }
    
    iniciarJuego () {  
        var dato = document.getElementById("juego");
        dato.style.opacity = 1;
        this.asignaValores(0);  
    }
    
    getRandom(){
        
        return Math.random() - 0.5
    }
    
    asignaValores(opcion){
        this.cartas.sort(this.getRandom);
        for ( var i = 0 ; i < 16 ; i++ ) {
            var carta = this.cartas[i].numero;
            var dato = document.getElementById( i.toString() );
            dato.dataset.valor = carta;
            if (opcion==1){
                this.vaciar();
                this.colorCambio( i, 'black', '?');
                this.intentos=0;
                document.getElementById("texto").value=this.intentos;
            }
        }
    }
    
    colorCambio (posicion, color, contenido) {
        document.getElementById(posicion.toString()).style.backgroundColor = color;
        document.getElementById(posicion.toString()).innerHTML = contenido;
    }
    
    girarCarta () {
        if (this.acierto==false && this.borrar==true){
            this.controlDiferencias();
        }
        
        var evento = window.event;

        this.seleccion2 = evento.target.dataset.valor;
        this.idJ2 = evento.target.id;


        if ( this.seleccion1 !== "" ) {
            if ( this.seleccion1 === this.seleccion2 && this.idJ1 !== this.idJ2 && this.cartas[parseInt(this.idJ2)].seleccionado != true &&               this.cartas[parseInt(this.idJ1)].seleccionado != true) {
                this.cartas[parseInt(this.idJ1)].seleccionado = true;
                this.cartas[parseInt(this.idJ2)].seleccionado = true;

                this.colorCambio(this.idJ2, "blue", this.seleccion2);
                this.vaciar();
                this.comprobar();
                this.acierto=true;
                this.borrar=false;
                
            }else if(this.idJ1 !== this.idJ2){
                this.colorCambio(this.idJ2, "blue", this.seleccion2);
                this.acierto=false;
                this.borrar=true;
                
            }
        } else if(this.seleccion2 !== "valor") {
            this.colorCambio(this.idJ2, "blue", this.seleccion2);
            this.seleccion1 = this.seleccion2;
            this.idJ1 = this.idJ2;
            this.borrar=false;
            this.actualizarIntentos();
        }
    }
    
    actualizarIntentos(){
        this.intentos++;
        document.getElementById("texto").value=this.intentos;
    }
    
    controlDiferencias(){
        this.colorCambio(this.idJ1, "black", "?");
        this.colorCambio(this.idJ2, "black", "?");
        this.vaciar();
    }
    
    vaciar() {
        this.seleccion1 = ""; 
        this.seleccion2 = ""; 

        this.idJ1 = "";
        this.idJ2 = "";
    }
    
    comprobar() {
        var aciertos = 0;
        for( var i = 0 ; i < 16 ; i++ ){
            if (this.cartas[i].seleccionado == true ) {
                aciertos ++;
            }
        }
        if(aciertos == 16){
            alert("¡Has Ganado!");
        }
    }
}

var juego = new Juego();