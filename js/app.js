//constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;

}

//realiza la cotizacion con los datos, creamos el prototype
//usamos function porque devemos ingresar a la function con .this para tener los datos
Seguro.prototype.cotizarSeguro = function(){
    /*
        1= americano 1.15
        2 =asiaticos 1.05
        3 = europeo 1.35
        
    */ 
   //console.log(this.marca)
   let cantidad;
   const base = 2000;
   switch(this.marca){
       case '1':
           cantidad = base * 1.15;
           break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
                cantidad = base * 1.35;
                break;    
    default:
        break;
   }

   //leer el año
   //en el algoritmo en cada año, la diferencia sea mayor, el costo se reduce en 3% el costo del seguro
   const diferencia = new Date().getFullYear() - this.year;

   //cada año que la diferencioa es mayor, el costo va a redusirse un 3%
   cantidad -=((diferencia * 3) * cantidad) / 100;
   /*
    si el seguro es basico se multiplica por  un 30% mas
    si el seguro es completo se multiplica por  un 50% mas
   */ 

        if(this.tipo === 'basico'){
            cantidad *= 1.30;
        }else{
            cantidad *= 1.50;
        }

   //console.log(cantidad)
}


function UI(){}

//llena las opciones con los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');
    // for para crear los años en js
    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent= i;
        selectYear.appendChild(option);
    }
}


//muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo)=>{
    
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto')
    }
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    //insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');//llamamos el query
    //insert before ingresas el nuevo nodod, y el de referencia
    formulario.insertBefore(div, document.querySelector('#resultado'));//insertamos antes que el id =resultado
    setTimeout(()=>{
        div.remove();
    }, 3000)
}

UI.prototype.mostrarResultado = (total, seguro)=>{
    console.log(total)
    //crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    //innerhtnml cuando queremos modificar html, text conntent cuando no hay nada
    div.innerHTML= `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total: ${total}</p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
    

    //mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(()=>{
            spinner.style.display = 'none';//se borra el spinner y se muestra el resultado
            resultadoDiv.appendChild(div);

    },2000)
}


//instanciar UI , fuera del addEventListener para ejecutarlo en varias funciones
const ui= new UI();
//console.log(ui)
//documnetos que se ejecuntan al cargar la pagina
document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones(); //llena el select con los años

})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);//escuchamos el evento por el envio del formulario
}

//si lleva submit debe llegar el prevent default()
function cotizarSeguro(e){
    e.preventDefault();

    //leer la marca seleccionada y accedemos a su valor .value
    const marca = document.querySelector('#marca').value;
    //console.log(marca)

    //leer el año seleccionado y accedemos a su valor con .value
    const year = document.querySelector('#year').value;
    //console.log(year)
    //leer el tipo de cobertura, y leer el radio button con input
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //console.log(tipo)
    if( marca ==='' || year === '' || tipo ===''){
       //console.log('no paso la verificacion')
       ui.mostrarMensaje('Todos los campos son obligatorios')
       return;//lo dejamos pegados si no se pasa la validacion
    }

    ui.mostrarMensaje('Cotizando...','exito')
    //console.log('cotizando...')
    
    //instanciar el seguro

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    
    console.log(total)


    //instanciar el prototy7pe que vamos a cotizar

 ui.mostrarResultado(total, seguro)
}