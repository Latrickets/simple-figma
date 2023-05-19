<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @extends('layouts.head')
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        @section('title')
            <title>Amgif</title>
        @endsection
    </head>

    <body>
        @include('layouts.navbar')
        <div class="circle-a"></div>
        <div class="circle-b"></div>
        
        <div class="d-flex justify-content-center align-items-center text-left" style="height: 80vh; width: 100%; position: absolute;">
          {{-- <div class="antialiased flex flex-col sm:justify-center items-center pt-6"> --}}
              <div style="padding: 48px 64px; background-color: white">
                <form method="POST" action="{{ route('register') }}">
                    <h3 style="font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                text-align: center;">Crear una cuenta</h3>
                    <x-validation-errors class="mb-4" />
                    @csrf
        
                    <div>
                        <x-label for="name" value="{{ __('Usuario') }}" />
                        <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
                    </div>
        
                    <div class="mt-4">
                        <x-label for="email" value="{{ __('Correo') }}" />
                        <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
                    </div>
        
                    <div class="mt-4">
                        <x-label for="password" value="{{ __('Contraseña') }}" />
                        <x-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
                    </div>
        
                    <div class="mt-4" style="display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 16px 12px;">
                        <button style="width: 300px;background: #7879F1" type="submit" class="btn">Registrar</button>
                    </div>
                    <div class="flex items-left justify-start mt-4">
                        <a class="underline text-sm text-gray-600" href="{{ route('login') }}">
                            {{ __('¿Ya tienes una cuenta? Inicia tu sesión') }}
                        </a>
        
                        
                    </div>
                </form>
            </div>
    </div>
    </body>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>
