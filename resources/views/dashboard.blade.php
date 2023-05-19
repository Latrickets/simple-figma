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
<body style="background-color: #7A7E80">
    @include('layouts.navbar')
    
    <div class="container mt-3">
        <div class="row">
            <div class="col-sm-3">
                <div class="card" style="border-radius: 2rem;">
                    <div class="card-body p-0" style="background-color: #7A7E80; border-radius: 2rem;">
                        <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1501/posts/35706/image/figma-ui-kits-personal-portfolio-landing-page.jpg" class="card-img-top" style="border-radius: 2rem 2rem 0rem 0rem; background-color: white;" alt="...">
                    <div class="card-body p-0">
                    <a href="{{ route('login') }}" class="card-text py-4" style="display:block; text-align:center; color: white;">Nombre del proyecto</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>