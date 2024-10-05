<script>
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import AdministrationHeader from '../../components/Cards/AdministrationHeader.vue'

export default {
    data: () => ({
        tab: null,
        text: 'dealUsers',
        dialog: false,
        permissions: [
            {
                roleid: 'Admin',
                originatedeals: 'Yes',
                transactdeals: 'Yes',
                deletedeals: 'Yes',
                empty: 'Edit',

            },
            {
                roleid: 'Originator',
                originatedeals: 'Yes',
                transactdeals: 'No',
                deletedeals: 'NO',
                empty: 'Edit',

            },
            {
                roleid: 'Transactor',
                originatedeals: 'No',
                transactdeals: 'Yes',
                deletedeals: 'No',
                empty: 'Edit',

            },
            {
                roleid: 'Co-Transactor',
                originatedeals: 'No',
                transactdeals: 'Yes',
                deletedeals: 'No',
                empty: 'Edit',

            },
            {
                roleid: 'Lead Transactor',
                originatedeals: 'No',
                transactdeals: 'Yes',
                deletedeals: 'Yes',
                empty: 'Edit',

            },
            {
                roleid: 'Transactor Legal',
                originatedeals: 'No',
                transactdeals: 'Yes',
                deletedeals: 'No',
                empty: 'Edit',

            },
            {
                roleid: 'Administrator',
                originatedeals: 'Yes',
                transactdeals: 'Yes',
                deletedeals: 'Yes',
                empty: 'Edit',

            },
        ],
    }),
    components: {
        AdministrationHeader,
        TabMenu: TabMenu,
        ToolBar: ToolBar
    }

}
</script>


<template>
  <main class="wrapper">
    <TabMenu />

    <v-dialog v-model="dialog" width="824" right transition="dialog-right-transition" fullscreen>
      <v-card id="style-4">
        <v-card-title>
          <div class="d-flex justify-content-between mt-3">
            <span class="text-h5 ml-5">Create a new User</span>
            <p class="mr-5" style="cursor: pointer;" @click="dialog = false">X</p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container style="margin-top: -30px">
            <v-row>
              <v-col cols="12" sm="6">
                <label>Role Description</label>
                <v-text-field required density="compact" variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <label>User Type</label>
                <v-text-field density="compact" variant="outlined" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <div class="mt-4 d-flex justify-content-end">
            <button class="rfqbtn" @click="dialog = false">Create</button>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="administration">
      <div class="intro mt-4 ">
        <h3> Administration</h3>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <AdministrationHeader />
        </div>
      </div>

      <div>&nbsp;</div>
      <ToolBar class="mb-2" />
      <v-card-text>
        <v-window v-model="tab" style="border-radius: 12px;">
          <v-window-item value="one">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Role Id
                  </th>
                  <th class="text-left">
                    Originate Deals
                  </th>
                  <th class="text-left">
                    Has Target
                  </th>
                  <th class="text-left">
                    Delete Deals
                  </th>
                  <th class="text-left">
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="item in permissions" :key="item.name">
                  <td>{{ item.roleid }}</td>
                  <td>{{ item.originatedeals }}</td>
                  <td>{{ item.transactdeals }}</td>
                  <td>{{ item.deletedeals }}</td>
                  <td style="color: #ff0000; cursor: pointer;">{{ item.empty }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-card-text>

    </div>
  </main>
</template>

<style scoped>
.administration > * {
  padding-left: 0;
}

.v-tab {
  text-transform: none !important;
  letter-spacing: normal !important;
}

.intro h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.v-text-field {
  height: 30px !important;
}

.intro p {
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
}

#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar {
  width: 7px;
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.rfqbtn {
  font-family: 'Inter';
  font-size: 16px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #227cbf 0%, #47b65c 100%);
  border-radius: 50px;
}

.rfqbtn:hover {
  background: linear-gradient(90deg, #47b65c 0%, #227cbf 100%);
  transition: 0.7s;
}

.text-left {
  color: black !important;
}

.v-btn-toggle {
  bordlefter: 1px solid black;
  width: 200px;
  justify-content: center;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 3px 0px;
  box-sizing: border-box;
  height: 33px;
  background: #ffffff;
  border: 1px solid #d4d4d8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-dialog {
  font-family: 'Inter';
}
</style>
