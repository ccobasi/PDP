<script setup>
import {useEngagementStore} from "@/store/engagements"
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute()
const store = useEngagementStore();
var items = store.engagements


const detailsId = parseInt(route.params.id);
const detail = items.find(item => item.id === detailsId);


// // Initialize local data variables
const editedOrganization = ref(detail.organization);
const editedEvent = ref(detail.event);
const editedDate = ref(detail.date);
const editedCountry = ref(detail.country);
const editedCategory = ref(detail.category);
const editedRepresentative = ref(detail.representative);
const editedContactPerson = ref(detail.contactPerson);
const editedStatus = ref(detail.status);
const editedTopicTheme = ref(detail.topicTheme);
const editedSponsorship = ref(detail.sponsorship);


const saveChanges = () => {
  detail.organization = editedOrganization.value;
  detail.event = editedEvent.value;
  detail.date = editedDate.value;
  detail.country = editedCountry.value;
  detail.category = editedCategory.value;
  detail.representative = editedRepresentative.value;
  detail.timeLine = editedContactPerson.value;
  detail.status = editedStatus.value;
  detail.topicTheme = editedTopicTheme.value;
  detail.sponsorship = editedSponsorship.value;

  store.saveEngagements();

  router.push('/engagement');
}


</script>

<template>
  <div class="details">
    <div class="skills">

      <h3>Speaking Engagement</h3>
      <div class="line"></div>
      <div class="learn">
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Organization</caption>

            </div>
            <textarea v-model="editedOrganization" name="Goals" id="" cols="30" rows="10">{{detail.organization}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Event</caption>

            </div>
            <textarea v-model="editedEvent" name="Goals" id="" cols="30" rows="10">{{detail.event}}</textarea>

          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Date</caption>

            </div>
            <input v-model="editedDate" type="date">
          </div>
          <div class="one">
            <div class="title">
              <caption>Country</caption>

            </div>
            <textarea v-model="editedCountry" name="Country" id="" cols="30" rows="10">{{detail.country}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Category</caption>

            </div>
            <select v-model="editedCategory" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
              <option selected>{{detail.category}}</option>
              <option value="Panelist">Panelist</option>
              <option value="Speaker">Speaker</option>
              <option value="Attendee">Attendee</option>
            </select>
          </div>
          <div class="one">
            <div class="title">
              <caption>Representative</caption>

            </div>

            <textarea v-model="EditedRepresentative" name="Representative" id="" cols="30" rows="10" placeholder="Representative">{{detail.representative}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Contact Person</caption>

            </div>
            <textarea v-model="editedContactPerson" name="editedContactPerson" id="" cols="30" rows="10" placeholder="Representative">{{detail.contactPerson}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Status</caption>

            </div>
            <select v-model="editedStatus" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
              <option selected>{{detail.status}}</option>
              <option value="Concluded">Concluded</option>
              <option value="Conflict">Conflict</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div class="frame">

          <div class="one">
            <div class="title">
              <caption>Topic/Theme</caption>

            </div>

            <textarea v-model="editedTopicTheme" name="editedTopicTheme" id="" cols="30" rows="10" placeholder="editedTopicTheme">{{detail.topicTheme}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Status</caption>

            </div>
            <select v-model="editedStatus" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
              <option selected>{{detail.status}}</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div class="save">
          <button class="back" @click="$router.push('/engagement')">Back</button>
          <button type="submit" class="bsave" @click="saveChanges">Save Changes</button>
        </div>
      </div>

    </div>
  </div>

</template>
<style scoped>
.details {
  display: flex;
  width: 1349px;
  height: 1100px;
  padding: 30px 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  background: var(--Grey-Light, #eee);
}
.skills {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.line {
  width: 1190px;
  height: 1px;
  background: #808080;
}
.learn {
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 5px;
  border: 0.885px solid var(--gray-200, #e4e4e7);
  background: var(--Color-3, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}
.frame {
  display: flex;
  align-items: center;
  gap: 30px;
  align-self: stretch;
}
.one {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  height: 44px;
  padding: 10px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.one textarea {
  width: 550px;
  height: 100px;
  border: 1px solid #eee;

  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.one textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.one input,
.form-select {
  width: 550px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.one button {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
.save {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
  align-self: stretch;
}
.bsave {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
}
.back {
  display: flex;
  width: 159px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Grey-Light, #eee);
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
</style>