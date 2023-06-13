<!DOCTYPE html>
<html lang="en">

<head>
    @extends('layouts.head')
    @section('title')
    <title>Amgif</title>
    @endsection
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <!-- CSS de Bootstrap -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">

    <!-- JS de Bootstrap (requiere jQuery) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>

</head>

<body style="background-color: #7A7E80">
    @include('layouts.navbar')

    <div class="container mt-3">
        @foreach ($projects as $project)
        <div class="row">
            <div class="col-sm-3">
                <div class="project card mt-4">
                    <div class="card-body p-0">
                        @if ($project->image=="empty.png")
                            <img src="{{ asset('storage/img/empty.jpg') }}" class="card-img-top"
                                style="border-radius: 2rem 2rem 0rem 0rem; background-color: white;" alt="...">
                        @else
                            <img src="{{$project->image}}" class="card-img-top"
                                style="border-radius: 2rem 2rem 0rem 0rem; background-color: white;" alt="...">
                        @endif
                        
                        <div class="card-body p-0 text-center">
                            <a href="{{ route('project.edit', $project->id) }}"
                                class="card-text py-4">{{$project->title}}</a>
                            <form action="{{route('project.destroy', $project->id)}}" method="post">
                            @csrf
                            @method('DELETE')
                                <button type="submit" class=" btn btn-danger mb-2">Eliminar</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Nuevo proyecto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form method="POST" action="{{route('project.store')}}">
                    <div class="modal-body">
                            @csrf
                            <div class="form-group">
                                <label for="projectName">Nombre del Proyecto</label>
                                <input type="text" name="title" class="form-control" id="projectName" placeholder="Ingrese el nombre del proyecto">
                                <input type="hidden" name="user_id" value="{{auth()->id()}}">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
</script>

</html>