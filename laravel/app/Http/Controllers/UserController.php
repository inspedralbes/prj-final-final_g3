<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Illuminate\Http\JsonResponse;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;



class UserController extends Controller{
/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="Iniciar sesión de usuario",
 *     description="Inicia sesión de un usuario con correo electrónico y contraseña.",
 *     tags={"Autenticació"},
 *     @OA\Parameter(
 *         name="email",
 *         in="query",
 *         required=true,
 *         description="Correo electrónico del usuario",
 *         @OA\Schema(
 *             type="string"
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="password",
 *         in="query",
 *         required=true,
 *         description="Contraseña del usuario",
 *         @OA\Schema(
 *             type="string",
 *             format="password"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Inicio de sesión exitoso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="string",
 *                 example="Has iniciado sesión"
 *             ),
 *             @OA\Property(
 *                 property="token",
 *                 type="string",
 *                 example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Error en la solicitud",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="message",
 *                 type="string"
 *             )
 *         )
 *     )
 * )
 */

    public function login(Request $request){
        $credentials = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ],
        [
            'required' => 'El :attribute es obligatorio.',
        ]);
        
        if ($credentials->fails()) {
            return response()->json(['errors' => $credentials->errors()->all()], 400);
        }else{
            $user = User::where('email', $request['email'])->first();
            if (!$user) {
                return response(['message' => 'L\'usuari no existeix'], 400);
            } else if (!Hash::check($request['password'], $user->password)) {
                return response(['message' => 'La contrasenya és incorrecta'], 400);
            } else {
                $token = $user->createToken('Spottunes')->plainTextToken;
                $user->makeHidden(['created_at', 'updated_at', 'email_verified_at']);
                $response = [
                    'user' => $user,
                    'token' => $token,
                ];
                return response()->json(['success' => 'Has iniciat sessió', 'data' => $response], 200);
            }
        }
    }
/**
 * @OA\Post(
 *     path="/api/register",
 *     summary="Registro de usuario",
 *     description="Registra un nuevo usuario con los datos proporcionados.",
 *     tags={"Autenticació"},
 *     @OA\Parameter(
 *         name="name",
 *         in="query",
 *         required=true,
 *         description="Nombre del usuario",
 *         @OA\Schema(
 *             type="string"
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="surnames",
 *         in="query",
 *         required=true,
 *         description="Apellidos del usuario",
 *         @OA\Schema(
 *             type="string"
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="nickname",
 *         in="query",
 *         required=true,
 *         description="Alias o nombre de usuario",
 *         @OA\Schema(
 *             type="string"
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="email",
 *         in="query",
 *         required=true,
 *         description="Correo electrónico del usuario",
 *         @OA\Schema(
 *             type="string",
 *             format="email"
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="birthdate",
 *         in="query",
 *         required=true,
 *         description="Fecha de nacimiento del usuario (formato: YYYY-MM-DD)",
 *         @OA\Schema(
 *             type="date",
 *             format="date"
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="password",
 *         in="query",
 *         required=true,
 *         description="Contraseña del usuario",
 *         @OA\Schema(
 *             type="string",
 *             format="password"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Registro exitoso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="string",
 *                 example="Usuario creado correctamente"
 *             ),
 *             @OA\Property(
 *                 property="token",
 *                 type="string",
 *                 example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Error en la solicitud",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="errors",
 *                 type="array",
 *                 @OA\Items(type="string"),
 *             )
 *         )
 *     )
 * )
 */

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'surnames' => 'required|string',
            'nickname' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'birthdate' => 'required|date',
            'password' => 'required|string',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'email' => 'El :attribute debe ser una dirección de correo válida.',
            'unique' => 'El :attribute ya está en uso.',
            'date' => 'El :attribute debe ser una fecha válida.',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }
        

        $user = User::create([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'nickname' => $request->nickname,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            'password' => bcrypt($request->password),
            'loginWith' => 'email',
        ]);

        $user->makeHidden(['created_at', 'updated_at']);

        $token = $user->createToken('Spottunes')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json(['success' => 'Usuari creat correctament', 'data' => $response], 200);
    }
