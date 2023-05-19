<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <style>
            .logoText {
                font-family: 'Itim';
                font-style: normal;
                font-weight: 400;
                font-size: 30px;
                line-height: 24px;
            }
            .mainText {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 96px;
                line-height: 116px;
                color: #7879F1;
            }
            .secondaryText {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 32px;
                line-height: 39px;
                text-align: center;
            }
            .buttonText {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 28px;
                line-height: 34px;
                background-color: #7879F1;
                border-radius:8px;
                color: white;
            }
        </style>
    </head>
    <body style="background-color: #E5E5E5">
        <nav class="py-2 border-bottom" style="color: white; background-color: #161719">
            <div class="container d-flex flex-wrap">
              <ul class="nav me-auto">
                <li class="nav-item"><a href="{{ url('/') }}" class="nav-link text-white link-white px-2 active logoText">Amgif</a></li>
              </ul>
              <ul class="nav">
                <li class="nav-item"><a href="{{ route('login') }}" class="nav-link text-white link-white px-4 ">Iniciar sesión</a></li>
                <li class="nav-item"><a href="{{ route('register') }}" class="text-white nav-link link-white px-4 btn" style="background-color: #7879F1">Registrarse</a></li>
              </ul>
            </div>
          </nav>
          <div class="d-flex justify-content-center align-items-center text-center" style="height: 100vh;">
            <div style="padding: 1rem;">
                <div class="mainText">Crea proyectos de diseño fácilmente</div>
                <div class="secondaryText" style="padding-bottom: 16px">Con Amfig es posible diseñar lo que deeses.</div>
                <div class="btn buttonText" style="width: 220px;"><a href="{{ route('register') }}" class="text-white nav-link link-white">Comenzar</a> </div>
            </div>
          </div>
          
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>
