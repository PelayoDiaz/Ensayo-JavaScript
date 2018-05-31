"use strict";
class Juego {
    constructor(){
        this.colores = ["AZUL", "NEGRO", "ROJO", "NARANJA", "AMARILLO", "VERDE"];
        this.fondos = ["skyblue", "black", "red", "orange", "yellow", "green"];
        this.color1 = 0;
        this.color2 = 0;
        this.puntos = 0;
        this.tiempo = 0;
        this.contador = null
    }
    
    iniciarJuego(){
        this.reiniciar();
        this.generaColores();
        this.reducir();
        
    }
    
    reiniciar(){
        if (this.contador!=null){
            clearInterval(this.contador);
        }
        this.tiempo=30;
        $("#timer").text(this.tiempo);
        this.puntos=0;
        this.actualizarAciertos(0);
    }
    
    generaColores(){
        if (this.tiempo>0){
            this.color1 = this.getRandom(this.colores.length-1);
            this.color2 = this.getColor(this.color1);
            $("#color").text(this.colores[this.color1]);
            this.rellenaCeldas();
        }
    }
    
    reducir(){
        var self = this;
        this.contador = setInterval(function() {
            if (self.tiempo>0){
                self.tiempo--;
                $("#timer").text(self.tiempo);
            }},1000);
    }
    
    rellenaCeldas(){
        var celda1 = this.getRandom(1);
        var celda2 = (celda1-1)*(-1);
        var fondo1 = this.fondos[this.color2];
        var fondo2 = this.fondos[this.color1];
        
        $("#"+celda1).css('color', fondo1);
        $("#"+celda1).text(this.colores[this.color1]);
        $("#"+celda1).data("valor", this.color2)
        $("#"+celda2).css('color', fondo2);
        $("#"+celda2).text(this.colores[this.color2]);
        $("#"+celda2).data("valor", this.color1);
    }
    
    check(celda){
        if (this.tiempo>0){
            if (this.color1==$("#"+celda).data("valor")){
                this.actualizarAciertos(2);
            }else {
                this.actualizarAciertos(-1);
            }
            this.generaColores();
            }
    }
    
    actualizarAciertos(valor){
        this.puntos+=valor;
        document.getElementById("texto").value=this.puntos;
    }

    getColor(color){
        var valido = false;
        var fondo = 0;
        while (!valido){
            fondo = this.getRandom(this.colores.length-1);
            valido = fondo!=color;
        }
        return fondo;
    }
    
    getRandom(limite){
        return Math.round(Math.random()*limite);
    }
    
}

var juego = new Juego();