<!DOCTYPE html>
<html lang="en">
<head>
    @extends('layouts.head')
    @section('title')
        <title>Proyecto</title>
    @endsection
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body>
    {{-- @include('layouts.navbar') --}}
    <h3 class="title">{{$project->title}}</h3>
    <div class="nav-project">
        <a class="ms-4" href="{{ route('dashboard') }}">
            <i class="fas fa-arrow-left"></i>
        </a>
        <form id="formSave" action="{{route('project.update', $project)}}" method="post">
            @csrf
            @method('PUT')
            <input type="hidden" id="figures" name="figures" value="{{$project->figures}}">
            <input type="hidden" id="image" name="image" value="{{$project->image}}">
            <button type="submit" class="ms-3">
                <i class="fas fa-save"></i>
            </button>
        </form>
    </div>
    <nav class="p-4" style="background-color: #161719;">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="radioSelect" autocomplete="off" checked onchange="cambiarFigura()">
            <label class="btn btn-outline-light tool rounded" for="radioSelect" style="border-top-left-radius: 0; border-bottom-left-radius: 0;"><i class="fas fa-mouse-pointer"></i></label>

            <input type="radio" class="btn-check" name="btnradio" id="radioRectangulo" autocomplete="off" onchange="cambiarFigura()">
            <label class="btn btn-outline-light tool rounded" for="radioRectangulo"><i class="fas fa-square-full"></i></label>

            <input type="radio" class="btn-check" name="btnradio" id="radioCirculo" autocomplete="off" onchange="cambiarFigura()">
            <label class="btn btn-outline-light tool rounded" for="radioCirculo"><i class="fas fa-circle"></i></label>

            <input type="radio" class="btn-check" name="btnradio" id="radioLinea" autocomplete="off" onchange="cambiarFigura()">
            <label class="btn btn-outline-light tool rounded" for="radioLinea"><i class="fas fa-slash fa-rotate-270"></i></label>

            <input type="radio" class="btn-check" name="btnradio" id="radioTexto" autocomplete="off" onchange="cambiarFigura()">
            <label class="btn btn-outline-light tool rounded" for="radioTexto" style="font-family:'Times New Roman', Times, serif;"><strong>T</strong></label>
        </div>
    </nav>
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style="background-color: #464A4D;">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="#" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline my-2">Elementos</span>
                </a>
                <div id="layersPanel">
                    <h3>Capas</h3>
                </div>
            </div>
        </div>
        <div class="col py-3" id="app">
            
        </div>
        <div class="col-auto col-sm-2 px-0" style="background-color: #464A4D">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" id="atributosPanel">
                <span class="fs-5 d-none d-sm-inline my-2">Propiedades</span>
                <div class="row container mt-2 pt-1">
                    <div class="col">
                        <div class="row">
                            <p class="col-4">X</p>
                            <input class="col-8 property" type="text">
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <p class="col-4">Y</p>
                            <input class="col-8 property" type="text">
                        </div>
                    </div>
                </div>
                <div class="row container mt-2">
                    <div class="col">
                        <div class="row">
                            <p class="col-4">W</p>
                            <input class="col-8 property" type="text">
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <p class="col-4">H</p>
                            <input class="col-8 property" type="text">
                        </div>
                    </div>
                </div>
                <div class="row container mt-2">
                    <div class="col-6">
                        <div class="row">
                            <p class="col-4">B</p>
                            <input class="col-8 property" type="text">
                        </div>
                    </div>
                </div>
                <span class="fs-5 d-none d-sm-inline my-2">Relleno</span>
                <div class="row container mt-2">
                    <input class="col property" type="color" value="189FFB">
                    <input class="col property" type="text" value="100%">
                </div>
                <span class="fs-5 d-none d-sm-inline my-2">Borde</span>
                <div class="row container mt-2">
                    <input class="col property" type="color" value="189FFB">
                    <input class="col property" type="text" value="100%">
                </div>
                <span class="fs-5 d-none d-sm-inline my-2">Texto</span>
                <div class="row container mt-2">
                    <input class="col property" type="text" value="Arial">
                    <input class="col property" type="text" value="12">
                </div>
                <div class="row container mt-2">
                    <input class="col property" type="color" value="189FFB">
                    <input class="col property" type="text" value="100%">
                </div>
            </div>
        </div>
    </div>
</div>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="{{asset('js/main.js')}}"></script>
</html>