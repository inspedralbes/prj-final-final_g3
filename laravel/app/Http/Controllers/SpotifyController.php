<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use stdClass;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;

class SpotifyController extends Controller
{
    // public function getAccesToken(){
    //     $client = new Client();

    //     $client_id = 'c716b362daf24eff8f677f1f2d00e20c';
    //     $client_secret = 'e965f33797214231bee7ac783bb594be';
    //     $url = 'https://accounts.spotify.com/api/token';
    //     $scope = 'user-read-private user-read-email';
    //     $header = new stdClass();


    //     $response = $client->post($url, [
    //         'headers' => [
    //             'Authorization' => 'Basic ' . base64_encode($client_id . ':' . $client_secret),
    //             'Content-Type' => 'application/x-www-form-urlencoded',
    //             'scopes' => $scope
    //         ],
    //         'form_params' => [
    //             'grant_type' => 'client_credentials',
    //         ]
    //     ]);
    //     $body = $response->getBody()->getContents();

    //     return $body;
    // }

    public function login()  {
        $client_id = '5467f1a23dd643079df61dee264117f3';
        $redirectUri = 'http://localhost:8000/api/callback';
        $state = $this->generateRandomString(16);
        $scope = 'user-read-email user-library-read user-top-read';

        $queryParameters = [
            'response_type' => 'code',
            'client_id' => $client_id, // Configura tu client_id en el archivo de configuración
            'scope' => $scope,
            'redirect_uri' =>$redirectUri, // Configura tu redirect_uri en el archivo de configuración
            'state' => $state,
        ];

        return redirect('https://accounts.spotify.com/authorize?' . http_build_query($queryParameters));
    }

    public function callback(Request $request)
    {
        $code = $request->input('code');
        $state = $request->input('state');

        if ($state === null) {
            return redirect('/')->with('error', 'state_mismatch');
        } else {
            $authOptions = [
                'url' => 'https://accounts.spotify.com/api/token',
                'form_params' => [
                    'code' => $code,
                    'redirect_uri' => config('services.spotify.redirect_uri'),
                    'grant_type' => 'authorization_code',
                ],
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Authorization' => 'Basic ' . base64_encode(config('services.spotify.client_id') . ':' . config('services.spotify.client_secret')),
                ],
            ];
            
            $response = Http::asForm()->post($authOptions['url'], $authOptions['form_params']);
            
            // Obtener la respuesta
            $status = $response->status();  // Código de estado HTTP
            $data = $response->json();
            dd($data);
        }
    }


    private function generateRandomString($length)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

    private function fetchToLogin($authOptions)
    {
        Http::withHeaders($authOptions['headers']);

        try {
            $response = Http::asForm()->post($authOptions['url'], $authOptions['form']);
            $token = $response->json();

            return $token;
        } catch (\Exception $error) {
            throw $error;
        }
    }
}
