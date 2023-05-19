        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @yield('title')

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
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
        </style>