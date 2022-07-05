<template>
   <div class="q-pa-md">
      <q-table
        title="table"
        :rows="users"
        :columns="columns"
        row-key="name"
        class="col"
        separator="none"
      >
       <template v-slot:body-cell-action="props">
        <q-td :props="props">
         <q-btn
          icon="create"
          color="primary"
          size="sm"
          dense
          @click="editUser(props.row.id)"
        >
        </q-btn>
        <q-btn
          icon="delete"
          color="negative"
          size="sm"
          dense
          class="q-ml-sm"
          @click="deleteUser(props.row.id)"
        >
        </q-btn>
        </q-td>
      </template>
      </q-table>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

const columns = [
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true
  },
  {
    name: 'permission',
    label: 'Permissão',
    field: 'permission',
    align: 'left',
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
    label: 'Action',
    align: 'left',
    sortable: true
  }
]

const users = []

export default defineComponent({
  name: 'UsersTable',

  props: {
    users: { type: Object, required: true }
  },

  setup () {
    return {
      columns,

      rows: users,

      editUser (userId) {
        console.log(userId)
      },

      deleteUser (userId) {
        console.log(userId)
      },

      addUser () {
        console.log('Tem que ir para form de add user !!!!!!!')
      }
    }
  }
})
</script>
