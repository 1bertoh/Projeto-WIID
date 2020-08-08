<template>
<v-container fluid id="contLogin" class="deep-purple accent-3">
  <div class="pink">
     <v-row justify="center" >
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title
        class="lime accent-4">
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify='center'>
              <v-col cols="12">
                <v-text-field label="User*"
                v-model="email"
                required></v-text-field>
              </v-col>
              <v-col cols="10" align='center'>
                <v-text-field label="Password*"
                :type="visibility ? 'password' : 'text'"
                v-model="senha"
                :append-icon="visibility ? 'visibility_off' : 'visibility'"
                @click:append="visibility = !visibility"
                required></v-text-field>
              </v-col>
              <v-alert type="warning"
              dense
              :value="alertLogin">
                Dados incorretos
              </v-alert>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text
          @click="validacao">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</v-container>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    alert('Senha: Adm \n Email: Adm')
    document.addEventListener('keypress', (e) => {
      const keyName = e.key;
      if (keyName === 'Enter') {
        this.validacao();
      }
    });
  },
  data() {
    return {
      dialog: true,
      email: '',
      senha: '',
      userEmail: 'Adm',
      userSenha: 'Adm',
      visibility: true,
      alertLogin: false,
    };
  },
  methods: {
    validacao() {
      if (this.userEmail === this.email && this.userSenha === this.senha) {
        this.alertLogin = false;
        this.$router.push({ path: 'user' }) // -> /telaLogada
      } else {
        this.alertLogin = true;
      }
    },
    verSenha() {
      alert('oi')
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contLogin {
  background-color: pink;
  height: 100vh;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
