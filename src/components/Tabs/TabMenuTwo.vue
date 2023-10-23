
<template>
  <div class="menu">
    <div class="profile">
      <button>My Profile</button>
      <div class="btn"><span>Team Profile</span></div>
    </div>
    <nav class="navbar navbar-expand-md ">

      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link active" href="/" role="button" aria-expanded="false">
            Development Plan
          </a>

        </li>

        <li class="nav-item dropdown ">
          <a class="nav-link" href="/skillassessment" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Skill Assessment
          </a>

        </li>

        <li class="nav-item link">
          <a class="nav-link " href="/trainingschedule">Training Schedule </a>
        </li>

        <li class="nav-item link">
          <a class="nav-link " href="/taskdeliverables">Tasks/Deliverables </a>
        </li>

      </ul>

    </nav>

  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.profile {
  display: flex;
  width: 147px;
  height: 40px;
  padding: 6px 0px;

  align-items: flex-start;
  gap: 5px;

  border-radius: 5px;
  border: 1px solid var(--gray-300, #d4d4d8);
  background: var(--Color-3, #fff);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}
.profile button {
  display: flex;
  padding: 6px 5px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.btn {
  display: flex;
  padding: 6px 0px;
  align-items: flex-start;
  width: 70px;
  height: 27px;
  color: var(--Black, #000);

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.btn span {
  margin-left: 0px;
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

  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.link {
  margin-right: 40px;
}

.active::after {
  content: '';
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
</style>