
<template>
  <div class="menu">
    <nav class="navbar navbar-expand-md ">

      <ul class="navbar-nav">

        <li :class="{ 'nav-item': true, 'active': $route.path === '/' }">
          <router-link to="/" class="nav-link">
            Development Plans
          </router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/skillassessment' }">
          <router-link to="/skillassessment" class="nav-link">Skill Assessment</router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/trainingschedule' }">
          <router-link to="/trainingschedule" class="nav-link">Training Schedule</router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/taskdeliverables' }">
          <router-link to="/taskdeliverables" class="nav-link">Tasks/Deliverables</router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/mentorshipplan' }">
          <router-link to="/mentorshipplan" class="nav-link">Mentorship Plan</router-link>
        </li>
        <li :class="{ 'nav-item': true, 'active': $route.path === '/engagement' }">
          <router-link to="/engagement" class="nav-link">Speaking Engagement</router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/settings' }">
          <router-link to="/settings" class="nav-link">Settings</router-link>
        </li>
      </ul>

    </nav>

  </div>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

label {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

label span {
  flex-shrink: 0;
}

label select {
  flex-grow: 0;
}

.navbar {
  border-bottom: 1px solid #808080;
  width: 100%;
  flex-wrap: nowrap;
}

.navbar-nav .nav-item:first-child .nav-link {
  padding-left: 0;
}

.nav-item {
  margin-top: 10px;
  margin-right: 45px;
  position: relative;
}

.nav-link {
  color: var(--Grey-Dark, #808080);

  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.link {
  margin-right: 40px;
}
.active::after {
  content: "";
  position: absolute;
  display: block;

  width: 100%;
  height: 5px;
  bottom: -8px;
  margin: auto;
  border: 5px;
  background: #227cbf;
  color: #227cbf;
}

@media screen and (max-width: 1024px) {
  .menu {
    flex-direction: row;
    justify-content: center;
  }

  .navbar {
    flex-wrap: wrap;
  }

  .nav-item {
    margin-right: 25px;
  }
}

@media screen and (max-width: 820px) {
  .menu {
    flex-direction: row;
    justify-content: center;
  }

  .navbar {
    flex-wrap: wrap;
  }

  .nav-item {
    margin-right: 20px;
  }
}

@media screen and (max-width: 768px) {
  .menu {
    flex-direction: column;
  }

  .navbar {
    flex-wrap: wrap;
  }

  .nav-item {
    margin-top: 10px;
    margin-right: 0;
  }

  .navbar-nav {
    width: 100%;
    text-align: center;
  }

  .active::after {
    bottom: -8px;
  }
}
</style>