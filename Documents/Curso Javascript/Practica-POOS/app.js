const formulario = document.querySelector("#formulario");
const cardEstudiantes = document.querySelector("#cardEstudiantes");
const cardProfesores = document.querySelector("#cardProfesores");
const templateEstudiante = document.querySelector(
  "#templateEstudiante"
).content;
const templateProfesor = document.querySelector("#templateProfesor").content;
const alert = document.querySelector(".alert");

const estudiantes = [];
const profesores = [];

// Añadimos un event listener al documento para escuchar cualquier clic
document.addEventListener('click', e => {
    // Imprimimos en la consola el valor del atributo data-uid del elemento clicado
    //console.log(e.target.dataset.nombre);

    // Verificamos si el elemento clicado tiene un atributo data-uid
    if(e.target.dataset.uid){
        // Verificamos si el elemento clicado tiene la clase "btn-success"
        if(e.target.matches(".btn-success")){
            // Recorremos la lista de estudiantes
            estudiantes.map(item => {
                // Si el nombre del estudiante coincide con el data-uid del elemento clicado
                if(item.uid === e.target.dataset.uid){
                    // Cambiamos el estado del estudiante a true (aprobado)
                    item.setEstado = true;
                }
                // Imprimimos el estudiante en la consola
                console.log(item);
                // Devolvemos el estudiante modificado
                return item;
            });
        }

        // Verificamos si el elemento clicado tiene la clase "btn-danger"
        if(e.target.matches(".btn-danger")){
            // Recorremos la lista de estudiantes
            estudiantes.map(item => {
                // Si el nombre del estudiante coincide con el data-uid del elemento clicado
                if(item.uid === e.target.dataset.uid){
                    // Cambiamos el estado del estudiante a false (reprobado)
                    item.setEstado = false;
                }
                // Imprimimos el estudiante en la consola
                console.log(item);
                // Devolvemos el estudiante modificado
                return item;
            });
        }

        // Actualizamos la interfaz de usuario para reflejar los cambios en la lista de estudiantes
        Persona.mostrarPersonaUI(estudiantes, "Estudiante")
    }
});

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.uid = `${Date.now()}`; //convierte un numero a string 
  }
  static mostrarPersonaUI(personas, tipo) {
    if (tipo === "Estudiante"){
        cardEstudiantes.textContent = "";
        const fragment = document.createDocumentFragment();

        personas.forEach((item) => {
            fragment.appendChild(item.agregarNuevoEstudiante());
        });
        cardEstudiantes.appendChild(fragment);
        
    }

    if(tipo === "Profesor"){
        cardProfesores.textContent = "";
        const fragment = document.createDocumentFragment();
        personas.forEach((item) => { 
            fragment.appendChild(item.agregarNuevoProfesor());   
        });
        cardProfesores.appendChild(fragment);
    }
  }
}

class Estudiante extends Persona {
  #estado = true;
  #estudiante = "Estudiante";
  
  set setEstado(estado) {
    this.#estado = estado;
  }

  get getEstudiante() {
    return this.#estudiante;
  }

  agregarNuevoEstudiante() {
    const clone = templateEstudiante.cloneNode(true);
    clone.querySelector("h5 .text-primary").textContent = this.nombre;
    clone.querySelector("p").textContent = `Edad: ${this.edad}`;
    clone.querySelector("h6").textContent = this.getEstudiante;
    if(this.#estado) {
        clone.querySelector('.badge').className = "badge bg-success";
        clone.querySelector('.btn-success').disabled = true;
        clone.querySelector('.btn-danger').disabled = false;
    }else {
        clone.querySelector('.badge').className = "badge bg-danger";
        clone.querySelector('.btn-danger').disabled = true;
        clone.querySelector('.btn-success').disabled = false;
    }
    clone.querySelector(".badge").textContent = this.#estado 
        ? "Aprobado" 
        : "Reprobado";
    
    clone.querySelector('.btn-success').dataset.uid =this.uid;
    clone.querySelector('.btn-danger').dataset.uid = this.uid;
    return clone;
  }
}

class Profesor extends Persona {

    #profesor = "Profesor"

    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#profesor;
        clone.querySelector(".lead").textContent = `Edad: ${this.edad}`;
        


        return clone;
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  
    alert.classList.add("d-none");
    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];

    if(!nombre.trim() || !edad.trim() || !opcion.trim()){
        console.log('algun dato esta en blanco');
        alert.classList.remove("d-none");

        return
    }

    
    if (opcion === "Estudiante") {
        const estudiante = new Estudiante(nombre, edad)
        estudiantes.push(estudiante);
        Persona.mostrarPersonaUI(estudiantes, opcion);
    }
    if (opcion === "Profesor") {
        const profesor = new Profesor(nombre, edad);
        profesores.push(profesor);
        Persona.mostrarPersonaUI(profesores, opcion);

    }
   
  });