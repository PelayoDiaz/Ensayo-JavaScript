"use strict";
class CalculadoraBasica{
    constructor(){}
    
    addCaracter(caracter){
        var valor = document.getElementById('operacion').value;
        if (this.validar(valor, caracter)){
            document.getElementById('operacion').value = valor+caracter;
        }
    }
    
    getResultado(){
        var valor = document.getElementById('operacion').value;
        document.getElementById('operacion').value = eval(valor);
    }
    
    validar(cadena, caracter){
        var lastCaracter = cadena.slice(-1);
        if (caracter!="(" && caracter!=")"){
            if (lastCaracter===caracter){
                return false;
            }
        }
        return true;
    }
    
    borrarTodo(){
        document.getElementById('operacion').value = "";
    }
    
    borrarUltimo(){
        var cadena = document.getElementById('operacion').value;
        var cadenafinal = cadena.slice(0, -1);
        document.getElementById('operacion').value = cadenafinal;
        return cadenafinal;
    }
}

class CalculadoraCientifica extends CalculadoraBasica{
    
    constructor(){
        super();
        this.operaciones = "";
        this.memory = "";
    }
    
    getResultado(){
        var valor = document.getElementById('operacion').value;
        document.getElementById('resultado').value = eval(this.operaciones);
        document.getElementById('operacion').value = "";
        this.operaciones="";
    }
    
    borrarTodo(){
        super.borrarTodo();
        document.getElementById('resultado').value = "";
        this.operaciones="";
    }

    addCaracter(caracter){
        this.addOperaciones(caracter);
        super.addCaracter(caracter);
    }
    
    borrarUltimo(){
        var execut = false;
        execut = this.removeTrigonometri();
        if (!execut){
            execut = this.removePI();
        } if (!execut){
            execut = this.removeE();
        } if (!execut){
            execut = this.removeSqrt();
        } if (!execut){
            execut = this.removeLog();
        } if (!execut){
            execut = this.removeLn();
        } if (!execut){
            this.operaciones = super.borrarUltimo();
        } 
    }
    
    removeE(){
        var operator = this.operaciones.slice(-1);
        if (operator == "E"){
            this.removeMath(-5,-1);
            return true;
        }
    }
    
    removePI(){
        var operator = this.operaciones.slice(-2);
        if (operator == "PI"){
            this.removeMath(-5,-2);
            return true;
        }
    }
    
    removeTrigonometri(){
        var operator = this.operaciones.slice(-4);
        if (operator=="cos(" || operator=="sin(" || operator=="tan("){
            this.removeMath(-5,-4);
            return true;
        }
    }
    
    removeSqrt(){
        var operator = this.operaciones.slice(-5);
        if (operator=="sqrt("){
            this.removeMath(-5,-5);
            return true;
        }
    }
    
    removeLog(){
        var operator = this.operaciones.slice(-6);
        if (operator=="log10("){
            this.removeMath(-7,-4);
            return true;
        }
    }
     removeLn(){
        var operator = this.operaciones.slice(-4);
        if (operator=="log("){
            this.removeMath(-6,-3);
            return true;
        }
     }
    
    removeMath(start, end){
        var toStay = document.getElementById('operacion').value.slice(0, end);
        document.getElementById('operacion').value = toStay;
        var toStay2 = this.operaciones.slice(0, (start+end));
        this.operaciones = toStay2;
    }

    isCientifica(caracter){
        if (caracter=="cos(" || caracter=="sin(" || caracter=="tan(" || 
           caracter=="sqrt(" || caracter=="PI" || caracter=="E"){
            return "Math."+caracter;
        } else if (caracter=="log("){
            return "Math.log10(";
        } else if (caracter=="ln("){
            return "Math.log(";
        }else {
            return caracter;
        }
    }
    
    addOperaciones(caracter){
        this.operaciones += this.isCientifica(caracter);
    }
    
    memorice(){
        if (this.memory==""){
            this.memory = document.getElementById('resultado').value;
        }else{
            this.addCaracter(this.memory);
        }
    }
    forget(){
        this.memory="";
    }
}
var calculadora = new CalculadoraCientifica();