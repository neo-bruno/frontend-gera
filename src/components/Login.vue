<template>
  <div ref="container" class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form class="sign-in-form">
          <h2 class="title">Inicio de Sesion</h2>

          <v-text-field class="input-field" prepend-inner-icon="mdi-cellphone" required type="number"
            v-model="login.cellphone" label="Numero Celular" variant="underlined" counter="8" ref="telefono"
            :error-messages="v$.cellphone.$errors.map(e => e.$message)" @input="v$.cellphone.$touch"
            @blur="v$.cellphone.$touch"></v-text-field>

          <v-text-field class="input-field" v-model="login.password" required
            :type="mostrarPassword ? 'text' : 'password'" label="Contraseña" variant="underlined"
            prepend-inner-icon="mdi-lock" :append-inner-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="v$.password.$errors.map(e => e.$message)" @input="v$.password.$touch"
            @blur="v$.password.$touch" @click:append-inner="mostrarPassword = !mostrarPassword" counter="5"
            v-on:keyup.enter="entrar"></v-text-field>
          
          <v-checkbox hide-details v-model="storage" label="Recuerdame" ></v-checkbox>          

          <input type="button" value="Ingresar" class="btn solid" @click="entrar">

        </form>

        <form class="sign-up-form">
          <h2 class="title">Registro Huesped</h2>

          <v-text-field class="input-field text-capitalize" prepend-inner-icon="mdi-account" required type="text"
            ref="nombre" v-model="usuarioRegister.username" label="Nombre Usuario" variant="underlined" counter="3"
            :error-messages="vr$.username.$errors.map(e => e.$message)" @input="vr$.username.$touch"
            @blur="vr$.username.$touch"></v-text-field>

          <v-text-field class="input-field" prepend-inner-icon="mdi-cellphone" required type="number"
            v-model="usuarioRegister.cellphone" label="Numero Celular" variant="underlined" counter="8"
            :error-messages="vr$.cellphone.$errors.map(e => e.$message)" @input="vr$.cellphone.$touch"
            @blur="vr$.cellphone.$touch"></v-text-field>

          <v-text-field class="input-field" v-model="usuarioRegister.password" required
            :type="mostrarPassword ? 'text' : 'password'" label="Contraseña" variant="underlined"
            prepend-inner-icon="mdi-lock" :append-inner-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="vr$.password.$errors.map(e => e.$message)" @input="vr$.password.$touch"
            @blur="vr$.password.$touch" @click:append-inner="mostrarPassword = !mostrarPassword" counter="5"
            v-on:keyup.enter="registrar"></v-text-field>

          <input type="button" value="Registrar" class="btn solid" @click="registrar">

        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>¿Eres Nuevo?</h3>
          <p>Registrate como huesped y obten los beneficios que tenemos para ti.
          </p>
          <button class="btn transparent" id="sign-up-btn" @click="desactivar()">Nuevo Registro</button>
        </div>

      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>¿Ya tienes una Cuenta?</h3>
          <p>Inicia secion e ingresa al sistema para realizar tus reservas y acceder a nuevos beneficios.
          </p>
          <button class="btn transparent" id="sign-in-btn" @click="activar()">Iniciar Sesion</button>
        </div>

      </div>
    </div>
    <div class="text-center">
      <v-snackbar color="dark" v-model="snackbar" :timeout="4000" vertical elevation-7>
        <div class="text-subtitle-1 pb-2">Error al Registrarse</div>

        <p>{{ mensaje }}</p>

        <template v-slot:actions>
          <v-btn variant="text" color="warning" @click="snackbar = false">
            cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>



