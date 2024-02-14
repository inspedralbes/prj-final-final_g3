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
/**
 * @OA\Get(
 *      path="/api/loginSpotify",
 *      operationId="login",
 *      tags={"Autenticació Spotify"},
 *      summary="Iniciar sesión de usuario",
 *      description="Inicia sesión de un usuario con correo electrónico y contraseña.",
 *      @OA\Response(
 *          response=302,
 *          description="Redirección temporal"
 *      )
 * )
 */
    public function login()  {
        $client_id = env('SPOTIFY_CLIENT_ID');
        $redirectUri = env('SPOTIFY_REDIRECT_URI');
        $state = $this->generateRandomString(16);
        $scope = 'user-read-email user-library-read user-top-read';

        $queryParameters = [
            'response_type' => 'code',
            'client_id' => $client_id,
            'scope' => $scope,
            'redirect_uri' =>$redirectUri,
            'state' => $state,
        ];


        return redirect('https://accounts.spotify.com/authorize?' . http_build_query($queryParameters));
    }

    /**
     * @OA\Get(
     *      path="/api/spotifyCallback",
     *      operationId="callback",
     *      tags={"Autenticació Spotify"},
     *      summary="Manejar el callback de autorización de Spotify",
     *      description="Recibe el código de autorización de Spotify y realiza la solicitud para obtener el token de acceso.",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Código de autorización de Spotify",
     *          @OA\MediaType(
     *              mediaType="application/x-www-form-urlencoded",
     *              @OA\Schema(
     *                  required={"code"},
     *                  type="object",
     *                  @OA\Property(property="code", type="string", example="your_authorization_code"),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Respuesta exitosa",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="data", type="object", description="Datos de respuesta"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error del servidor",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="error", type="string", description="Mensaje de error"),
     *          ),
     *      ),
     * )
     */
    public function callback(Request $request)
    {
        $code = $request->query('code', null);
        $state = $request->query('state', null);

        if ($state === null) {
            return redirect('/#' . http_build_query(['error' => 'state_mismatch']));
        } else {
            $client = new Client();

            $authOptions = [
                'url' => 'https://accounts.spotify.com/api/token',
                'form_params' => [
                    'code' => $code,
                    'redirect_uri' => env('SPOTIFY_REDIRECT_URI'),
                    'grant_type' => 'authorization_code',
                ],
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Authorization' => 'Basic ' . base64_encode(env('SPOTIFY_CLIENT_ID') . ':' . env('SPOTIFY_CLIENT_SECRET')),
                ],
            ];

            try {
                $response = $client->post($authOptions['url'], [
                    'form_params' => $authOptions['form_params'],
                    'headers' => $authOptions['headers'],
                ]);

                $responseData = json_decode($response->getBody(), true);


                // Devolver una respuesta de ejemplo
                return response()->json(['data' => $responseData]);
            } catch (\Exception $e) {
                // Manejar cualquier excepción que pueda ocurrir durante la solicitud
                return response()->json(['error' => $e->getMessage()], 500);
            }
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
}
