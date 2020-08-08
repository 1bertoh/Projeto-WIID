<template>
  <div
    id="container"
    :class="{'cyan darken-3':darkMode === true,
    'cyan lighten-3':darkMode === false}"
    class="px-3"
  >
    <v-row>
      <!-- o side A que será mostrado em tela mde maiores-->

      <!--navigation drawer para sm-->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        width="50%"
        :class="{
        'indigo darken-3':darkMode === true,
        'deep-purple accent-1':darkMode === false}"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              :class="{
              'white--text':darkMode === true,
              'black--text':darkMode === false}"
              >
              <strong class="display-1">WIID</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-row class="mx-4">
          <!--navigation bar Avatar btn-->
          <v-col>
            <v-menu offset-y="true" transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  :class="{green:online === true,
            red:online === false}"
                  dark
                  height="70"
                  width="70"
                  v-bind="attrs"
                  v-on="on"
                >OA</v-btn>
              </template>
              <v-list>
                <v-list-item @click="online =! online">
                  <v-list-item-title>Mudar status</v-list-item-title>
                </v-list-item>
                <v-list-item to="/">
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <!-- fim navigation bar  avatar btn-->

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <!-- navigation bar botão de News-->
          <v-col>
            <v-menu
            transition="slide-y-transition"
            bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :class="{'mt-5':true,
                  'white--text cyan darken-3':darkMode === true,
                  'cyan lighten-3':darkMode === false}"
                  v-bind="attrs"
                  v-on="on"
                >News</v-btn>
              </template>
              <v-list>
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <!-- fim navigation bar botão de News-->
        </v-row>

        <v-list>
          <v-list-item>
            <v-treeview
              :class="{'mt-5':true, dark_tree:darkMode === true,
              light_tree:darkmode ===false}"
              v-model="tree"
              :items="menus"
              value
              active="tree"
              return-object="true"
              item-children="subMenus"
              open-on-click="true"
              activatable
              update:active="onUpdate"
            >
              <template slot="label" slot-scope="{ item }">
                <span @click="getMenuId(item.id)">{{ item.name }}</span>
              </template>
            </v-treeview>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!--fim navigation drawer para sm-->

      <!--Esse lado A desaparecerá em sm-->
      <v-col
        cols="4"
        id="sideA"
        :class="{'hidden-sm-and-down':true,
        'indigo darken-3':darkMode === true,
        'deep-purple accent-1':darkMode === false}"
        md="4"
      >
        <v-row>
          <!--Avatar btn-->
          <v-col>
            <v-menu offset-y="true" transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  :class="{green:online === true, red:online === false}"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >OA</v-btn>
              </template>
              <v-list>
                <v-list-item @click="online =! online">
                  <v-list-item-title>Mudar status</v-list-item-title>
                </v-list-item>
                <v-list-item to="/">
                  <v-list-item-title>Logout <v-icon>exit_to_app</v-icon></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <!-- fim avatar btn-->

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <!-- botão de News-->
          <v-col>
            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :class="{'white--text cyan darken-3':darkMode === true,
                  'cyan lighten-3':darkMode === false}"
                  v-bind="attrs"
                  v-on="on"
                >News</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" @click>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <!-- fim botão de News-->
        </v-row>

        <v-divider></v-divider>

        <v-col align="start">
          <p
            :class="{'white--text':darkMode === true,
            'black--text':darkMode === false}"
          >
            Favoritos
            <v-icon
              :class="{'white--text':darkMode === true,
              'black--text':darkMode === false}"
            >more_vert</v-icon>
          </p>
        </v-col>

        <!-- Lista de menu-->
        <v-list
          :class="{
          'indigo darken-3':darkMode === true,
          'deep-purple accent-1':darkMode === false}"
        >
          <v-list-item>
            <v-treeview
              :class="{'mt-5':true, dark_tree:darkMode === true,
              light_tree:darkmode ===false}"
              v-model="tree"
              :items="menus"
              value
              active="tree"
              return-object="true"
              item-children="subMenus"
              open-on-click="true"
              activatable
              update:active="onUpdate"
            >
              <template slot="label" slot-scope="{ item }">
                <span @click="getMenuId(item.id)">{{ item.name }}</span>
              </template>
            </v-treeview>
          </v-list-item>
        </v-list>

        <!--Fim da lista de menu-->
      </v-col>
      <!-- fim do side A que será mostrado em tela mde maiores-->

      <!-- o side B que será mostrado em tela mde maiores-->
      <v-col cols="12" id="sideB" md="8">
        <div>
          <!--pesquisas, filtros e ações do lado B-->
          <div>
            <!--pesquisar-->
            <v-row>
              <v-col cols="1" class="hidden-md-and-up">
                <!--menu lateral q aparece em xs-->
                <v-btn
                color="pink"
                class="d-md-none"
                dark
                @click.stop="drawer = !drawer">
                  <v-icon>menu</v-icon>
                </v-btn>
                <!--fim menu lateral q aparece em xs-->
              </v-col>

              <v-col cols="10" md="11">
                <v-menu offset-y="true" transition="slide-y-transition" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn width="90%"
                    class="white"
                    color="white"
                    v-bind="attrs"
                    v-on="on">
                      <span>Pesquisar</span>
                      <v-spacer></v-spacer>
                      <v-icon>search</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, i) in pesquisa" :key="i" @click>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
              <v-col cols="1">
                <v-icon @click="darkMode =! darkMode" large>invert_colors</v-icon>
              </v-col>
            </v-row>
            <!-- fim do pesquisar-->

            <v-divider class="mt-5"></v-divider>

            <!--botões atribuir, arquivar e agendar,..-->
            <div class="ml-3">
              <v-row>
                <v-checkbox
                v-model="autoSelecAll"
                value="1"
                :color="checkbColor"
                class="mx-2 mt-2">
                </v-checkbox>
                <v-btn
                  :class="{'indigo darken-4':darkMode === true,
                  'deep-purple accent-1':darkMode ===false}"
                  elevation="7"
                  dark
                  small
                  class="mx-2 mt-2"
                  tile
                >Atribuir
                </v-btn>
                <v-btn
                  :class="{'indigo darken-4':darkMode === true,
                  'deep-purple accent-1':darkMode ===false}"
                  elevation="7"
                  small
                  dark
                  class="mx-2 mt-2"
                  @click="deleteList"
                  tile
                >Arquivar</v-btn>
                <v-btn
                  :class="{'indigo darken-4':darkMode === true,
                  'deep-purple accent-1':darkMode ===false}"
                  elevation="7"
                  small
                  dark
                  class="mx-2 mt-2"
                  tile
                >Agendar
                </v-btn>

                <v-spacer></v-spacer>

                <v-icon @click="ordenar"
                class="mr-5" large>filter_list
                </v-icon>
              </v-row>
            </div>
            <!--fim botões atribuir, arquivar e agendar,..-->
          </div>
          <!--Fim pesquisas, filtros e ações do lado B-->

          <!--cards que contem as mensagens-->
          <div id="limitador">
            <v-alert
              dark
              class="purple darken-4"
              v-show="tamanhoMsg === 0"
            >Nenhuma mensagem encontrada
            </v-alert>
            <v-card
              id="card"
              v-for="(msg, index) in cardMsg.subMenuItems"
              :key="msg"
              :class="{
              'my-2': true,
              'white--text deep-purple darken-2': darkMode === true,
              'blue lighten-5': darkMode === false}"
              @mouseover="msgIndex = index"
              @mouseout="msgIndex = undefined"
            >
              <v-row>
                <!--corpo principal do card-->
                <v-col cols="2" class="pt-7">
                  <!--checkbox e btn que aparece e some com mousehover-->
                  <v-checkbox
                    class="ml-12"
                    :color="checkbColor"
                    v-if="msgIndex === index || allSelect === true"
                    v-model="checkbox"
                    :value="index"
                  ></v-checkbox>
                  <v-btn v-else depressed fab color="success">
                    {{msg.owner}}
                    </v-btn>
                  <!-- fim checkbox e btn que aparece e some com mousehover-->
                </v-col>
                <v-col cols="8" align="start">
                  <v-card-title>{{msg.name}}</v-card-title>
                  <v-card-text>{{msg.subject}}</v-card-text>

                  <v-card-text class="text-truncate">{{texto}}</v-card-text>
                </v-col>
                <!--fim corpo principal do card-->

                <!--lateral com os mini icones e horario do card-->
                <v-col cols="2"
                align="start">
                  <p class="caption">ontem</p>
                  <v-btn
                    v-for="users in msg.users"
                    :key="users"
                    width="30"
                    height="30"
                    depressed
                    small
                    fab
                    color="success"
                  >{{users}}</v-btn>
                </v-col>
                <!--fim lateral com os mini icones e horario do card-->
              </v-row>
            </v-card>
          </div>
          <!--Fim cards que contem as mensagens-->
        </div>
      </v-col>
    </v-row>
    <!--Fim do lado B-->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'telaLogada',
  created() {
    this.menusList();
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      avatar: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Mudar Status', fun: 'online =! online' },
        { title: 'Logout', link: '/' },
      ],
      menus: [],
      menuId: '', // Fim do lado A
      pesquisa: [{ title: 'Hoje' }, { title: 'Ontem' }],
      cardMsg: [],
      checkbox: [],
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis rutrum vestibulum. Donec egestas lacinia sodales. Nam finibus leo nisi.',
      msgIndex: undefined,
      allSelect: false,
      tamanhoMsg: 0,
      online: true,
      darkMode: true,
      checkbColor: 'white',
      autoSelecAll: '',
    };
  },
  watch: {
    checkbox() {
      if (this.checkbox.length !== 0) {
        // Esse watch vigiará o no de array do checkbox para mudar o boolean, função,
        //  mostrar tds os checkboxes
        this.allSelect = true;
      } else {
        this.allSelect = false;
      }
    },
    cardMsg() {
      // sua função é a d mostrar o aler 'nenhuma mensagem encontrada'
      this.tamanhoMsg = this.cardMsg.subMenuItems.length;
    },
    darkMode() {
      if (this.darkMode === true) {
        this.checkbColor = 'white';
      } else {
        this.checkbColor = 'purple';
      }
    },
    autoSelecAll() {
      this.autoSelecAllFun();
    },
  },
  methods: {
    menusList() {
      // pegar API menus
      const url =
        'http://my-json-server.typicode.com/workinideas/vagafrontendteste/menus';
      axios.get(url).then((response) => {
        this.menus = response.data;
      });
    },
    getMenuId(i) {
      //  pega o Id dos Menus lado A, para usar em outro AI
      this.menuId = i;
      this.getMensagem();
    },
    getMensagem() {
      // API para pegar as msgs
      const url = ` http://my-json-server.typicode.com/workinideas/vagafrontendteste/items/${this.menuId}`;
      axios.get(url).then((response) => {
        this.cardMsg = response.data;
      });
      // this.checkbox = [];
      this.autoSelecAll = null;
    },
    deleteList() {
      // deletará as mensagens selecionadas atraves do checkbox
      const y = this.checkbox.sort();
      const x = y.reverse();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < x.length; i++) {
        const indice = x[i];
        this.cardMsg.subMenuItems.splice(indice, 1);
      }
      if (this.cardMsg.subMenuItems.length === 0) {
        this.tamanhoMsg = 0;
      }
      this.checkbox = [];
    },
    ordenar() {
      //  ordenará a ordem d listagem das mensagens
      const desordem = this.cardMsg.subMenuItems;
      const ordem = desordem.sort((a, b) => {
        // eslint-disable-next-line no-nested-ternary
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
    autoSelecAllFun() {
      // selecionará automaticamente tds as msgs
      if (this.autoSelecAll === '1') {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.cardMsg.subMenuItems.length; i++) {
          this.checkbox.push(i);
        }
      }
      if (this.autoSelecAll === null) {
        this.checkbox = [];
      }
    },
  },
};
</script>
<style lang="">
#container {
  height: 93vh;
}
.dark_btn {
  background-color: #01579b;
}
#sideA {
  height: 93vh;
  color: white;
}
.dark_tree .v-treeview-node__label {
  color: white;
}
#sideB {
  height: 95vh;
}
#card {
  background-color: pink;
}
#limitador {
  height: 71vh;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
