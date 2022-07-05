<template>
  <q-page padding >
    <div class="q-pa-md">
      <p style="font-weight: bold; font-size:large;">
        Usuários
      </p>
      <q-table
        title="table"
        :rows="users"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
        separator="none"
      >
       <template v-slot:top>
         <q-input dense filled v-model="filter" placeholder="Procurar Usuário...">
         <template v-slot:prepend>
           <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
         <q-btn color="black" :disable="loading" label="+ Adicionar Usuário " :to="{ name: 'formUser' }" no-caps />
      </template>

       <template v-slot:body-cell-action="props">
        <q-td :props="props">
         <q-btn
          icon="create"
          outline
          color="primary"
          size="sm"
          dense
          @click="handleEditUser(props.row.id)"
        >
        </q-btn>
        <q-btn
          icon="delete"
          outline
          color="negative"
          size="sm"
          dense
          class="q-ml-sm"
          @click="handleDeleteUser(props.row.id)"
        >
        </q-btn>
        </q-td>
      </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import userService from 'src/service/users'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const users = ref([])

    const { list, destroy } = userService()

    const router = useRouter()

    const $q = useQuasar()

    const columns = [
      {
        name: 'name',
        label: 'Nome',
        align: 'left',
        field: 'name',
        sortable: true
      },
      {
        name: 'id',
        label: 'Id',
        align: 'left',
        field: 'id',
        sortable: true
      },
      {
        name: 'permission',
        label: 'Permissão',
        align: 'left',
        field: 'permission',
        sortable: true
      },
      {
        name: 'email',
        label: 'Email',
        align: 'left',
        field: 'email',
        sortable: true
      },
      {
        name: 'action',
        label: 'Ações',
        align: 'left',
        sortable: true
      }
    ]

    onMounted(() => {
      getUsers()
    })

    const loading = ref(false)
    const filter = ref('')

    const getUsers = async () => {
      try {
        users.value = await list()
      } catch (error) {
        console.log(error)
      }
    }

    const del = 'deletar'

    const handleDeleteUser = async (id) => {
      try {
        $q.dialog({
          title: 'AVISO',
          message: 'Tem certeza que deseja excluir este usuário?',
          prompt: {
            outlined: true,
            model: '',
            label: 'Digite "DELETAR" para confirmar sua ação!',
            isValid: val => val.toLocaleLowerCase() === del,
            type: 'text'
          },
          cancel: true,
          persistent: true

        }).onOk(async () => {
          await destroy(id)
          $q.notify({
            message: 'Usuário deletado com sucesso',
            icon: 'check',
            color: 'positive'
          })
          await getUsers()
        })
      } catch (error) {
        $q.notify({
          message: 'Erro ao deletar',
          icon: 'check',
          color: 'positive'
        })
      }
    }

    const handleEditUser = async (id) => {
      try {
        router.push({ name: 'formUser', params: { id } })
      } catch (error) {
        alert(error)
      }
    }

    return {
      users,
      filter,
      loading,
      columns,
      handleDeleteUser,
      handleEditUser
    }
  }
})
</script>
