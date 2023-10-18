<!-- resources/views/layouts/app.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>{{ config('app.name', 'Laravel') }}</title>
</head>
<body>
    <div id="app">
        @yield('content')
    </div>
</body>
</html>
