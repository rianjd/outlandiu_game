
    <div class="login-box">
        <h2>Register</h2>
        <form method="POST" action="{{ url('/register_user') }}">
            @csrf

            <div class="user-box">

                <input id="register_username" type="text"  @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autofocus>
                <label for="username">{{ __('Username') }}</label>

                @error('username')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="user-box">

                <input id="register_password" type="password"  @error('password') is-invalid @enderror" name="password" required>
                <label for="password" >{{ __('Password') }}</label>

                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
            <div class="user-box">

                <input id="password-confirm" type="password"  @error('password-confirm') is-invalid @enderror" name="password-confirm" required>
                <label for="password-confirm" >{{ __('Confirm password') }}</label>

                    @error('password-confirm')
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
                        {{ __('Register') }}
                    </button>
                </div>
                <div class="col text-center">
                    <span style="color:rgba(240, 248, 255, 0.633)">or</span>
                </div>
                <div class="col text-center">
                    <a data-bs-toggle="modal" data-bs-target="#modalLogin" style="color:aliceblue">Log-in!</a>
                </div>
            </div>

        </form>
    </div>

