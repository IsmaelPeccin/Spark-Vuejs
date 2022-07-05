<template>
  <q-page padding>
    <div class="q-pa-md">
      <p
        style="font-weight: bold; font-size:large;"
        v-if="isUpdate() === true"
      >
        Usuários > Editar Usuário
      </p>
       <p
        style="font-weight: bold; font-size:large;"
        v-if="isUpdate() === false"
      >
        Usuários > Cadastro de Novo Usuário
      </p>
      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section>
            <div>
              <q-btn
                class="float-right"
                icon="remove"
                label="Cancelar"
                outline
                style="color: red;"
                dense
                :to="{ name: 'home' }"
                no-caps
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator/>

        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            style="padding: 45px 500px 30px 40px;"
            label="Nome Completo"
            dense
            outlined
            v-model="form.name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
          />

          <q-input
            style="padding: 0px 500px 30px 40px;"
            label="Email"
            dense
            outlined
            v-model="form.email"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Campo Obrigatório',
              val => val.includes('.com') && val.includes('@') || 'Por favor insira um email válido'
            ]"
          >
          </q-input>

          <q-input
            style="padding: 0px 500px 30px 40px;"
            label="Senha"
            dense
            v-model="form.password"
            outlined
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
          >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
          <q-select
            style="padding: 0px 500px 30px 40px;"
            label="Login PipeDrive"
            dense
            outlined
            v-model="form.pipedriveId"
            :options="logOptions"
          />

          <q-select
            style="padding: 0px 500px 30px 40px;"
            label="Permissão"
            dense
            outlined
            v-model="form.permission"
            :options="permOptions"
             lazy-rules
            :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
          />
           <div class="q-pa-md q-gutter-sm" style="padding: 25px 500px 30px 30px;">
            <q-btn-toggle
              no-caps
              toggle-color="green"
              v-model="form.status"
              :options="[
                {label: 'Ativo', value: 'ACTIVE'},
                {label: 'Inativo', value: 'DISABLED'}
              ]"
               lazy-rules
              :rules="[ val => val && val.length > 0 || 'Escolha uma opção!']"
            />
          </div>
          <div class="q-pa-md q-gutter-sm" style="padding: 25px 500px 30px 30px;">
            <q-btn
              v-if="isUpdate() === false"
              no-caps
              label="+ Adicionar Usuário"
              color="black"
              push
              type="submit"
            />
             <q-btn
              v-if="isUpdate() === true"
              no-caps
              label="Salvar alterações"
              color="black"
              push
              type="submit"
            />
          </div>
        </q-form>
    </q-card>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import userService from 'src/service/users'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'FormUser',

  setup () {
    const { getById, post } = userService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      password: '',
      email: '',
      name: '',
      permission: '',
      status: '',
      pipedriveId: ''
    })

    const isUpdate = () => {
      if (route.params.id) {
        return true
      }
      return false
    }

    onMounted(async () => {
      if (route.params.id) {
        getUserById(route.params.id)
      }
      isUpdate()
    })

    const getUserById = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.log(error)
      }
    }

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await api.put(`https://homolog-api.gm7.com.br/orq/test/user/${form.value.id}`, form.value)
        } else {
          await post(form.value)
        }
        $q.notify({ message: 'Usuário salvo com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    }
    return {
      form,
      onSubmit,
      isPwd: ref(true),
      isUpdate,
      permOptions: [
        'ADMIN', 'PARTNER'
      ],
      logOptions: [
        '', '1', '2', '4', '5'
      ]
    }
  }
})

</script>
