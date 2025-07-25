<template>
  <div class="courses">
    <h1>Cursos</h1>
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Nivel</th>
          <th scope="col">CEFR</th>
          <th scope="col">Descripción</th>
          <th scope="col">Mes</th>
          <th scope="col">Año</th>
          <th scope="col">Versión</th>
          <th></th>
        </tr>
        <tr>
          <th scope="col">
            <button type="button" class="btn btn-primary" @click="addItem()">
              Guardar
            </button>
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="newName"
              class="form-control"
              placeholder="Ingresar nombre"
            />
          </th>
          <th scope="col">
            <select v-model="newLevelName" class="form-select">
              <option disabled value="">Selecciona un nivel</option>
              <option v-for="level in levels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </th>
          <th scope="col">
            <select v-model="newCEFR" class="form-select">
              <option disabled value="">Selecciona un nivel</option>
              <option v-for="level in CEFRLevels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="newDescription"
              class="form-control"
              placeholder="Ingresar descripción"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="newMonth"
              class="form-control"
              placeholder="Ingresar mes"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="newYear"
              class="form-control"
              placeholder="Ingresar año"
            />
          </th>
          <th>
            <input
              type="number"
              v-model="newVersion"
              class="form-control"
              placeholder="Ingresar versión"
              @input="validateVersion()"
            />
          </th>
        </tr>
        <tr>
          <th scope="col">
            <button
              type="button"
              class="btn btn-primary"
              @click="validateEdit()"
            >
              Editar
            </button>
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="editName"
              class="form-control"
              placeholder="Ingresar nombre"
            />
          </th>
          <th scope="col">
            <select v-model="editLevelName" class="form-select">
              <option disabled value="">Selecciona un nivel</option>
              <option v-for="level in levels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </th>
          <th scope="col">
            <select v-model="editCEFR" class="form-select">
              <option disabled value="">Selecciona un nivel</option>
              <option v-for="level in CEFRLevels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="editDescription"
              class="form-control"
              placeholder="Ingresar descripción"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="editMonth"
              class="form-control"
              placeholder="Ingresar mes"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              v-model="editYear"
              class="form-control"
              placeholder="Ingresar año"
            />
          </th>
          <th>
            <input
              type="number"
              v-model="editVersion"
              class="form-control"
              placeholder="Ingresar versión"
              @input="validateEditVersion()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.level }}</td>
          <td>{{ item.CEFR }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.month }}</td>
          <td>{{ item.year }}</td>
          <td>{{ item.version }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="startEditing(item)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminar(item.id)"
            >
              eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { CEFRLevels, levels } from "@/shared/constants";
import Course from "@/features/Course.model";
import axios from "axios";

export default {
  name: "CoursesList",
  data() {
    return {
      title: "Cursos",
      items: [],
      modalBootstrapInstance: null,
      modalMode: "crear",
      selectedItem: null,
      CEFRLevels,
      levels,
      newID: 0,
      newName: "",
      newLevelName: "",
      newCEFR: "",
      newDescription: "",
      newMonth: "",
      newYear: "",
      newVersion: 0,
      newItem: null,
      editItem: null,
      editName: "",
      editLevelName: "",
      editCEFR: "",
      editDescription: "",
      editMonth: "",
      editYear: "",
      editVersion: 0,
      filterName: "",
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
    //UsuariosCrear,
    //UsuariosEditar,
  },
  created() {
    // Componente creado
  },
  mounted() {
    // Componente montado
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
      } else {
        console.error("No se encontró el ref modalRef");
      }
    });
    this.obtenerLista();
  },
  updated() {
    // Componente actualizado
  },
  destroyed() {
    // Componente destruido
  },
  methods: {
    obtenerLista() {
      axios
        .get(process.env.VUE_APP_API_URL + "/courses")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /*
    abrirModalParaCrear() {
      this.modalMode = "crear";
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.show();
      } else {
        console.error("modalBootstrapInstance no está inicializado");
      }
    },
    cerrarModal() {
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.hide();
      }
    },
    */
    assignID() {
      if (this.items.length === 0) return 1;
      const maxId = Math.max(...this.items.map((c) => c.id));
      return maxId + 1;
    },

    addItem() {
      if (
        this.newName != "" &&
        this.newLevelName != "" &&
        this.newCEFR != "" &&
        this.newDescription != "" &&
        this.newMonth != "" &&
        this.newYear != "" &&
        this.newVersion != null
      ) {
        this.newItem = new Course(
          this.assignID(),
          this.newName,
          this.newLevelName,
          this.newCEFR,
          this.newDescription,
          this.newMonth,
          this.newYear,
          this.newVersion
        );
        this.saveItem(this.newItem);
      }
    },
    /*
    abrirModalParaEditar(item) {
      this.itemSeleccionado = { ...item };
      this.modalMode = "none";
      setTimeout(() => {
        if (this.modalBootstrapInstance) {
          this.modalBootstrapInstance.show();
          this.modalMode = "editar";
        } else {
          console.error("modalBootstrapInstance no está inicializado");
        }
      });
    },
    */
    startEditing(item) {
      this.editID = item.id;
      this.editName = item.name;
      this.editLevelName = item.level;
      this.editCEFR = item.CEFR;
      this.editDescription = item.description;
      this.editMonth = item.month;
      this.editYear = item.year;
      this.editVersion = item.version;
    },

    validateEdit() {
      if (
        this.editID != 0 &&
        this.editName != "" &&
        this.editLevelName != "" &&
        this.editCEFR != "" &&
        this.editDescription != "" &&
        this.editMonth != "" &&
        this.editYear != "" &&
        this.editVersion != null
      ) {
        this.editItem = new Course(
          this.editID,
          this.editName,
          this.editLevelName,
          this.editCEFR,
          this.editDescription,
          this.editMonth,
          this.editYear,
          this.editVersion
        );
        this.updateItem(this.editItem);
      }
    },
    updateItem(value) {
      axios
        .put(process.env.VUE_APP_API_URL + "/courses/" + value.id, value)
        .then((response) => {
          this.obtenerLista();
          this.cleanFields();
          this.editItem = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /*
    eliminar(value) {
      if (confirm("¿Está seguro de eliminar este ítem?")) {
        this.axios
          .delete(process.env.VUE_APP_API_URL + "/usuarios/" + value.id, value)
          .then((response) => {
            this.obtenerLista();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    */
    saveItem(value) {
      axios
        .post(process.env.VUE_APP_API_URL + "/courses", value)
        .then((response) => {
          this.obtenerLista();
          this.new = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validateVersion() {
      if (this.newVersion < 0) {
        this.newVersion = 0;
      }
    },
    validateEditVersion() {
      if (this.editVersion < 0) {
        this.editVersion = 0;
      }
    },
    cleanFields() {
      this.editID = 0;
      this.editName = "";
      this.editLevelName = "";
      this.editCEFR = "";
      this.editDescription = "";
      this.editMonth = "";
      this.editYear = "";
      this.editVersion = "";
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  emits: [], // los eventos personalizados que el componente puede emitir.
};
</script>
