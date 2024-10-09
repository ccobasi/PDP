<script setup>
    import { useEngagementStore } from "@/store/engagements";
    import html2pdf from 'html2pdf.js';
    import { ref, computed, watch, onMounted } from 'vue';
  


const store = useEngagementStore();
const editingEngagement = ref(null);

const engagements = ref([])

const eventDescription = ref('')
  // const organization = ref('')
  const eventDate = ref('')
  const eventCountry = ref('')
  const eventCategory  = ref('')
  const representative = ref('')
  const contactPerson = ref('')
  const contactPhone = ref('')
  const contactEmail = ref('')
  const status = ref('')
  const topicTheme = ref('')
  const sponsorship = ref('')
  const createdBy = ref('')
  const lastModifiedBy = ref('')
  const selectedValue = ref('')


const fetchData = async () => {
  try {
    await store.fetchEngagements();

    engagements.value = store.engagements


    console.log('Engagements:', engagements.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


onMounted(async () => {
  
  await fetchData();

  if (Array.isArray(store.engagements)) {
      engagements.value = store.engagements;
    } else {
      console.error('Error: store.engagements is not an array');
    }

    watch(
      () => store.engagements,
      (newEngagements) => {
        if (Array.isArray(newEngagements)) {
          engagements.value = newEngagements;
        } else {
          console.error('Error: store.engagements is not an array');
        }
      }
    );
});

const editEngagement = (engagement) => {
  editingEngagement.value = { ...engagement };
  
  eventDescription.value = engagement.eventDescription;
  eventCountry.value = engagement.eventCountry;
  eventDate.value = engagement.eventDate;
  eventCategory.value = engagement.eventCategory;
  representative.value = engagement.representative;
  contactPerson.value = engagement.contactPerson;
  contactPhone.value = engagement.contactPhone;
  contactEmail.value = engagement.contactEmail;
  status.value = engagement.status;
  topicTheme.value = engagement.topicTheme;
  sponsorship.value = engagement.sponsorship;
  createdBy.value = engagement.createdBy;
  lastModifiedBy.value = engagement.lastModifiedBy;
  
  document.getElementById('myModal2').style.display = 'block';
};

const updateEngagement = async () => {
  if (editingEngagement.value) {
    editingEngagement.value.eventDescription = eventDescription.value;
    editingEngagement.value.eventCountry = eventCountry.value;
    editingEngagement.value.eventDate = eventDate.value;
    editingEngagement.value.eventCategory = eventCategory.value;
    editingEngagement.value.representative = representative.value;
    editingEngagement.value.contactPerson = contactPerson.value;
    editingEngagement.value.contactPhone = contactPhone.value;
    editingEngagement.value.contactEmail = contactEmail.value;
    editingEngagement.value.status = status.value;
    editingEngagement.value.topicTheme = topicTheme.value;
    editingEngagement.value.sponsorship = sponsorship.value;
    editingEngagement.value.createdBy = createdBy.value;
    editingEngagement.value.lastModifiedBy = lastModifiedBy.value;
    await store.updateEngagement(editingEngagement.value);
    editingEngagement.value = null;

    document.getElementById('myModal2').style.display = 'none';
  }
};

const deleteEngagement = async (engagementId) => {
  if (confirm('Are you sure you want to delete this engagement?')) {
    await store.deleteEngagement(engagementId);
  }
};

const itemsPerPage = 10; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(engagements.value.length / itemsPerPage));

const paginatedEngagement = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return engagements.value.slice(startIndex, endIndex);
});

