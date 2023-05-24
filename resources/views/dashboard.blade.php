<!DOCTYPE html>
<html lang="en">
<head>
    @extends('layouts.head')
    @section('title')
        <title>Amgif</title>
    @endsection
</head>
<body style="background-color: #7A7E80">
    @include('layouts.navbar')
    
    <div class="container mt-3">
        <div class="row">
            <div class="col-sm-3">
                <div class="project card mt-4">
                    <div class="card-body p-0">
                        <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1501/posts/35706/image/figma-ui-kits-personal-portfolio-landing-page.jpg" class="card-img-top" style="border-radius: 2rem 2rem 0rem 0rem; background-color: white;" alt="...">
                    <div class="card-body p-0">
                    <a href="{{ route('login') }}" class="card-text py-4">Nombre del proyecto</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>