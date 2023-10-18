
<template>
  <div class="menu">
    <nav class="navbar navbar-expand-md ">

      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link active" href="#" role="button" aria-expanded="false">
            Development Plan
          </a>

        </li>

        <li class="nav-item dropdown ">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Skill Assessment
          </a>

        </li>

        <li class="nav-item link">
          <a class="nav-link " href="#">Training Schedule </a>
        </li>

        <li class="nav-item link">
          <a class="nav-link " href="#">Tasks/Deliverables </a>
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