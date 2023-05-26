<nav class="py-2 border-bottom" style="color: white; background-color: #161719">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item"><a href="{{ url('/') }}" class="nav-link text-white link-white px-2 active logoText">Amgif</a></li>
        @if(Request::is('dashboard'))
          <li class="nav-item ms-4"><button type="button" class="text-white nav-link link-white px-4 btn" data-toggle="modal" data-target="#myModal" style="background-color: #7879F1"><span class="fa fa-plus me-2"></span>Nuevo proyecto</button></li>
        @endif
      </ul>
      <ul class="nav">
        @if(Auth::user())
          <form method="POST" action="{{ route('logout') }}" x-data>
              @csrf
              <button class="btn" style="color: white" type="submit">Cerrar sesión</button>
          </form>
        @else
          <li class="nav-item"><a href="{{ route('login') }}" class="nav-link text-white link-white px-4 ">Iniciar sesión</a></li>
          <li class="nav-item"><a href="{{ route('register') }}" class="text-white nav-link link-white px-4 btn" style="background-color: #7879F1">Registrarse</a></li>
        @endif
      </ul>
    </div>
  </nav>