const downloadPDF = () => {
  const table = document.querySelector('.table-responsive');

  html2pdf(table, {
    margin: 10,
    filename: 'table-data.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  });
};



const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Outputs YYYY-MM-DD format
}
</script>
<template>
  <teleport to="body">
    <form method="post" action="" @submit.prevent="editingEngagement ? updateEngagement() : handleSubmit">
      <div class="modal" id="myModal2" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Speaking Engagement Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Event Description</h6>
                  <textarea v-model="eventDescription" name="Event Description" id="" cols="30" rows="10" placeholder="Event Description"></textarea>
                </div>
                <div class="frame">
                  <h6>Country</h6>

                  <textarea v-model="eventCountry" name="Country" id="" cols="30" rows="10" placeholder="Country"></textarea>
                </div>
              </div>
              <div class="second mt-2">
                <div class="frame">
                  <h6>Date</h6>
                  <input v-model="eventDate" type="date">
                </div>
                <div class="frame">
                  <h6>Category</h6>
                  <select v-model="eventCategory" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Category</option>
                    <option value="Panelist">Panelist</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Attendee">Attendee</option>
                  </select>
                </div>

              </div>
              <div class="third mt-2">
                <div class="frame">
                  <h6>Representative</h6>
                  <textarea v-model="representative" name="Representative" id="" cols="30" rows="10" placeholder="Representative"></textarea>
                </div>

              </div>
              <div class="fourth mt-2">
                <div class="frame">
                  <h6>Contact Person</h6>
                  <textarea v-model="contactPerson" name="Contact Person" id="" cols="30" rows="10" placeholder="Contact Person"></textarea>
                </div>
                <div class="frame">
                  <h6>Contact Phone</h6>
                  <textarea v-model="contactPhone" name="Contact Phone" id="" cols="30" rows="10" placeholder="Contact Phone"></textarea>
                </div>

              </div>
              <div class="fourth mt-2">
                <div class="frame">
                  <h6>Contact Email</h6>
                  <textarea v-model="contactEmail" name="Contact Email" id="" cols="30" rows="10" placeholder="Contact Email"></textarea>
                </div>
                <div class="frame">
                  <h6>Status</h6>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Status</option>
                    <option value="Concluded">Concluded</option>
                    <option value="Conflict">Conflict</option>
                    <option value="Declined">Completed</option>
                  </select>
                </div>

              </div>
              <div class="fifth mt-2">
                <div class="frame">
                  <h6>Topic/Theme</h6>
                  <textarea v-model="topicTheme" name="Topic/Theme" id="" cols="30" rows="10" placeholder="Topic/Theme"></textarea>
                </div>
                <div class="frame">
                  <h6>Sponsorship</h6>
                  <select v-model="sponsorship" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Sponsorship</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

                  </select>
                </div>

              </div>
              <div class="fifth mt-2">
                <div class="frame">
                  <h6>Created By</h6>
                  <input type="text" v-model="createdBy" placeholder="Created By" disabled>
                </div>
                <div class="frame">
                  <h6>Modified By</h6>
                  <input type="text" v-model="lastModifiedBy" placeholder="Last Modified By" disabled>
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" data-bs-dismiss="modal">{{ editingEngagement ? 'Update' : 'Submit' }}</button>
            </div>

          </div>
        </div>
      </div>

    </form>
  </teleport>
  <div class="d-flex">
    <div class="table-container flex-grow-1">
      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink">S/N</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Organization</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Event</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Date</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Representative </span>

                </div>
              </th>

              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Status </span>

                </div>
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedEngagement" :key="index" @dblclick="editEngagement(item)">
              <td>{{item.id}}</td>
              <td>{{item.eventDescription}}</td>
              <td>{{item.topicTheme}}</td>
              <td>{{formatDate(item.eventDate)}}</td>
              <td>{{item.representative}}</td>
              <td>{{item.status}}</td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.view {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);

  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.table-responsive {
  width: 100%;
  display: flex;
  flex-direction: row;
}

table {
  width: 100%;
}

.full {
  width: 1080px;
}

thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr {
  height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

tbody tr td {
  color: var(--grey-dark, #000);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

tbody tr {
  height: 50px; /* Set a fixed height for table rows */
  overflow: hidden; /* Hide overflowing content */
}

.v-btn button {
  background: #47b65c;
}

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}

.modal-dialog {
  --bs-modal-width: 950px;
  width: 950px;
  height: 940px;
  margin-left: 8%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}

#myModal2 tr td {
  font-size: 13px;
}
#myModal2 .modal-content {
  width: 100%;
}
.modal-body[data-v-bf8ca16e] {
  width: 100%;
}

.first,
.second,
.third,
.fourth,
.fifth {
  display: flex;
  gap: 30px;
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 400px;
  height: 40px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.frame textarea {
  display: flex;
  width: 400px;
  height: 80px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.frame textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 400px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.modal-footer {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.rating {
  width: 320px;
}
.frame button {
  width: 145px;
  display: flex;
  padding: 5px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}

@media (max-width: 1024px) {
  .modal-dialog {
    width: 90%;
    margin-left: 6%;
  }

  .frame {
    width: 100%;
  }

  .frame textarea,
  .form-select,
  .frame input {
    width: 340px;
  }

  textarea,
  input,
  select {
    font-size: 12px;
  }

  .modal-lg {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .modal-dialog {
    margin-left: 5%;
  }

  .modal-body {
    flex-direction: column;
  }

  .frame {
    width: 100%;
  }

  .frame textarea,
  .form-select,
  .frame input {
    width: 260px;
  }

  textarea,
  input,
  select {
    font-size: 12px;
  }

  .modal-lg {
    max-width: 100%;
  }

  .d-flex {
    flex-direction: column;
  }
  .table-responsive {
    width: 100%;
    overflow-y: auto;
    flex-direction: column;
  }
  table,
  .full {
    width: 580px;
  }
  thead tr th {
    font-size: 10px;
    padding: 6px;
  }

  tbody tr td {
    font-size: 10px;
    padding: 10px;
  }
  .side-panel {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .modal-dialog {
    height: 1990px;
  }
  .modal-body {
    flex-direction: column;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth {
    flex-direction: column;
  }

  .frame {
    width: 100%;
    margin-bottom: 15px;
  }

  textarea,
  input,
  select {
    font-size: 12px;
  }

  .modal-lg {
    max-width: 100%;
  }

  .modal-title {
    font-size: 18px;
  }

  button[type="submit"] {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .modal-title {
    font-size: 14px;
  }

  .modal-body {
    padding: 10px;
  }

  .frame textarea,
  .form-select,
  .frame input {
    width: 230px;
  }

  textarea,
  input,
  select {
    font-size: 10px;
  }

  button[type="submit"] {
    font-size: 12px;
  }
}
</style>