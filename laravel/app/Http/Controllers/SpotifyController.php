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

    public function getAccessToken(){
        $client_id = 'c716b362daf24eff8f677f1f2d00e20c';
        $redirectUri = 'http://localhost:8000';

        $scope = 'user-read-private user-read-email';
        $authUrl = "https://accounts.spotify.com/authorize";

        $text = $this->generateRandomString(16);

        $params = [
            'response_type' => 'code',
            'client_id' => $client_id,
            'scope' => $scope,
            'code_challenge_method' => 'S256',
            'redirect_uri' => $redirectUri,
            'state' => $text

        ];

        $client = new Client();

        $response = $client->get($authUrl, [
            'query' => $params,
        ]);

        $authUrl = URL::to($authUrl . '/callback') . '?' . http_build_query($params);

        return Redirect::to($authUrl);
    }

    private function generateRandomString($length){
        return Str::random($length);
    }

    private function hashString($text){
        $hashed = hash('sha256', $text);

        return $hashed;
    }

    private function base64encode($input){
        $base64Encoded = base64_encode($input);
        
        $base64Encoded = str_replace(['+', '/', '='], ['-', '_', ''], $base64Encoded);

        return $base64Encoded;
    }

    public function getTrack(){
        $client = new Client();
        $url = 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V';
        
        $response = $client->get($url, [
            'headers' => [
                'Authorization' => 'Bearer ',
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }
}
