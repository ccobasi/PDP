<script>
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import AdministrationHeader from '../../components/Cards/AdministrationHeader.vue'
import AdministrationServices from '../../services/administrationsService'
import administrationsService from '../../services/administrationsService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data: () => ({
        tab: null,
        text: 'dealUsers',
        dialog: false,
        roles: [],
        userType: '',
        roleName: '',
        roleId: '',
        editRole: false,
        filterOption: '',
        searchValue: '',
        dialogOpen: false,
        size: 200,
        pageNumber: 1,
        roleDescription: '',
        totalArrayValue: '',
        firstValue: '',
        secondValue: '',
        getUserTypes: []
    }),
    async created() {
        this.roles = await AdministrationServices.getRoles()
        this.getUserTypes = await AdministrationServices.getUserTypes()
    },
    components: {
        AdministrationHeader,
        TabMenu: TabMenu,
        ToolBar: ToolBar
    },

    methods: {
        async createRoles() {
            let ps = await administrationsService.createRoles(this.roleName, this.roleDescription, this.userType)
            if (ps == true) {
                this.dialog = false
                toast.success("Role Created Successfully")
                this.userType = ''; this.roleName = ''; this.roleDescription = '';
            }
            setTimeout(async () => {
                this.roles = await administrationsService.getRoles();
            }, 2000);
        },
        async editRoles() {
            let ps = await administrationsService.editRoles(this.roleId, this.roleName, this.roleDescription, this.userType)
            if (ps == 200) {
                this.dialog = false
                toast.success("Role Edited")
                this.userType = ''; this.roleName = ''; this.roleDescription = '';
                setTimeout(async () => {
                    this.roles = await administrationsService.getRoles();
                }, 2000);
            }
            else { toast.error("An error Occured, Please try again") }
        },
        onFilterSelected(isCorrect) {
            this.filterOption = isCorrect

        },
        onSearchValuesEntered(isCorrect) {
            this.searchValue = isCorrect
        },
        pageMovement(isCorrect) {
            if (isCorrect == 'Next') {
                this.pageNumber++;
            }
            else if (isCorrect == 'Previous') {
                this.pageNumber--;
            }
        }
    },
    computed: {
        pageCount() {
            let l = this.totalArrayValue,
                s = this.size;
            return Math.ceil(l / s);

        },
        indexStart() {
            return (this.pageNumber - 1) * this.size;
        },
        indexEnd() {
            return this.indexStart + this.size;
        },
        allDealRoles() {
            let dealUsers = this.roles
            this.totalArrayValue = dealUsers.length

            if (this.searchValue != '' && this.searchValue) {
                dealUsers = dealUsers.filter((item) => {
                    return item.name
                        .toLowerCase()
                        .includes(this.searchValue.toLowerCase()) ||
                        item.description.toLowerCase().includes(this.searchValue.toLowerCase())
                })
            }
            // Sort by alphabetical order
            dealUsers = dealUsers.sort((a, b) => {
                if (this.filterOption == 'asc') {
                    let fa = a.name.toLowerCase(), fb = b.name.toLowerCase()

                    if (fa > fb) {
                        return 1
                    }
                    if (fa < fb) {
                        return -1
                    }
                    return 0

                }
                else if (this.filterOption == 'dsc') {
                    let fa = a.name.toLowerCase(), fb = b.name.toLowerCase()

                    if (fa < fb) {
                        return 1
                    }
                    if (fa > fb) {
                        return -1
                    }
                    return 0
                }
            })

            if (dealUsers.length > 0) {
                dealUsers.forEach((element, index, array) => {
                    array[index].count = index + 1
                });

                let ps = dealUsers.slice(this.indexStart, this.indexEnd)
                this.firstValue = ps[0].count;
                this.secondValue = ps[ps.length - 1].count
            }

            return dealUsers.slice(this.indexStart, this.indexEnd)
        },
    },
}
</script>

<template>
  <main class="wrapper">
    <TabMenu />
    <v-dialog v-model="dialog" width="524" height="450" right transition="dialog-right-transition">
      <v-card id="style-4">
        <v-card-title>
          <div class="d-flex justify-content-between mt-3">
            <span class="text-h5 ml-5" v-if="editRole == false">Create a new User</span>
            <span class="text-h5 ml-5" v-else>Edit User</span>
            <p class="mr-5" style="cursor: pointer;" @click="dialog = false">X</p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container style="margin-top: -20px">
            <v-row>
              <v-col cols="12">
                <label>Role</label>
                <v-text-field required v-model="roleName" density="compact" variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>Description</label>
                <v-text-field required density="compact" v-model="roleDescription" variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>User Type</label>
                <v-select density="compact" v-model="userType" :items="getUserTypes" item-title="id" variant="outlined"></v-select> </v-col>
            </v-row>
          </v-container>
          <div class="mt-4 d-flex justify-content-end">
            <button class="rfqbtn" @click="createRoles()" v-if="editRole == false">Create</button>
            <button class="rfqbtn" @click="editRoles()" v-else>Submit</button>
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
        <div class="toggleButton mt-2">
          <button class="rfqbtn" @click="dialog = true; editRole = false; roleDescription = ''; userType = ''; roleName = ''">
            Create New Role
          </button>
        </div>
      </div>

      <div>&nbsp;</div>
      <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" :pageCounts="pageCount" :firstVal="firstValue" :lastVal="secondValue" :totalValue="totalArrayValue" :pageNum="pageNumber" @pageDetails="pageMovement" class="mb-2" />
      <v-card-text>
        <v-window v-model="tab" style="border-radius: 12px;">
          <v-window-item value="one">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Role ID
                  </th>
                  <th class="text-left">
                    Role Description
                  </th>
                  <th class="text-left">
                    User Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in allDealRoles" :key="item.id" @click="editRole = true; dialog = true; roleId = item.id; roleName = item.name; roleDescription = item.description; userType = item.userType;" style="cursor: pointer;">
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.userType }}</td>
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