<script>
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { loginAccess, registerUser } from '@/services/loginService'
import { findPosition } from '@/services/empleadoService'
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  setup() {
    const router = useRouter()

    let storage = ref(0)

    let mensaje = ref('')
    let snackbar = ref(false)

    let tipo = ref('HUESPED')

    let mostrarPassword = ref(false)

    let container = ref(null)
    let nombre = ref(null)
    let telefono = ref(null)

    const cantMinimaNumeros = (min) => helpers.withMessage(({ $params }) => `Debe tener al menos ${$params.min} numeros.`, minLength(min))
    const cantMinimaLetras = (min) => helpers.withMessage(({ $params }) => `Debe tener al menos ${$params.min} letras.`, minLength(min))

    const initialState = {
      cellphone: '',
      password: ''
    }

    const login = reactive({
      ...initialState,
    })

    const initState = {
      username: '',
      cellphone: '',
      password: '',
      id_cargo: 2
    }

    const usuarioRegister = reactive({
      ...initState,
    })

    const rulesLogin = computed(() => {
      return {
        cellphone: {
          required: helpers.withMessage('El campo NO puede estar vacio.', required),
          minLength: cantMinimaNumeros(8)
        },
        password: {
          required: helpers.withMessage('El campo NO puede estar vacio.', required),
          minLength: cantMinimaLetras(5)
        }
      }
    })

    const rulesRegister = computed(() => {
      return {
        username: {
          required: helpers.withMessage('Este campo es requerido y NO puede estar vacio.', required),
          minLength: cantMinimaLetras(3)
        },
        cellphone: {
          required: helpers.withMessage('El campo NO puede estar vacio.', required),
          minLength: cantMinimaNumeros(8)
        },
        password: {
          required: helpers.withMessage('Este campo es requerido y NO puede estar vacio.', required),
          minLength: cantMinimaLetras(5)
        }
      }
    })

    const v$ = useVuelidate(rulesLogin, login)
    const vr$ = useVuelidate(rulesRegister, usuarioRegister)

    async function entrar() {
      try {
        v$.value.$validate() // checks all inputs
        if (!v$.value.$error) {

          let res = await loginAccess(login)
          if (res.status == 201) {
            localStorage.clear()
            const data = res.data.data
            // console.log(data)
            localStorage.setItem("token", JSON.stringify(res.data.tokenSession))
            localStorage.id_usuario = data.id_usuario
            localStorage.name = data.username
            localStorage.cellphone = data.cellphone

            res = await findPosition(localStorage.id_usuario)

            if (res.status == 201 && res.data.data.length > 0) {
              const datos = res.data.data[0]
              localStorage.position = datos.posicion
              localStorage.level = datos.nivel

              switch (localStorage.position) {
                case 'Administrador':
                  router.push({ name: 'admin' })
                  break
                case 'Huesped':
                  router.push({ name: 'huesped' })
                  break
              }
            }
          } else {
            snackbar.value = true
            mensaje.value = 'Error: No existe el usuario en nuestra base de datos.'
          }
        } else {
          snackbar.value = true
          mensaje.value = 'Error: hay un error de campos vacios, No ha podido superar la Validacion de campos.'
        }
      } catch (error) {
        console.log('este es el error al loguearse: ', error)
        snackbar.value = true
        mensaje.value = error.response.data.error
      }
    }

    async function registrar() {
      try {
        vr$.value.$validate() // checks all inputs
        if (!vr$.value.$error) {
          // if ANY fail           
          let res = await registerUser(usuarioRegister)
          if (res.status == 200) {
            activar()
          }
        }
      } catch (error) {
        snackbar.value = true
        mensaje.value = error.response.data.message
      }
    }

    function limpiarDatos() {
      v$.value.$reset()
      for (const [key, value] of Object.entries(initialState)) {
        login[key] = value
      }
    }

    function limpiarDatosRegister() {
      vr$.value.$reset()
      for (const [key, value] of Object.entries(initState)) {
        usuarioRegister[key] = value
      }
    }

    function activar() {
      nextTick(() => {
        limpiarDatos()
        container.value.classList.remove("sign-up-mode")
        telefono.value.focus()
      })
    }

    function desactivar() {
      nextTick(() => {
        limpiarDatosRegister()
        container.value.classList.add('sign-up-mode')
        nombre.value.focus()
      })
    }

    onMounted(() => {
      limpiarDatos()
    })

    return { login, usuarioRegister, v$, vr$, mensaje, snackbar, mostrarPassword, entrar, registrar, activar, desactivar, tipo, nombre, telefono, container, storage }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
}

.container:before {
  content: '';
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #585030, #EAE6D7);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;
  overflow: hidden;
  grid-column: 1;
  grid-row: 1/2;
  transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  z-index: 1;
  opacity: 0;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 3rem;
  text-align: center;
}

.input-field {
  // max-width: 380px;
  width: 50%;
  // height: 55px;
  // background-color: #cac9c9;
  // margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  // padding: 0 0.4rem;
}


.btn {
  width: 15rem;
  height: 49px;
  outline: none;
  border: none;
  border-radius: 49px;
  background-color: #585030;
  color: #fff;
  font-weight: 600;
  text-transform: capitalize;
  margin: 2rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #EAE6D7;
  color: #585030;
}


.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.image {
  width: 100%;
  transition: 1.1s 0.4s ease-in-out;
}

.right-panel .content,
.right-panel .image {
  transform: translateX(800px);
}

/* ANIMATION sTYLING */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0px);

}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

.container.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}

/* Responsiveness */

@media (max-width: 1300px) {
  .input-field {
    // max-width: 380px;
    width: 100%;
    // height: 55px;
    // background-color: #cac9c9;
    // margin: 10px 0;
    // border-radius: 55px;
    // display: grid;
    // grid-template-columns: 15% 85%;
    // padding: 0 0.4rem;
  }
}

@media (max-width: 768px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 68%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .signin-signup {
    width: 100%;
    left: 50%;
    top: 85%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .panels-container {
    z-index: 10;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    // flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }

  .panel .content {
    padding-right: 15%;
    transition: 0.9s 0.8s ease-in-out;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .image {
    width: 200px;
    transition: 0.9s 0.6s ease-in-out;
  }

  .left-panel {
    grid-row: 1/2;
  }

  .right-panel {
    grid-row: 3/4;
  }

  .right-panel .content,
  .right-panel .image {
    transform: translateY(300px);
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
    left: 50%;
  }
}


@media (max-width: 576px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }

  .input-field {
    // max-width: 380px;
    width: 100%;
    // height: 55px;
    // background-color: #cac9c9;
    margin: 0;
    // border-radius: 55px;
    // display: grid;
    // grid-template-columns: 15% 85%;
    padding: 0;
  }
}
</style>