/**
 * @OA\Post(
 *      path="/api/logout",
 *      operationId="logout",
 *      tags={"Autenticació"},
 *      summary="Cerrar sesión",
 *      description="Cierra la sesión del usuario actual y revoca todos los tokens de acceso asociados.",
 *      security={{"bearerAuth":{}}},
 *      @OA\Response(
 *          response=200,
 *          description="Sesión cerrada exitosamente",
 *          @OA\JsonContent(
 *              @OA\Property(property="success", type="string", example="Has cerrado sesión"),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *      ),
 * )
 */
    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(['success' => 'Has tancat sessió'], 200);
    }
/**
 * @OA\Get(
 *      path="/api/auth",
 *      operationId="redirectToAuth",
 *      tags={"Autenticació Google"},
 *      summary="Redirigir a la autenticación",
 *      description="Redirige al usuario a la página de autenticación externa, como Google, para iniciar sesión.",
 *      @OA\Response(
 *          response=302,
 *          description="Redirección temporal",
 *      ),
 * )
 */

    public function redirectToAuth(): JSONResponse {
        return response()->json([
            Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl()
        ]);
    }

    public function registerWithApps(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'surnames' => 'string',
            'nickname' => 'required|string|unique:users',
            'password' => 'required|string',
            'password_confirmation' => 'required|string|same:password',
            'email' => 'required|email|unique:users',
            'birthdate' => 'required|date',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'email' => 'El :attribute debe ser una dirección de correo válida.',
            'unique' => 'El :attribute ya está en uso.',
            'date' => 'El :attribute debe ser una fecha válida.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'password' => bcrypt($request->password),
            'nickname' => $request->nickname,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            'loginWith' => $request->loginWith,
            'google_id' => $request->google_id,
        ]);

        $user->makeHidden(['created_at', 'updated_at']);

        $token = $user->createToken('Spottunes')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json(['success' => 'Usuari creat correctament', 'data' => $response], 200);
    }

    
    
/**
 * @OA\Put(
 *      path="/api/completeInfo",
 *      operationId="completeInfo",
 *      tags={"Autenticació"},
 *      summary="Completar información de usuario",
 *      description="Completa la información de un usuario, como su fecha de nacimiento y apodo.",
 *      security={{"bearer_token":{}}},
 *      @OA\RequestBody(
 *          required=true,
 *          description="Datos de usuario para completar",
 *          @OA\MediaType(
 *              mediaType="application/x-www-form-urlencoded",
 *              @OA\Schema(
 *                  required={"birthdate", "nickname"},
 *                  type="object",
 *                  @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
 *                  @OA\Property(property="nickname", type="string", example="usuario123"),
 *              ),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Información de usuario completada exitosamente",
 *          @OA\JsonContent(
 *              type="boolean",
 *              example=true,
 *          ),
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Error de validación",
 *          @OA\JsonContent(
 *              @OA\Property(property="errors", type="array", @OA\Items(type="string")),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
 *          )
 *      ),
 * )
 */
    public function completeInfo(Request $request){
        $token = $request->header('Authorization');
        $user = User::where('id', $request->user()->id)->first();

        $validator = Validator::make($request->all(), [
            'birthdate' => 'required|date',
            'nickname' => 'required|string',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'date' => 'El :attribute debe ser una fecha válida.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }
        $user->birthdate = $request->birthdate;
        $user->nickname = $request->nickname;
        
        return response()->json($user->save());   
    }

    public function updateInfo (Request $request){
        $token= $request->header('Authorization');
        $user = User::where('id', $request->user()->id)->first();
        if ($token !== $user->token) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $validator = Validator::make($request->all(), [
            'nickname' => 'required|string',
            'email' => 'required|email',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'email' => 'El :attribute debe ser una dirección de correo válida.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }

        $user->name = $request->name;
        $user->surnames = $request->surnames;
        $user->nickname = $request->nickname;
        $userWithSameNickname = User::where('nickname', $request->nickname)->first();
        if ($userWithSameNickname && $userWithSameNickname->id != $user->id) {
            return response()->json(['errors' => ['El nickname ya está en uso.']], 400);
        }
        $user->email = $request->email;
        $userWithSameEmail = User::where('email', $request->email)->first();
        if ($userWithSameEmail && $userWithSameEmail->id != $user->id) {
            return response()->json(['errors' => ['El email ya está en uso.']], 400);
        }
        $user->birthdate = $request->birthdate;
        
        return response()->json($user->save());   
    }
    
}
