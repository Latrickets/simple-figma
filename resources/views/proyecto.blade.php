<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @extends('layouts.head')
    @section('title')
        <title>Amgif</title>
    @endsection
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    @include('layouts.navbar')
    <nav class="px-0 bg-dark">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
            <label class="btn btn-outline-primary" for="btnradio1">Cursor</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio2">Rectangulo</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio3">Circulo</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio3">Recta</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio3">Texto</label>
        </div>
    </nav>
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Elementos</span>
                </a>
            </div>
        </div>
        <div class="col py-3">
            
        </div>
        <div class="col-auto col-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <span class="fs-5 d-none d-sm-inline">Propiedades</span>
                <div class="row container mt-2">
                    <div class="col">
                        <div class="row">
                            <p class="col">X</p>
                            <input class="col" type="text">
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <p class="col">Y</p>
                            <input class="col" type="text">
                        </div>
                    </div>
                </div>
                <div class="row container mt-2">
                    <div class="col">
                        <div class="row">
                            <p class="col">W</p>
                            <input class="col" type="text">
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <p class="col">Z</p>
                            <input class="col" type="text">
                        </div>
                    </div>
                </div>
                <div class="row container mt-2">
                    <div class="col">
                        <div class="row">
                            <p class="col">B</p>
                            <input class="col" type="text">
                        </div>
                    </div>
                </div>
                <span class="fs-5 d-none d-sm-inline">Relleno</span>
                <div class="row container mt-2">
                    <input class="col" type="text" value="189FFB">
                    <input class="col" type="text" value="100%">
                </div>
                <span class="fs-5 d-none d-sm-inline">Borde</span>
                <div class="row container mt-2">
                    <input class="col" type="text" value="189FFB">
                    <input class="col" type="text" value="100%">
                </div>
                <span class="fs-5 d-none d-sm-inline">Texto</span>
                <div class="row container mt-2">
                    <input class="col" type="text" value="Arial">
                    <input class="col" type="text" value="12">
                </div>
                <div class="row container mt-2">
                    <input class="col" type="text" value="189FFB">
                    <input class="col" type="text" value="100%">
                </div>
            </div>
        </div>
    </div>
</div>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>