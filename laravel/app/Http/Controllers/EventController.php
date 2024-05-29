<?php

namespace App\Http\Controllers;

use App\Models\event;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{

    /**
 * @OA\Get(
 *      path="/api/events/all",
 *      operationId="getAllEvents",
 *      tags={"Esdeveniments"},
 *      summary="Obtener lista completa de eventos",
 *      description="Obtiene una lista completa de eventos donde el campo 'artist' no es nulo, ordenados por fecha y hora.",
 *      @OA\Response(
 *          response=200,
 *          description="Lista de eventos obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="events", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="artist", type="string", example="Artista Ejemplo"),
 *                      @OA\Property(property="date", type="string", format="date", example="2024-06-01"),
 *                      @OA\Property(property="time", type="string", format="time", example="19:00:00"),
 *                      @OA\Property(property="location", type="string", example="Lugar Ejemplo"),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se han encontrado eventos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No s'han trobat esdeveniments")
 *          )
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

    public function indexAll()
    {
        $events = Event::whereNotNull('artist')
                       ->orderBy('date')
                       ->orderBy('time')
                       ->get();
    
        if ($events->isEmpty()) {
            return response()->json(['message' => 'No s\' han trobat esdeveniments'], 404);
        }
    
        return response()->json(['events' => $events], 200);
    }
/**
 * @OA\Post(
 *      path="/api/events/byLocation",
 *      operationId="getEventsByLocation",
 *      tags={"Esdeveniments"},
 *      summary="Obtener eventos por ubicación",
 *      description="Obtiene una lista de eventos filtrados por países, ciudades y lugares específicos, donde el campo 'artist' no es nulo, ordenados por fecha y hora.",
 *      @OA\RequestBody(
 *          required=true,
 *          description="Criterios de búsqueda por ubicación",
 *          @OA\JsonContent(
 *              type="object",
 *              required={"countries", "cities"},
 *              @OA\Property(
 *                  property="countries",
 *                  type="array",
 *                  @OA\Items(type="string"),
 *                  example={"USA", "Spain"}
 *              ),
 *              @OA\Property(
 *                  property="cities",
 *                  type="array",
 *                  @OA\Items(type="string"),
 *                  example={"New York", "Madrid"}
 *              ),
 *              @OA\Property(
 *                  property="venues",
 *                  type="array",
 *                  @OA\Items(type="string"),
 *                  example={"Madison Square Garden", "Wanda Metropolitano"}
 *              ),
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Lista de eventos obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="events", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="artist", type="string", example="Artista Ejemplo"),
 *                      @OA\Property(property="date", type="string", format="date", example="2024-06-01"),
 *                      @OA\Property(property="time", type="string", format="time", example="19:00:00"),
 *                      @OA\Property(property="location", type="string", example="Lugar Ejemplo"),
 *                      @OA\Property(property="country", type="string", example="USA"),
 *                      @OA\Property(property="city", type="string", example="New York"),
 *                      @OA\Property(property="venue", type="string", example="Madison Square Garden"),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Datos de entrada inválidos",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="errors", type="object",
 *                  @OA\AdditionalProperties(type="array",
 *                      @OA\Items(type="string")
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se han encontrado eventos para los criterios especificados",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No events found for the specified criteria")
 *          )
 *      ),
 *      @OA\Response(
 *          response=500,
 *          description="Error al obtener eventos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Error fetching events"),
 *              @OA\Property(property="error", type="string", example="Detalle del error")
 *          )
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


    public function getEventsByLocation(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'countries' => 'required|array',
            'cities' => 'required|array',
            'venues' => 'array',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        
        // Obtener los parámetros validados
        $countries = $request->input('countries');
        $cities = $request->input('cities');
        $venues = $request->input('venues');

        // Realizar la consulta
        try {
            $events = Event::whereIn('country', $countries)
                           ->whereIn('city', $cities)
                           ->whereIn('venue', $venues)
                           ->whereNotNull('artist')
                           ->orderBy('date')
                           ->orderBy('time')
                           ->get();

            if ($events->isEmpty()) {
                return response()->json(['message' => 'No events found for the specified criteria'], 404);
            }

            return response()->json(['events' => $events], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching events', 'error' => $e->getMessage()], 500);
        }
    }
    
/**
 * @OA\Post(
 *      path="/api/events/byDistance",
 *      operationId="getEventsByDistance",
 *      tags={"Esdeveniments"},
 *      summary="Obtener eventos por distancia",
 *      description="Obtiene una lista de eventos dentro de una distancia específica desde una ubicación dada, donde el campo 'artist' no es nulo, ordenados por fecha y hora.",
 *      @OA\RequestBody(
 *          required=true,
 *          description="Criterios de búsqueda por distancia",
 *          @OA\JsonContent(
 *              required={"latitude", "longitude", "distance"},
 *              @OA\Property(property="latitude", type="number", format="float", example=40.7128),
 *              @OA\Property(property="longitude", type="number", format="float", example=-74.0060),
 *              @OA\Property(property="distance", type="number", format="float", example=50),
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Lista de eventos obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="events", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="artist", type="string", example="Artista Ejemplo"),
 *                      @OA\Property(property="date", type="string", format="date", example="2024-06-01"),
 *                      @OA\Property(property="time", type="string", format="time", example="19:00:00"),
 *                      @OA\Property(property="location", type="string", example="Lugar Ejemplo"),
 *                      @OA\Property(property="distance", type="number", format="float", example=30.5),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Datos de entrada inválidos",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="errors", type="object",
 *                  @OA\AdditionalProperties(type="array",
 *                      @OA\Items(type="string")
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se han encontrado eventos para los criterios especificados",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No events found for the specified criteria")
 *          )
 *      ),
 *      @OA\Response(
 *          response=500,
 *          description="Error al obtener eventos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Error fetching events"),
 *              @OA\Property(property="error", type="string", example="Detalle del error")
 *          )
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


    public function getEventsByDistance(Request $request){
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'distance' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Obtener los parámetros validados
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        $distance = $request->input('distance');

        // Realizar la consulta
        try {
            $events = Event::selectRaw('*, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
                           ->having('distance', '<', $distance)
                           ->whereNotNull('artist')
                           ->orderBy('date')
                           ->orderBy('time')
                           ->get();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching events', 'error' => $e->getMessage()], 500);
        }

        // Verificar si hay eventos
        if ($events->isEmpty()) {
            return response()->json(['message' => 'No events found for the specified criteria'], 404);
        }

        return response()->json(['events' => $events], 200);
    }

    /**
 * @OA\Post(
 *      path="/api/events/search",
 *      operationId="getEventsByName",
 *      tags={"Esdeveniments"},
 *      summary="Buscar eventos por nombre",
 *      description="Obtiene una lista de eventos que coinciden con el nombre especificado en el parámetro de búsqueda, buscando en varias columnas de la tabla de eventos.",
 *      @OA\RequestBody(
 *          required=true,
 *          description="Parámetro de búsqueda por nombre",
 *          @OA\JsonContent(
 *              required={"param"},
 *              @OA\Property(property="param", type="string", example="Nombre del evento o artista")
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Lista de eventos obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="events", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="artist", type="string", example="Artista Ejemplo"),
 *                      @OA\Property(property="date", type="string", format="date", example="2024-06-01"),
 *                      @OA\Property(property="time", type="string", format="time", example="19:00:00"),
 *                      @OA\Property(property="location", type="string", example="Lugar Ejemplo"),
 *                      @OA\Property(property="country", type="string", example="USA"),
 *                      @OA\Property(property="city", type="string", example="New York"),
 *                      @OA\Property(property="venue", type="string", example="Madison Square Garden"),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Datos de entrada inválidos",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="errors", type="object",
 *                  @OA\AdditionalProperties(type="array",
 *                      @OA\Items(type="string")
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se han encontrado eventos para los criterios especificados",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No events found for the specified criteria")
 *          )
 *      ),
 *      @OA\Response(
 *          response=500,
 *          description="Error al obtener eventos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Error fetching events"),
 *              @OA\Property(property="error", type="string", example="Detalle del error")
 *          )
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

    public function getEventsByName(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'param' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Obtener el parámetro validado
        $name = $request->input('param');
    
        try {
            // Realizar la consulta buscando coincidencias en las columnas especificadas
            $events = Event::where('event', 'like', "%{$name}%")
                ->orWhere('artist', 'like', "%{$name}%")
                ->orWhere('venue', 'like', "%{$name}%")
                ->orWhere('city', 'like', "%{$name}%")
                ->orWhere('country', 'like', "%{$name}%")
                ->get();
    
            // Verificar si hay eventos
            if ($events->isEmpty()) {
                return response()->json(['message' => 'No events found for the specified criteria'], 404);
            }
    
            return response()->json(['events' => $events], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching events', 'error' => $e->getMessage()], 500);
        }
    }
    
    /**
 * @OA\Get(
 *      path="/api/events/locations",
 *      operationId="getLocations",
 *      tags={"Esdeveniments"},
 *      summary="Obtener ubicaciones de eventos",
 *      description="Obtiene una lista de países, ciudades y lugares donde se realizan eventos.",
 *      @OA\Response(
 *          response=200,
 *          description="Ubicaciones de eventos obtenidas exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="locations", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="country", type="string", example="USA"),
 *                      @OA\Property(property="cities", type="array",
 *                          @OA\Items(
 *                              type="object",
 *                              @OA\Property(property="city", type="string", example="New York"),
 *                              @OA\Property(property="venues", type="array",
 *                                  @OA\Items(
 *                                      type="object",
 *                                      @OA\Property(property="venue", type="string", example="Madison Square Garden"),
 *                                      @OA\Property(property="latitude", type="number", format="float", example=40.7505),
 *                                      @OA\Property(property="longitude", type="number", format="float", example=-73.9934),
 *                                  )
 *                              ),
 *                          )
 *                      ),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se han encontrado ubicaciones de eventos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No locations found for events")
 *          )
 *      ),
 *      @OA\Response(
 *          response=500,
 *          description="Error al obtener ubicaciones de eventos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Error fetching event locations"),
 *              @OA\Property(property="error", type="string", example="Detalle del error")
 *          )
 *      )
 * )
 */

    public function getLocations()
    {
        $countries = Event::select('country')->distinct()->get();
        $locations = [];

        foreach ($countries as $country) {
            $cities = Event::where('country', $country->country)->select('city')->distinct()->get();
            $countryCities = [];

            foreach ($cities as $city) {
                $venues = Event::where('country', $country->country)
                               ->where('city', $city->city)
                               ->select('venue', 'latitude', 'longitude')
                               ->distinct()
                               ->get();

                // Agregar las ciudades y sus venues
                $countryCities[] = [
                    'city' => $city->city,
                    'venues' => $venues
                ];
            }

            // Agregar el país y sus ciudades al array de ubicaciones
            $locations[] = [
                'country' => $country->country,
                'cities' => $countryCities
            ];
        }

        return response()->json(['locations' => $locations], 200);
    }

/**
 * @OA\Post(
 *      path="/api/events/byId",
 *      operationId="showEvents",
 *      tags={"Esdeveniments"},
 *      summary="Mostrar eventos por IDs",
 *      description="Obtiene una lista de eventos según los IDs proporcionados en el cuerpo de la solicitud.",
 *      @OA\RequestBody(
 *          required=true,
 *          description="IDs de los eventos",
 *          @OA\JsonContent(
 *              required={"ids"},
 *              @OA\Property(property="ids", type="array",
 *                  @OA\Items(type="integer", example="1")
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Eventos encontrados",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="events", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="artist", type="string", example="Artista Ejemplo"),
 *                      @OA\Property(property="date", type="string", format="date", example="2024-06-01"),
 *                      @OA\Property(property="time", type="string", format="time", example="19:00:00"),
 *                      @OA\Property(property="location", type="string", example="Lugar Ejemplo"),
 *                      @OA\Property(property="country", type="string", example="USA"),
 *                      @OA\Property(property="city", type="string", example="New York"),
 *                      @OA\Property(property="venue", type="string", example="Madison Square Garden"),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="IDs inválidos",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Invalid IDs provided")
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="Eventos no encontrados",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Events not found")
 *          )
 *      )
 * )
 */
    public function show(Request $request)
    {

        // Validar que el array no esté vacío
        if (empty($idsArray)) {
            return response()->json(['message' => 'No IDs provided'], 400);
        }

        // Validar que todos los elementos en $idsArray sean números
        $idsArray = $request->input('ids');

        // Validar que todos los elementos en $idsArray sean números
        if (array_filter($idsArray, 'is_numeric') !== $idsArray) {
            return response()->json(['message' => 'Invalid IDs provided'], 400);
        }
    
        // Realiza la consulta en la base de datos
        $events = Event::whereIn('id', $idsArray)->get();
    
        // Verifica si se encontraron eventos
        if ($events->isEmpty()) {
            return response()->json(['message' => 'Events not found'], 404);
        }
    
        // Retorna los eventos encontrados
        return response()->json(['events' => $events], 200);
    }
}
