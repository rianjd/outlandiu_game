<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

    <title>{{ config('app.name', 'Login') }}</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="container-sm pt-5" style="display: flex; justify-content:center;">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="login-box" style="width: 400px">
            <h2>Sua sessão expirou!</h2>
            <form method="POST" action="{{ url('/auth') }}">
                @csrf

                <div class="user-box">
                    <input id="username" type="text"  @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autofocus>
                    <label for="username">{{ __('Username') }}</label>
                    @error('username')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="user-box">
                    <input id="password" type="password"  @error('password') is-invalid @enderror" name="password" required>
                    <label for="password" >{{ __('Password') }}</label>
                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                </div>

                <div class="row mt-3">
                    <div class="col ">
                        <button type="submit" >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            {{ __('Login') }}
                        </button>
                    </div>

                </div>

            </form>
        </div>
    </div>
</body>
</html>
