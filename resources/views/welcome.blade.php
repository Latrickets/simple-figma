<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @extends('layouts.head')
        @section('title')
            <title>Amgif</title>
        @endsection
    </head>

    <body>
        @include('layouts.navbar')
        
          <div class="circle-a"></div>
          <div class="circle-b"></div>
          
          <div class="d-flex justify-content-center align-items-center text-center" style="height: 80vh; width: 100%; position: absolute;">
            <div style="padding: 1rem;">
                <div class="mainText">Crea proyectos de<br>diseño fácilmente</div>
                <div class="secondaryText">Con Amfig es posible diseñar<br>lo que deeses.</div>
                <div class="btn buttonText"><a href="{{ route('register') }}" class="text-white nav-link link-white">Comenzar</a> </div>
            </div>
          </div>
          
    </body>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>
