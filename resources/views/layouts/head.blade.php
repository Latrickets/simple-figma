        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @yield('title')

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></script>
        <script src="https://kit.fontawesome.com/761684499b.js" crossorigin="anonymous"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc" crossorigin="anonymous"></script>
        <style>
            body{
                background-color: white;
            }

            .logoText {
                font-family: 'Itim';
                font-style: normal;
                font-weight: 400;
                font-size: 30px;
                line-height: 24px;
            }
            .mainText {
                font-family: "Inter", sans-serif;
                font-style: normal;
                font-weight: 600;
                font-size: 96px;
                line-height: 116px;
                color: #7879F1;
                text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
            }
            .secondaryText {
                font-family: "Inter", sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 32px;
                line-height: 39px;
                text-align: center;
                padding-bottom: 4rem;
                padding-top: 2rem;
            }
            .buttonText {
                font-family: "Inter", sans-serif;
                font-style: normal;
                font-weight: 500;
                font-size: 28px;
                line-height: 34px;
                background-color: #7879F1;
                border-radius:8px;
                color: white;
                width: 220px;
            }

            .circle-a{
                position: absolute;
                transform: translate(-50%, -50%);
                top: 60%;
                left: 35%;
                width: 600px;
                height: 600px;
                filter: blur(80px);
                opacity: 0.8;
                background: #F178B6;
                border-radius: 50%;
            }

            .circle-b{
                position: absolute;
                transform: translate(-50%, -50%);
                top: 45%;
                left: 65%;
                width: 600px;
                height: 600px;
                filter: blur(80px);
                opacity: 0.8;
                background: #90F178;
                border-radius: 50%;
            }

            h3{
                font-family: "Inter", sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                text-align: center;
            }

            a{
                text-decoration: none;
                color: #000;
            }

            div.project{
                border-radius: 2rem;
            }
            div.project:hover{
                cursor: pointer;
            }
            div.project .card-body{
                background-color: #7A7E80; 
                border-radius: 2rem;
            }
            div.project:hover .card-body{
                background-color: white;
                transition: 400ms;
            }
            div.project a{
                display:block; 
                text-align:center; 
                color: white;
            }
            div.project:hover a{
                color: #7A7E80;
                transition: 400ms;
            }

            label.tool{
                color: white;
                border-color: white;
                margin-left: 1rem;
                margin-right: 1rem;
                width: 3rem;
                border-radius: 4px;
            }

            input.property{
                color: white;
                background-color: #464A4D;
                border-color: #E3E5E5;
                border-radius: 1rem;
                border-style: solid;
            }

            div.nav-project{
                display: flex;
                background-color: #0D0E0F;
                border-color: white;
                border-bottom-style: solid;
                border-bottom-width: thin;
                padding: 0;
            }
            .nav-project button, .nav-project a{
                background-color: #0D0E0F;
                color: white;
                border-style: none;
                margin: 8px;
            }
            .title{
                position: absolute;
                left: 45%;
                top: 0.5rem;
                color: white;
                text-align: center;
                font-weight: 200;
            }
        </style>